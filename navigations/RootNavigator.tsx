import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Roles, ScreenNames} from '../lib/constants';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import CustomerNavigator from './CustomerNavigator';
// import TailorViewNavigator from './TailorViewNavigation';
import TailorProfile from '../screens/tailor/Profile';
import {userContext} from '../lib/context/userContext';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {user} = useContext(userContext);

  return (
    <Stack.Navigator>
      {/* Auth Flow */}
      <Stack.Group>
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
      </Stack.Group>

      {/* Customer Navigator */}
      {user && user.role === Roles.Customer && (
        <Stack.Screen
          name={ScreenNames.CustomerNav}
          component={CustomerNavigator}
          options={{headerShown: false}}
        />
      )}

      {/* Tailor Navigator */}
      {user && user.role === Roles.Tailor && (
        <Stack.Screen
          name={ScreenNames.CustomerNav}
          component={CustomerNavigator}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
