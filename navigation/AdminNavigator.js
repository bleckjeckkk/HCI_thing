import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeStack/HomeScreen';
import HomeScreen2 from '../screens/HomeStack/HomeScreen2';

import AdminHome from '../screens/AdminStack/AdminHome';
import Messages from '../screens/AdminStack/Messages';

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
const Admin = createStackNavigator(
  {
    Home: AdminHome,
    Messages : Messages,
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

Admin.navigationOptions = {
  tabBarLabel: 'Admin Options',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  Admin,
});
