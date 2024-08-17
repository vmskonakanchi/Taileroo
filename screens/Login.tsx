import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectCard from '../lib/components/SelectCard';
import {CollectionNames, Colors, ScreenNames} from '../lib/constants';
import Input from '../lib/components/Input';
import Button from '../lib/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

  const handleLoginWithOAuth = async (provider: 'google' | 'apple') => {
    try {
      const result = await auth().signInWithPopup(
        provider === 'google'
          ? new auth.OAuthProvider('google.com')
          : new auth.OAuthProvider('apple.com'),
      );
      if (result.user) {
        const {user} = result;

        const userDoc = await firestore()
          .collection(CollectionNames.Users)
          .doc(user?.uid)
          .get();

        if (userDoc.exists) {
          // we found the user in the database , check for the role of user , he is customer or tailor
          const userData = userDoc.data();

          if (userData?.role !== userType) {
            console.log('User is not a', userType);
            return;
          }

          navigation.navigate(ScreenNames.Home, {userType});
        } else {
          console.log('User not found in the database');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await auth().signInWithEmailAndPassword(
        details.email,
        details.password,
      );

      const {user} = result;

      const userDoc = await firestore()
        .collection(CollectionNames.Users)
        .doc(user?.uid)
        .get();

      if (userDoc.exists) {
        // we found the user in the database , check for the role of user , he is customer or tailor
        const userData = userDoc.data();

        if (userData?.role !== userType) {
          console.log('User is not a', userType);
          return;
        }

        navigation.navigate(ScreenNames.Home, {userType});
      } else {
        console.log('User not found in the database');
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log('User not found');
      } else if (error.code === 'auth/wrong-password') {
        console.log('Wrong password');
      } else if (error.code === 'auth/invalid-email') {
        console.log('Invalid email');
      } else if (error.code === 'auth/too-many-requests') {
        console.log('Too many requests');
      } else if (error.code === 'auth/network-request-failed') {
        console.log('Network request failed');
      } else {
        console.log('Error:', error);
      }
    }
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
        <Button
          title="Login With Google"
          onPress={(_: any) => handleLoginWithOAuth('google')}
        />
        <Button
          title="Login With Twitter"
          onPress={(_: any) => handleLoginWithOAuth('apple')}
        />
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
