import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {CollectionNames} from '../constants';

const defaultUser = {
  id: '',
  name: '',
  email: '',
  phone: '',
  photoURL: '',
  role: '',
  currentLocation: {
    latitude: 0,
    longitude: 0,
    address: '',
  },
};

export const userContext = createContext<any>(defaultUser);

const AuthContext = (props: React.PropsWithChildren) => {
  const [user, setUser] = useState(defaultUser);

  const onAuthStateChanged = async (user: any) => {
    try {
      if (user) {
        const {uid} = user;
        const userDoc = await firestore()
          .collection(CollectionNames.Users)
          .doc(uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();

          setUser({
            email: user.email,
            name: user.displayName,
            phone: '',
            id: user.uid,
            currentLocation: userData?.currentLocation,
            photoURL: userData?.photoURL,
            role: userData?.role,
          });
        }
      } else {
        setUser({
          id: '',
          role: '',
          name: '',
          phone: '',
          email: '',
          currentLocation: {
            latitude: 0,
            longitude: 0,
            address: '',
          },
          photoURL: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <userContext.Provider value={{user, setUser}}>
      {props.children}
    </userContext.Provider>
  );
};

export default AuthContext;
