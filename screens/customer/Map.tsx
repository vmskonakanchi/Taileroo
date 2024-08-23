import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CollectionNames, Colors, Roles} from '../../lib/constants';
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
    photoURL: 'https://via.placeholder.com/200',
  },
  {
    name: 'Tailor 2',
    lat: 13.624383,
    lng: 79.4077179,
    photoURL: 'https://via.placeholder.com/200',
  },
  {
    name: 'Tailor 3',
    lat: 13.624383,
    lng: 79.4077179,
    photoURL: 'https://via.placeholder.com/200',
  },
  {
    name: 'Tailor 4',
    lat: 13.624383,
    lng: 79.4077179,
    photoURL: 'https://via.placeholder.com/200',
  },
  {
    name: 'Tailor 5',
    lat: 13.624383,
    lng: 79.4077179,
    photoURL: 'https://via.placeholder.com/200',
  },
];

const radiuses = [5, 10, 15, 20];

const CustomerHome = ({navigation}: any) => {
  const {user} = useContext(userContext);
  const {currentLocation} = user;
  const [isLoading, setIsLoading] = useState(false);
  const [nearByTailorsCount, setNearByTailorsCount] = useState(0);

  const [region, setRegion] = useState({
    latitude: 13.624383,
    longitude: 79.4077179,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(radiuses[0]);

  const nearbyFilter = (tailor: any) => {
    return (
      Math.abs(tailor.latitude - currentLocation.latitude) <= 0.1 &&
      Math.abs(tailor.longitude - currentLocation.longitude) <= 0.1
    );
  };

  const calcuateNearByTailors = async () => {
    try {
      const tailors = await firestore()
        .collection(CollectionNames.Users)
        .where('role', '==', Roles.Tailor)
        .get();

      const tailorsData = tailors.docs
        .map(doc => doc.data())
        .map(data => data.currentLocation)
        .filter(nearbyFilter);

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
        setNearByTailorsCount(nearByTailors.length);
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
      <Loader message="Please wait while we get the best tailors near you" />
    );
  }

  if (nearByTailorsCount === 0) {
    return (
      <View style={styles.noTailorsFoundContainer}>
        <Text style={styles.noTailorsFoundText}>
          No Tailors Found , Please try again later or change location
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MapView style={styles.map} region={region} provider="google">
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
            onTouchStart={() => console.log('Pointer Enter')}
            onTouchEnd={() => console.log('Pointer Leave')}
            onDragStart={() => console.log('Drag Start')}
            icon={{uri: tailor?.photoURL}}
          />
        ))}
      </MapView>
      <View style={styles.bottomContainer}>
        <View style={styles.radiusContainer}>
          {radiuses.map((sRadius, index) => (
            <SmallCard
              title={`${sRadius} km`}
              selected={sRadius === radius}
              key={index}
              onPress={() => setRadius(sRadius)}
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
  noTailorsFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.Secondary,
  },
  noTailorsFoundText: {
    fontSize: 20,
    maxWidth: '80%',
    textAlign: 'center',
    color: Colors.Primary,
  },
});
