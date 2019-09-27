import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import { Platform } from 'react-native'
import InfoScreen from '../Containers/InfoScreen'
import LanguageScreen from '../Containers/LanguageScreen'
import RecordScreen from '../Containers/RecordScreen'
import OrderScreen from '../Containers/OrderScreen'
import ReceiptScreen from '../Containers/ReceiptScreen'
import LoginScreen from '../Containers/LoginScreen'
import CurrencyScreen from '../Containers/CurrencyScreen'

import UpdateScreen from '../Containers/UpdateScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Simple from 'react-native-vector-icons/SimpleLineIcons';
import I18n from '../I18n'
import styles from './Styles/NavigationStyles'
import { Metrics, Colors, Fonts } from '../Themes';


// Manifest of possible screens
const ReceiptStack = createStackNavigator({
  ReceiptScreen: { screen: ReceiptScreen },
  OrderScreen: { screen: OrderScreen },

  InfoScreen: { screen: InfoScreen },
  UpdateScreen: { screen: UpdateScreen },
  LanguageScreen: { screen: LanguageScreen },
  CurrencyScreen: { screen: CurrencyScreen },
}, {
  // Default config for all screens
  mode: "card",
  headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
  initialRouteName: 'ReceiptScreen',
  defaultNavigationOptions: {
    headerStyle: styles.header,
    headerTintColor: Colors.background,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
})

const RecordStack = createStackNavigator({
  RecordScreen: { screen: RecordScreen },
}, {
  // Default config for all screens
  mode: "card",
  headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
  defaultNavigationOptions: {
    headerStyle: styles.header,
    headerTintColor: Colors.background,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
})

const TabNavigator = createBottomTabNavigator({
  Receipt: {
    screen: ReceiptStack, navigationOptions: {
      tabBarLabel: I18n.t('ReceiptTab'),
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name={'qrcode'}
          size={Metrics.tabIconSize}
          color={tintColor}
        />
      )
    }
  },
  Record: {
    screen: RecordStack, navigationOptions: {
      tabBarLabel: I18n.t('RecordTab'),
      tabBarIcon: ({ tintColor }) => (
        <Simple name={'notebook'}
          size={Metrics.tabIconSize}
          color={tintColor}
        />
      )
    }
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.text002,
    tabStyle: styles.bottom,
    showIcon: true,
    style: {
      backgroundColor: Colors.background
    }
  },
});

// Manifest of possible screens
const AuthStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen }
})

const switchNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: TabNavigator,
  },
  {
    initialRouteName: 'App',
  }
);

export default createAppContainer(switchNavigator)

