import {
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, ScreenNames} from '../lib/constants';
import Input from '../lib/components/Input';
import Button from '../lib/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

type RegisterProps = {
  navigation: any;
  route: any;
};

const Register = ({navigation, route}: RegisterProps) => {
  const {userType} = route.params as {userType: 'Customer' | 'Tailor'};
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    lat: 0,
    lng: 0,
  });
  const [locationFetching, setLocationFetching] = useState(true);

  const handleChange = (key: string, value: string) => {
    setDetails({...details, [key]: value});
  };

  const handleLogin = () => {
    navigation.navigate(ScreenNames.Login, {userType});
  };

  const handleRegister = async () => {
    // ask for notification permissions for both IOS and Android
    const authorizationStatus = await messaging().requestPermission({
      sound: true,
      announcement: true,
      alert: true,
      provisional: true,
    });

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('Permission granted');
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Permission Provisional');
    } else {
      console.log('Permission Denied');
    }

    navigation.navigate(ScreenNames.CustomerNav, {
      screen: ScreenNames.CustomerHome,
      params: {
        lat: details.lat,
        lng: details.lng,
      },
    });
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
        message: 'We need your location to fill the address automatically.',
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
    setLocationFetching(true);
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setDetails({
          ...details,
          lat: latitude,
          lng: longitude,
        });

        // sending an api request to get the address to the google api and get the address
        // const response = await axios.get(
        //   'https://maps.googleapis.com/maps/api/geocode/json',
        //   {
        //     params: {
        //       latlng: `${latitude},${longitude}`,
        //       key: 'AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU',
        //     },
        //   },
        // );

        // const address = response.data.results[0].formatted_address;
        const address = 'Test Address, Test City, Test State, Test Country';
        setDetails({...details, address});
        setLocationFetching(false);
      },
      error => {
        setLocationFetching(false);
        console.log(error);
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

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Icon name="facebook" size={100} color={Colors.Primary} />
        <Input
          placeholder="Enter Name"
          onChange={text => handleChange('name', text)}
          isError={details.name.length < 3}
        />
        <Input
          placeholder="Enter Phone"
          onChange={text => handleChange('phone', text)}
          keyBoardType="phone-pad"
          isError={details.phone.length !== 10}
        />
        <Input
          placeholder="Enter Email"
          onChange={text => handleChange('email', text)}
          keyBoardType="email-address"
          isError={!details.email.includes('@')}
        />
        {locationFetching ? (
          <Text style={styles.loader}>Fetching Your Address...</Text>
        ) : (
          <Input
            placeholder="Enter Location"
            isMultiLine
            value={details.address}
            onChange={text => handleChange('address', text)}
          />
        )}
        <Input
          placeholder="Enter Password.. "
          isPassword
          onChange={text => handleChange('password', text)}
          isError={details.password.length < 6}
        />
        <Button title="Register" icon="account-plus" onPress={handleRegister} />
        <Button
          title="Go Back"
          icon="arrow-left"
          reverse
          onPress={handleLogin}
        />
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Secondary,
  },
  container: {
    marginTop: '10%',
    marginHorizontal: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    gap: 20,
  },
  loader: {
    fontSize: 15,
    color: Colors.Black,
  },
});
