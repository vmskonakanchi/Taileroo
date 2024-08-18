import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectCard from '../lib/components/SelectCard';
import {CollectionNames, Colors, ScreenNames} from '../lib/constants';
import Input from '../lib/components/Input';
import Button from '../lib/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import Loader from '../lib/components/Loader';

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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (key: string, value: string) => {
    setDetails({...details, [key]: value});
  };

  const handleLoginWithOAuth = async (provider: 'google' | 'apple') => {
    try {
      let result = null;
      if (provider === 'google') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const {idToken} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        result = await auth().signInWithCredential(googleCredential);
        // Sign-in the user with the credential
      } else if (provider === 'apple') {
        result = await auth().signInWithProvider(
          new auth.OAuthProvider('apple.com'),
        );
      }

      if (!result) {
        console.log('Result is null');
        return;
      }

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
          // we do not have a user , so we need to create a user
          const newUser = {
            email: user?.email,
            role: userType,
          };

          await firestore()
            .collection(CollectionNames.Users)
            .doc(user?.uid)
            .set(newUser);

          navigation.navigate(ScreenNames.CustomerNav, {userType});
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (!details.email.includes('@')) {
        console.log('Invalid email');
        return;
      }

      if (details.password.length < 6) {
        console.log('Password must be atleast 6 characters long');
        return;
      }

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Icon name="facebook" size={100} color={Colors.Primary} />
        <Input
          placeholder="Enter Email"
          onChange={text => handleChange('email', text)}
          keyBoardType="email-address"
          isError={details.email.length > 0 && !details.email.includes('@')}
        />
        <Input
          placeholder="Enter Password.. "
          isPassword
          onChange={text => handleChange('password', text)}
          isError={details.password.length > 0 && details.password.length < 6}
        />
        <Button title="Login" icon="login" onPress={handleLogin} />
        {Platform.OS === 'android' && (
          <Button
            title="Continue With Google"
            icon="google"
            onPress={(_: any) => handleLoginWithOAuth('google')}
          />
        )}
        {Platform.OS === 'ios' && (
          <Button
            title="Continue With Apple"
            icon="apple"
            onPress={(_: any) => handleLoginWithOAuth('apple')}
          />
        )}
        <Button title="Register" icon="account-plus" onPress={handleRegister} />
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
