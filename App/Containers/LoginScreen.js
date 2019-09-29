import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../I18n'
import { Metrics, Images, Fonts, Colors } from '../Themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoginConfig } from '../Config/ContenConfig'
import { NavigationActions } from 'react-navigation';
import UserActions from '../Redux/UserRedux'
// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  static navigationOptions = () => {
    return {
      header: () => null
    }
  }

  _onSubmitEditing = (key) => {
    console.log(key);
  }

  _onChangeText = (key, text) => {
    console.log(key, text);
  }

  _onPressLogin = () => {
    const params = { userName: "sa", password: "sa" }
    this.props.login(params)
  }

  render() {
    const inputs = Object.values(LoginConfig).map((config, index) => {
      const { key, icon, placeholder, returnKey } = config
      return (
        <View key={index} style={styles.infoView}>
          <AntDesign name={icon}
            size={Metrics.icons.medium}
            color={Colors.primary}
          />
          <TextInput style={styles.inputView}
            placeholder={placeholder}
            blurOnSubmit
            clearButtonMode="while-editing"
            underlineColorAndroid={Colors.primary}
            onSubmitEditing={this._onSubmitEditing(key)}
            onChangeText={(text) => this._onChangeText(key, text)}
            returnKeyType={returnKey}
          />
        </View>
      )
    });

    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image source={Images.LITEXPay} style={styles.logo} />
          <Text style={styles.titleText}>LITEX Pay</Text>
        </View>
        <View style={styles.centerSection}>
          {inputs}
          <TouchableOpacity style={styles.loginBtn} onPress={this._onPressLogin}>
            <Text style={styles.loginTitle}>{I18n.t('LoginTitle')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSection}>
          <Text>{I18n.t('CompanyPrompt')}</Text>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route, params) => dispatch(NavigationActions.navigate({ routeName: route, params })),
  login: (params) => dispatch(UserActions.login(params))
})

export default connect(null, mapDispatchToProps)(LoginScreen)
