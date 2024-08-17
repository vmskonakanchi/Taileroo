import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigations/RootNavigator';
import AuthContext from './lib/context/userContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '248758004114-dl8grcraq80aaqpoivfl11u2m0tv1569.apps.googleusercontent.com',
});

function App() {
  return (
    <AuthContext>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext>
  );
}

export default App;
