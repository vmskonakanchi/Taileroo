import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

type LoaderProps = {
  message?: string;
};

const Loader = (props: LoaderProps) => {
  const {message} = props;
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Colors.Primary}
        style={styles.loader}
      />
      <Text style={styles.loaderText}>
        {message || 'Please wait a moment 🚀'}
      </Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.Secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    transform: [{scale: 2}],
  },
  loaderText: {
    color: Colors.Primary,
    fontSize: 20,
    marginTop: 20,
  },
});
