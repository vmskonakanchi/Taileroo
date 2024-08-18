import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CollectionNames, Colors} from '../../lib/constants';
import MapView, {Marker} from 'react-native-maps';
import {
  calculateRegion,
  randomizeCoordinatesWithinRadius,
} from '../../lib/utils';
import SmallCard from '../../lib/components/SmallCard';
import {userContext} from '../../lib/context/userContext';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../lib/components/Loader';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const nearByTailors = [
  {
    name: 'Tailor 1',
    lat: 13.624383,
    lng: 79.4077179,
  },
  {
    name: 'Tailor 2',
    lat: 13.624383,
    lng: 79.4077179,
  },
  {
    name: 'Tailor 3',
    lat: 13.624383,
    lng: 79.4077179,
  },
  {
    name: 'Tailor 4',
    lat: 13.624383,
    lng: 79.4077179,
  },
  {
    name: 'Tailor 5',
    lat: 13.624383,
    lng: 79.4077179,
  },
];

const radiuses = [5, 10, 15, 20];

const CustomerHome = ({navigation}: any) => {
  const {user} = useContext(userContext);
  const {currentLocation} = user;
  const [isLoading, setIsLoading] = useState(false);

  const [region, setRegion] = useState({
    latitude: 13.624383,
    longitude: 79.4077179,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(radiuses[0]);

  const calcuateNearByTailors = async () => {
    try {
      const tailors = await firestore().collection(CollectionNames.Users).get();

      const tailorsData = tailors.docs
        .map(doc => doc.data())
        .map(data => data.currentLocation);

      return tailorsData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    calcuateNearByTailors().then(nearByTailors => {
      if (nearByTailors) {
        setRegion(calculateRegion(nearByTailors, radius));
        randomizeCoordinatesWithinRadius(
          currentLocation.latitude,
          currentLocation.longitude,
          radius,
        );
        setIsLoading(false);
      }
    });
  }, [radius]);

  if (isLoading) {
    return (
      <Loader message="Please wait while we get the best talors near you" />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MapView style={styles.map} region={region}>
        {nearByTailors.map((tailor, index) => (
          <Marker
            key={index}
            coordinate={{latitude: tailor.lat, longitude: tailor.lng}}
            title={tailor.name}
            onCalloutPress={() => {
              console.log('Marker Callout Pressed');
            }}
            onPress={() => {
              console.log('Marker Pressed');
            }}
          />
        ))}
      </MapView>
      <View style={styles.bottomContainer}>
        <View style={styles.radiusContainer}>
          {radiuses.map((radius, index) => (
            <SmallCard
              title={`${radius} km`}
              key={index}
              onPress={() => setRadius(radius)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomerHome;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  container: {
    height: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.Primary,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: Dimensions.get('window').height / 8,
  },
  radiusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
