import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import InfoScreen from '../Containers/InfoScreen'
import UpdateScreen from '../Containers/UpdateScreen'
import LanguageScreen from '../Containers/LanguageScreen'
import RecordScreen from '../Containers/RecordScreen'
import OrderScreen from '../Containers/OrderScreen'
import ReceiptScreen from '../Containers/ReceiptScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import Colors from '../Themes/Colors'

const BottomTabNav = createBottomTabNavigator({
  Receipt: { screen: ReceiptScreen },
  Record: { screen: RecordScreen },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  // navigationOptions:{
  //     header:null
  // },
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.text002,
    tabStyle: styles.bottom,
    showIcon: true,
    style: {
      backgroundColor: Colors.background
    }
  }

});


// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  BottomTab: { screen: BottomTabNav },
  InfoScreen: { screen: InfoScreen },
  UpdateScreen: { screen: UpdateScreen },
  LanguageScreen: { screen: LanguageScreen },
  RecordScreen: { screen: RecordScreen },
  OrderScreen: { screen: OrderScreen },
  ReceiptScreen: { screen: ReceiptScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  cardStyle: {
    shadowColor: 'BottomTab'
  },
  initialRouteName: 'BottomTab',
  defaultNavigationOptions: {
    headerStyle: styles.header,
    headerTintColor: Colors.text001,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
})

export default createAppContainer(PrimaryNav)
