import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigations/RootNavigator';
import AuthContext from './lib/context/userContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {webClientId} from './lib/constants';
import {BackHandler} from 'react-native';

GoogleSignin.configure({
  webClientId,
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
