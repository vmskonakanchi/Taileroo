import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type SelectCardProps = {
  title?: string;
  onPress?: () => void;
  key?: string | number;
  height?: number | string;
  width?: number | string;
};

const SelectCard = (props: SelectCardProps) => {
  const {title, onPress} = props;
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor={Colors.White}>
      <Text style={styles.text}>{title || 'Title'}</Text>
    </TouchableHighlight>
  );
};

export default SelectCard;

// const perfectHW = SCREEN_WIDTH * 0.7;
const perfectHW = 250;

const styles = StyleSheet.create({
  container: {
    height: perfectHW,
    width: perfectHW,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: perfectHW / 2,
    borderWidth: 2,
    borderColor: Colors.White,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    color: Colors.White,
  },
});
