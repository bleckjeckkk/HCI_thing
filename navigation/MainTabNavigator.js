import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeStack/HomeScreen';
import HomeScreen2 from '../screens/HomeStack/HomeScreen2';

import SettingsScreen from '../screens/SettingsStack/SettingsScreen';
import Fav from '../screens/SettingsStack/Favorites';
import FAQ from '../screens/SettingsStack/FAQ';
import ContactUs from '../screens/SettingsStack/ContactUs';

import colors from '../constants/Colors';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Home2: HomeScreen2,
  },
  {
    initialRouteName : 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

//-----------------------------------------------------------------
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    FAQ : FAQ,
    ContactUs : ContactUs,
    Fav : Fav,
  },
  {
    initialRouteName : 'Settings',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
});
