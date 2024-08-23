import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, ScreenNames} from '../lib/constants';
import Home from '../screens/customer/Home';
import TailorProfile from '../screens/tailor/Profile';
import Profile from '../screens/customer/Profile';
import Map from '../screens/customer/Map';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const CustomerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.Primary,
        tabBarInactiveTintColor: Colors.White,
        tabBarActiveBackgroundColor: Colors.Secondary,
        tabBarStyle: {
          backgroundColor: Colors.Primary,
        },
      }}>
      <Tab.Screen
        name={ScreenNames.CustomerHome}
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.CustomerMap}
        component={Map}
        options={{
          headerShown: false,
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="map-marker-account"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Customer_Profile}
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerNavigator;
