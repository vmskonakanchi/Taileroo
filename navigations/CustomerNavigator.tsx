import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, ScreenNames} from '../lib/constants';
import Home from '../screens/customer/Home';
import TailorProfile from '../screens/tailor/Profile';
import Profile from '../screens/customer/Profile';
import Map from '../screens/customer/Map';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackHandler} from 'react-native';
import {Alert} from 'react-native';

const Tab = createBottomTabNavigator();

const CustomerNavigator = ({navigation}: any) => {
  const handleBackButton = () => {
    const currentNavState = navigation.getState();
    const {index, routeNames} = currentNavState;

    let result;

    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'No',
        onPress: () => {
          result = false;
        },
      },
      {
        text: 'Yes',
        onPress: () => {
          result = true;
        },
      },
    ]);

    console.log(result);
    return result;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

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

      <Tab.Screen
        name={ScreenNames.TailorProfileView}
        component={TailorProfile}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerNavigator;
