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
  selected?: boolean;
};

const SmallCard = (props: SmallCardProps) => {
  const {title, onPress, selected} = props;

  return (
    <TouchableHighlight
      style={[
        styles.container,
        {
          // borderColor: selected ? Colors.Secondary : Colors.Primary,
          borderWidth: selected ? 3 : 0.2,
        },
      ]}
      onPress={onPress}
      underlayColor={Colors.White}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

export default SmallCard;
const perfectHW = 75;

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
