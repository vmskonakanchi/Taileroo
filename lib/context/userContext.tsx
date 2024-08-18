import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {CollectionNames} from '../constants';

const defaultUser = {
  email: '',
  id: '',
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
            id: user.uid,
            currentLocation: userData?.currentLocation,
          });
        }
      } else {
        setUser({
          email: '',
          id: '',
          currentLocation: {
            latitude: 0,
            longitude: 0,
            address: '',
          },
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
