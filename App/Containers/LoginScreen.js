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

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount = () => {
    const { locale } = this.props
    if (!locale) {
      I18n.locale = I18n.currentLocale();
    }
  }

  _onSubmitEditing = (key) => { }

  _onChangeText = (key, text) => {
    if (key === LoginConfig.username.key) {
      this.setState({ username: text })
      return
    }
    this.setState({ password: text })
  }

  _onPressLogin = () => {
    const { username, password } = this.state;
    const params = { userName: username, password: password }
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
        {/* <View style={styles.bottomSection}>
          <Text>{I18n.t('CompanyPrompt')}</Text>
        </View> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    config: { locale }
  } = state;
  return { locale };
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route, params) => dispatch(NavigationActions.navigate({ routeName: route, params })),
  login: (params) => dispatch(UserActions.login(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
