import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

type SelectCardProps = {
  title?: string;
  onPress?: () => void;
  key?: string;
};

const SelectCard = (props: SelectCardProps) => {
  const {title, onPress} = props;
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title || 'Title'}</Text>
    </TouchableHighlight>
  );
};

export default SelectCard;

const styles = StyleSheet.create({
  container: {
    height: '30%',
    width: '60%',
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.White,
  },
  text: {
    fontSize: 20,
    color: Colors.White,
  },
});
