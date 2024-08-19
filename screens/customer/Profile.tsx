import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors, Roles, ScreenNames} from '../../lib/constants';
import {userContext} from '../../lib/context/userContext';
import Button from '../../lib/components/Button';
import auth from '@react-native-firebase/auth';
import Loader from '../../lib/components/Loader';

const Profile = ({navigation}: any) => {
  const {user} = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      setIsLoading(false);
      navigation.navigate(ScreenNames.Login, {userType: Roles.Customer});
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  if (isLoading) {
    return <Loader message="Please wait while we log you out" />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.roundedImage}>
        <Image source={{uri: user?.photoURL}} style={styles.image} />
      </View>

      <View style={styles.card}>
        <Text style={styles.nameText}>{user?.name}</Text>
        <Text style={styles.nameText}>{user?.email}</Text>
        <Text style={styles.nameText}>{user?.phone}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nameText}>{user?.currentLocation?.address}</Text>
      </View>

      <Button title="Logout" onPress={handleLogout} icon="logout" reverse />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Colors.Secondary,
  },
  nameText: {
    color: Colors.Primary,
    fontSize: 20,
  },
  roundedImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  card: {
    backgroundColor: Colors.White,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
