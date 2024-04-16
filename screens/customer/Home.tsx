import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../lib/constants';
// import MapView from 'react-native-maps';

type CustomerHomeProps = {
  navigation: any;
};

const CustomerHome = ({navigation}: CustomerHomeProps) => {
  return (
    // <MapView
    //   style={styles.map}
    //   region={{
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.015,
    //     longitudeDelta: 0.0121,
    //   }}></MapView>
    <View></View>
  );
};

export default CustomerHome;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.Secondary,
    gap: 20,
  },
  text: {
    fontSize: 20,
    maxWidth: '50%',
    textAlign: 'center',
    color: Colors.Primary,
  },
});
