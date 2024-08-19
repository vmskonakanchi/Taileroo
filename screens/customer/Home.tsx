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

const CustomerHome = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text>Customer Home</Text>
    </View>
  );
};

export default CustomerHome;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.Secondary,
  },
});
