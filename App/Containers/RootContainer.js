import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import ConfigActions from '../Redux/ConfigRedux'
import PaymentActions from '../Redux/PaymentRedux'
import UserActions from '../Redux/UserRedux'
import { EventEmitter, EventKeys } from '../utils/EventEmitter';
import { NavigationActions } from 'react-navigation';
import OrderResModel from '../Components/OrderResModel'
import { DeviceStorage, Keys } from '../Lib/DeviceStorage'
import io from 'socket.io-client';
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  constructor(props) {
    super(props);
    this.socket = io('http://192.168.51.73:7003');
    console.log('============this.socket========================');
    console.log(this.socket);
    console.log('============this.socket========================');
    this.socket.emit('login', { userId: '1' })
    this.socket.on('userPayRes', (msg) => {
      console.log('===========userPayRes=========================');
      console.log(msg);
      console.log('===========userPayRes=========================');
    });

    this.ws = new WebSocket('ws://192.168.51.73:7003');

    this.ws.onopen = () => {
      // connection opened
      console.log('=============onopen=======================');
      this.ws.send('something'); // send a messages
      console.log('=============onopen=======================');
    };
    this.ws.onmessage = (e) => {
      // a message was received
      console.log('===========onmessage=========================');
      console.log(e.data);
      console.log('===========onmessage=========================');
    };
    this.ws.onerror = (e) => {
      // an error occurred
      console.log('===========onerror=========================');
      console.log(e.message);
      console.log('===========onerror=========================');
    };
    this.ws.onclose = (e) => {
      // connection closed
      console.log('===========onclose=========================');
      console.log(e.code, e.reason);
      console.log('===========onclose=========================');

    };

  }

  async componentDidMount() {
    this.loginStatusListener = EventEmitter.addListener(EventKeys.USER_IS_NOT_LOGIN, this._logout);
    this.payResListener = EventEmitter.addListener(EventKeys.USER_PAY_RES, this._userPayRes);
    this.props.getConfig()
  }

  componentWillUnmount() {
    this.loginStatusListener.remove();
    this.payResListener.remove();
  }

  _logout = async () => {
    this.props.clearUserInfo({ userId: undefined, status: 0, fiatType: undefined })
    this.props.navigate('Auth');
    DeviceStorage.clear();
  }

  _userPayRes = (data) => {
    this.props.updatePayRes({ payRes: data })
    this.props.updateIsShowModel({ isShowModel: true })
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <OrderResModel />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),

  navigate: (route, params) => dispatch(NavigationActions.navigate({ routeName: route, params })),
  getConfig: () => dispatch(ConfigActions.getConfig()),
  clearUserInfo: (params) => dispatch(UserActions.update(params)),

  updateIsShowModel: (params) => dispatch(ConfigActions.update(params)),
  updatePayRes: (params) => dispatch(PaymentActions.update(params)),
})

export default connect(null, mapDispatchToProps)(RootContainer)
