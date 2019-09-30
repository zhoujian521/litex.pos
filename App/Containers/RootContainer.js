import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import ConfigActions from '../Redux/ConfigRedux'
import { DeviceStorage, Keys } from '../Lib/DeviceStorage';
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  async componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    this.props.getConfig()
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),

  getConfig: () => dispatch(ConfigActions.getConfig())
})

export default connect(null, mapDispatchToProps)(RootContainer)
