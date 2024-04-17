import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InputProps = {
  placeholder: string;
  isPassword?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  isMultiLine?: boolean;
  keyBoardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
};

type InputRefProps = {
  focus: () => void;
  setNativeProps: (props: any) => void;
};

const Input = React.forwardRef<InputRefProps, InputProps>((props, ref) => {
  const {placeholder, isPassword, onChange, keyBoardType, value, isMultiLine} =
    props;
  const [checked, setCheked] = React.useState(false);
  const handleCheck = () => setCheked(!checked);

  if (isPassword) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={isPassword && !checked}
          onChangeText={onChange}
          value={value}
          keyboardType={keyBoardType}
          placeholderTextColor={Colors.Black}
        />
        <Icon
          name={checked ? 'eye-off' : 'eye'}
          color={Colors.Primary}
          size={30}
          onPress={handleCheck}
          style={styles.icon}
        />
      </View>
    );
  }

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyBoardType}
      multiline={isMultiLine}
      onChangeText={onChange}
      value={value}
      placeholderTextColor={Colors.Black}
    />
  );
});

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: '5%',
    top: '25%',
  },
  input: {
    padding: '5%',
    backgroundColor: Colors.White,
    color: Colors.Black,
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    fontSize: 15,
  },
});
