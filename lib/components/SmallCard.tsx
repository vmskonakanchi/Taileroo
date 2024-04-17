import {Dimensions, StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type SmallCardProps = {
  title: string;
  onPress?: () => void;
  key?: string | number;
  height?: number | string;
  width?: number | string;
};

const SmallCard = (props: SmallCardProps) => {
  const {title, onPress} = props;
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor={Colors.White}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

export default SmallCard;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.2,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.round(SCREEN_WIDTH + SCREEN_HEIGHT) / 2,
    borderWidth: 2,
    borderColor: Colors.White,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    color: Colors.White,
  },
});
