import {StyleSheet, TouchableHighlight, Text} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

type InputProps = {
  title?: string;
  onPress?: any; // this will be callback function
};

const Button = (props: InputProps) => {
  const {title, onPress} = props;

  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={Colors.White}>
      <Text style={styles.text}>{title || 'Click Me'}</Text>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: Colors.White,
    textAlign: 'center',
  },
});
