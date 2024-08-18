import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SelectCard from '../lib/components/SelectCard';
import {Colors, ScreenNames, Roles, CollectionNames} from '../lib/constants';
import {userContext} from '../lib/context/userContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../lib/components/Loader';

type HomeProps = {
  navigation: any;
};

const userTypes = Object.values(Roles) as UserType[];

type UserType = 'customer' | 'tailor';

const Home = ({navigation}: HomeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(userContext);

  const handlePress = (userType: UserType) => {
    navigation.navigate(ScreenNames.Login, {userType});
  };

  useEffect(() => {
    setIsLoading(true);
    const user = auth().currentUser;

    firestore()
      .collection(CollectionNames.Users)
      .doc(user?.uid)
      .get()
      .then(userDoc => {
        const user = userDoc.data(); // userDoc.data() is null if user is not found
        if (user) {
          setUser(user);
          setIsLoading(false);
          if (user.role === Roles.Customer) {
            navigation.navigate(ScreenNames.CustomerNav, {
              screen: ScreenNames.CustomerHome,
            });
          } else if (user.role === Roles.Tailor) {
            navigation.navigate(ScreenNames.TailorNav, {
              screen: ScreenNames.TailorHome,
            });
          }
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Error getting document:', error);
      });
  }, []);

  if (isLoading) {
    return <Loader message="Checking User..." />;
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Select The User Type To Continue</Text>
        {userTypes.map(userType => (
          <SelectCard
            key={userType}
            title={userType.charAt(0).toUpperCase() + userType.slice(1)}
            onPress={() => {
              handlePress(userType);
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.Secondary,
    gap: 20,
  },
  text: {
    fontSize: 20,
    maxWidth: '50%',
    textAlign: 'center',
    color: Colors.Primary,
  },
});
