import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AdminNavigator from './AdminNavigator';
import LoginScrn from './Login';
import AuthLoadingScreen from './LoadingScreen';

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading : AuthLoadingScreen,
    Main: MainTabNavigator,
    Admin: AdminNavigator,
    Login : LoginScrn
  },
  {
    initialRouteName : 'AuthLoading',
  }
);