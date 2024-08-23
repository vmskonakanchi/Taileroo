import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors, ScreenNames} from '../lib/constants';
import Home from '../screens/customer/Home';
import TailorProfile from '../screens/tailor/Profile';
import Profile from '../screens/customer/Profile';
import Map from '../screens/customer/Map';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const TailorViewNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
      }}>
      <Stack.Screen
        name={ScreenNames.TailorProfileView}
        component={TailorProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TailorViewNavigator;
