import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Metrics } from '../Themes';
import I18n from '../I18n'
// import Material from 'react-native-vector-icons/MaterialCommunityIcons'; barcode-scan
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ReceiptScreenStyle'

class ReceiptScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: navigation.getParam('tabBarLabel'),
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name={'qrcode'}
          size={Metrics.tabIconSize}
          color={tintColor}
        />
      )
    }
  }

  componentDidMount = () => {
    this._updateText();
  }

  _updateText = () => {
    this.props.navigation.setParams({
      tabBarLabel: I18n.t('ReceiptTab')
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>ReceiptScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptScreen)
