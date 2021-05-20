
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/welcomeScreen';
import {AppDrawerNavigator} from './components/appDrawerNavigator'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {AppTabNavigator} from './components/appTabNavigator';

export default class App extends React.Component {
  render(){
    return(
      <AppContainer/>
    )
  }
}
const switchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator},
})
const AppContainer=createAppContainer(switchNavigator);


