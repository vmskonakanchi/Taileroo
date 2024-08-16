import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigations/RootNavigator';
import AuthContext from './lib/context/userContext';

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
