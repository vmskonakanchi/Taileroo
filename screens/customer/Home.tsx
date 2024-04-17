import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../lib/constants';
import MapView, {Marker} from 'react-native-maps';
import {
  calculateRegion,
  randomizeCoordinatesWithinRadius,
} from '../../lib/utils';
import SmallCard from '../../lib/components/SmallCard';

type CustomerHomeProps = {
  navigation: any;
  route: {params: {lat: number; lng: number}};
};

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

const CustomerHome = ({navigation, route}: CustomerHomeProps) => {
  const {lat, lng} = route.params;
  const [region, setRegion] = useState<NearByTailor>({
    latitude: 13.624383,
    longitude: 79.4077179,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(radiuses[0]);

  const handleRadiusChange = (radius: number) => {
    nearByTailors.map(tailor => {
      const {lat: tLat, lng: tLng} = randomizeCoordinatesWithinRadius(
        lat,
        lng,
        radius,
      );
      tailor.lat = tLat;
      tailor.lng = tLng;
    });
  };

  useEffect(() => {
    handleRadiusChange(radius);
  }, []);

  // useEffect(() => {
  //   setRegion(calculateRegion(nearByTailors, radius));
  // }, [radius]);

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
