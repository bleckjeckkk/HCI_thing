import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeStack/HomeScreen';
import HomeScreen2 from '../screens/HomeStack/HomeScreen2';

import LinksScreen from '../screens/LinkStack/LinksScreen';

import SettingsScreen from '../screens/SettingsStack/SettingsScreen';
import FAQ from '../screens/SettingsStack/FAQ';
import ContactUs from '../screens/SettingsStack/ContactUs';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Home2: HomeScreen2,
  },
  {
    initialRouteName : 'Home',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

//---------------------------------------------------
const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};
//-----------------------------------------------------------------
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    FAQ : FAQ,
    ContactUs : ContactUs,
  },
  {
    initialRouteName : 'Settings'
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
