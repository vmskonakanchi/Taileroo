import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../lib/constants';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import CustomerNavigator from './CustomerNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.Login}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.Register}
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.CustomerNav}
        component={CustomerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
