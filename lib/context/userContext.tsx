import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';

const defaultUser = {
  email: '',
  id: '',
  isLoggedIn: false,
};
export const userContext = createContext<any>(defaultUser);

const AuthContext = (props: React.PropsWithChildren) => {
  const [user, setUser] = useState(defaultUser);

  const onAuthStateChanged = (user: any) => {
    try {
      if (user) {
        setUser({
          email: user.email,
          id: user.uid,
          isLoggedIn: true,
        });
      } else {
        setUser({
          email: '',
          id: '',
          isLoggedIn: false,
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
    <userContext.Provider value={user}>{props.children}</userContext.Provider>
  );
};

export default AuthContext;
