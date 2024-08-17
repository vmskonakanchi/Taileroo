import {StyleSheet, TouchableHighlight, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InputProps = {
  title?: string;
  onPress?: any; // this will be callback function
  icon?: string;
  reverse?: boolean;
};

const Button = (props: InputProps) => {
  const {title, onPress, icon, reverse} = props;

  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={Colors.White}>
      <View style={styles.innerContainer}>
        {reverse ? (
          <>
            <Icon name={icon || 'account'} size={30} color={Colors.White} />
            <Text style={styles.text}>{title}</Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>{title}</Text>
            <Icon name={icon || 'account'} size={30} color={Colors.White} />
          </>
        )}
      </View>
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
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
