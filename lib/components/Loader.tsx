import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

const Loader = () => {
  return <ActivityIndicator size="large" color={Colors.Primary} />;
};

export default Loader;

const styles = StyleSheet.create({});
