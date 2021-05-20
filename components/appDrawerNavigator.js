import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './appTabNavigator'
import CustomSideBarMenu  from './customSidebarMenu';
import SettingScreen from '../screens/settingScreen';
import MyDonationScreen from '../screens/myDonationScreen'; 
import NotificationScreen from '../screens/notificationScreen';
import MyReceivedBooksScreen from '../screens/myRecievedBooksScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyDonations:{
      screen:MyDonationScreen
    },
    Notifications:{
      screen:NotificationScreen
    },
    MyRecievedBooks:{
      screen:MyReceivedBooksScreen
    },
    Settings:{
      screen:SettingScreen
    }
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })