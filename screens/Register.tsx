import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import SelectCard from '../lib/components/SelectCard';
import {Colors, ScreenNames} from '../lib/constants';
import Input from '../lib/components/Input';
import Button from '../lib/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';

type RegisterProps = {
  navigation: any;
  route: any;
};

const Register = ({navigation, route}: RegisterProps) => {
  const {userType} = route.params as {userType: 'Customer' | 'Tailor'};
  const [details, setDetails] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
  });
  const [locationFetching, setLocationFetching] = React.useState(true);

  const handleChange = (key: string, value: string) => {
    setDetails({...details, [key]: value});
  };

  const handleLogin = () => {
    navigation.navigate(ScreenNames.Login, {userType});
  };

  const handleRegister = () => {
    navigation.navigate(ScreenNames.CustomerNav);
  };

  const fetchLocation = async () => {
    const permissionsToAsk =
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

    const granted = await PermissionsAndroid.request(permissionsToAsk, {
      title: 'Location Permission',
      message: 'We need your location to fill the address automatically.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      Alert.alert('Permission Denied', 'Please fill the address manually.');
      return;
    }
    setLocationFetching(true);
    // get address here
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude, position.coords.longitude);
        setDetails({
          ...details,
          address: `${position.coords.latitude}, ${position.coords.longitude}`,
        });
        // send an api request to get the address to the google api
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

  React.useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Icon name="facebook" size={100} color={Colors.Primary} />
        <Input
          placeholder="Enter Name"
          onChange={text => handleChange('name', text)}
        />
        <Input
          placeholder="Enter Phone"
          onChange={text => handleChange('name', text)}
          keyBoardType="phone-pad"
        />
        <Input
          placeholder="Enter Email"
          onChange={text => handleChange('email', text)}
          keyBoardType="email-address"
        />
        {locationFetching ? (
          <ActivityIndicator size={50} />
        ) : (
          <Input
            placeholder="Enter Location"
            value={details.address}
            onChange={text => handleChange('address', text)}
          />
        )}
        <Input
          placeholder="Enter Password.. "
          isPassword
          onChange={text => handleChange('password', text)}
        />
        <Button title="Register" onPress={handleRegister} />
        <Button title="Go Back" onPress={handleLogin} />
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
});
