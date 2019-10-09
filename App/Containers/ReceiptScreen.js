import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Metrics, Colors, Fonts } from '../Themes';
import I18n from '../I18n'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { PaymentConfig, KeyboardConfig } from '../Config/ContenConfig'
import { NavigationActions, NavigationEvents } from 'react-navigation';
import PaymentActions from '../Redux/PaymentRedux';
import RightItem from '../Components/RightItem';
import CommonHeader from '../Components/CommonHeader';
import Toast from 'react-native-root-toast';
// Styles
import styles from './Styles/ReceiptScreenStyle'
const Ramda = require('ramda')

class ReceiptScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <CommonHeader
        headerRight={<RightItem />}
        isShowLeft={false}
        title={I18n.t('ReceiptTab')}
      />
    }
  }

  componentDidMount = () => {
    const { locale } = this.props
    if (!locale) {
      I18n.locale = I18n.currentLocale();
    }
  }

  _onWillFocus = () => {
    this.props.updateInput({ input: '' });
    this.props.updatePayment({ payment: undefined });
  }

  _onPressKey = (input) => {
    this.props.updateInput({ input });
  }

  _onPressPayment = (payment) => {
    const { input, fiatType } = this.props;
    const reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?$/;
    if (!reg.test(input)) {
      Toast.show('请输入有效的收款金额', {
        shadow: true,
        position: Toast.positions.CENTER
      });
      return
    }
    const { key } = payment
    this.props.updatePayment({ payment: key });

    const amount = parseFloat(input)
    this.props.pleaseOrder({ fiatType, amount });
  }

  render() {
    const payments = Object.values(PaymentConfig).map((config, index) => {
      const { key, icon = "", title } = config
      let iconView = null
      if (key === PaymentConfig.qrcode.key) {
        iconView = <AntDesign name={icon}
          size={Metrics.paymentSize}
          color={Colors.primary}
        />
      }
      if (key === PaymentConfig.scan.key) {
        iconView = <Material name={icon}
          size={Metrics.paymentSize}
          color={Colors.primary}
        />
      }
      return (
        <TouchableOpacity key={index} onPress={() => this._onPressPayment(config)}>
          <View style={styles.paymentContainer}>
            {iconView}
            <Text style={{ marginTop: Metrics.smallMargin, fontSize: Fonts.size.medium }}>{title}</Text>
          </View>
        </TouchableOpacity>
      )
    });

    const keyboard = Object.values(KeyboardConfig).map((config, index) => {
      const { key, label } = config
      let item = undefined
      if (key === KeyboardConfig.delete.key) {
        item = < Feather name={"delete"}
          size={Fonts.size.h4}
          color={Colors.text002}
        />
      } else {
        item = <Text style={{ fontSize: Fonts.size.h5 }}>{label}</Text>
      }

      return (
        <TouchableOpacity key={index} onPress={() => this._onPressKey(config)}>
          <View style={styles.keyItem}>
            {item}
          </View>
        </TouchableOpacity>

      )
    });

    const { input, fiats, fiatType } = this.props;
    const array = fiats.filter(item => item.fiatType === fiatType)
    const { symbol } = Ramda.head(array)

    return (
      <View style={styles.mainContainer}>
        <NavigationEvents onWillFocus={() => this._onWillFocus()} />
        <View style={[styles.container, styles.topSection]}>
          <View style={styles.input}>
            <Text style={styles.symbol}>{symbol}</Text>
            <Text style={styles.inputNum}>{input}</Text>
          </View>
        </View>
        <View style={styles.keyboard}>
          {keyboard}
        </View>
        <View style={styles.bottomSection}>
          {payments}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    payment: { input },
    user: { fiatType },
    config: { fiats, locale }
  } = state;
  return { input, fiats, fiatType, locale };
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route, params) => dispatch(NavigationActions.navigate({ routeName: route, params })),
  updatePayment: (params) => dispatch(PaymentActions.update(params)),
  updateInput: (params) => dispatch(PaymentActions.updateInput(params)),
  pleaseOrder: (params) => dispatch(PaymentActions.pleaseOrder(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptScreen)
