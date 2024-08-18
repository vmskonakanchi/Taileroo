import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {CollectionNames, Colors, ScreenNames} from '../lib/constants';
import Button from '../lib/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import Loader from '../lib/components/Loader';
import {userContext} from '../lib/context/userContext';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

type LoginProps = {
  navigation: any;
  route: any;
};

type UserType = 'customer' | 'tailor';
type AuthProvider = 'google' | 'apple';

const Login = ({navigation, route}: LoginProps) => {
  const {userType} = route.params as {userType: UserType};
  const [isLoading, setIsLoading] = useState(false);
  const currentLocationRef = useRef({
    latitude: 0,
    longitude: 0,
    address: '',
  });

  const {setUser} = useContext(userContext);

  const handleLoginWithOAuth = async (provider: AuthProvider) => {
    try {
      if (
        currentLocationRef.current.latitude === 0 ||
        currentLocationRef.current.longitude === 0
      ) {
        Alert.alert('Error', 'Please enable location permission to continue');
        return;
      }

      setIsLoading(true);
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
        Alert.alert('Error', 'Something went wrong');
        setIsLoading(false);
        return;
      }

      if (result.user) {
        // if we have a user
        const {user} = result;

        const userDoc = await firestore()
          .collection(CollectionNames.Users)
          .doc(user?.uid)
          .get();

        console.log('currentLocation', currentLocationRef.current);

        if (userDoc.exists) {
          // we found the user in the database
          const userData = userDoc.data();

          if (userData?.role !== userType) {
            setIsLoading(false);
            Alert.alert(
              'Error',
              `You are not a ${userType}, please login with the correct account`,
            );
            return;
          }

          setUser({
            name: user?.displayName,
            email: user?.email,
            id: user?.uid,
            role: userData?.role,
            currentLocation: userData?.currentLocation,
          });

          setIsLoading(false);
          navigation.navigate(ScreenNames.CustomerNav, {userType});
        } else {
          // we do not have a user , so we need to create a user
          const newUser = {
            name: user?.displayName,
            email: user?.email,
            id: user?.uid,
            role: userType,
            currentLocation: currentLocationRef.current,
          };

          await firestore()
            .collection(CollectionNames.Users)
            .doc(user?.uid)
            .set(newUser);

          setUser(newUser);
          setIsLoading(false);
          navigation.navigate(ScreenNames.CustomerNav, {userType});
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  const fetchLocation = async () => {
    let isPermssionGranted = false;
    if (Platform.OS === 'ios') {
      const locationResponse = await Geolocation.requestAuthorization(
        'whenInUse',
      );
      isPermssionGranted = locationResponse === 'granted';
    } else if (Platform.OS === 'android') {
      const permissionsToAsk =
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

      const granted = await PermissionsAndroid.request(permissionsToAsk, {
        title: 'Location Permission',
        message: 'We need your location to show you the best tailors near you',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      isPermssionGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    if (!isPermssionGranted) {
      Alert.alert(
        'Permission Denied',
        'Please enable location permission to continue',
      );
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        // sending an api request to get the address to the google api and get the address
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json',
          {
            params: {
              latlng: `${latitude},${longitude}`,
              key: 'AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU',
            },
          },
        );

        currentLocationRef.current = {
          latitude,
          longitude,
          address: response.data.results[0].formatted_address,
        };
      },
      error => {
        console.log('Error fetching location', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Icon name="facebook" size={100} color={Colors.Primary} />
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
