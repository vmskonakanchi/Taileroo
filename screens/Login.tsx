import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectCard from '../lib/components/SelectCard';
import {Colors, ScreenNames} from '../lib/constants';
import Input from '../lib/components/Input';
import Button from '../lib/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LoginProps = {
  navigation: any;
  route: any;
};

const Login = ({navigation, route}: LoginProps) => {
  const {userType} = route.params as {userType: 'Customer' | 'Tailor'};
  const [details, setDetails] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (key: string, value: string) => {
    setDetails({...details, [key]: value});
  };

  const handleLogin = () => {
    // if (details.username && details.password) {
    //   navigation.navigate(ScreenNames.Home, {userType});
    // }
    console.log('details', details);
  };

  const handleRegister = () => {
    navigation.navigate(ScreenNames.Register, {userType});
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Icon name="facebook" size={100} color={Colors.Primary} />
        <Input
          placeholder="Enter Email"
          onChange={text => handleChange('email', text)}
          keyBoardType="email-address"
        />
        <Input
          placeholder="Enter Password.. "
          isPassword
          onChange={text => handleChange('password', text)}
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Secondary,
  },
  container: {
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 20,
  },
});
