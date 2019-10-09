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
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  async componentDidMount() {

    this.loginStatusListener = EventEmitter.addListener(EventKeys.USER_IS_NOT_LOGIN, this._logout);
    this.payResListener = EventEmitter.addListener(EventKeys.USER_PAY_RES, this._userPayRes);
    this.props.getConfig()
  }

  _logout = async () => {
    this.props.clearUserInfo({ userId: undefined, status: 0, fiatType: undefined })
    this.props.navigate('Auth');
  }

  _userPayRes = (data) => {
    console.log('================data====================');
    console.log(data);
    console.log('===============data=====================');
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
