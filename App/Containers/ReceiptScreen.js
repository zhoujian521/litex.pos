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
import { getFiatSymbol } from '../utils/helper'
import RightItem from '../Components/RightItem';
import CommonHeader from '../Components/CommonHeader';
// Styles
import styles from './Styles/ReceiptScreenStyle'


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
  }

  _onWillFocus = () => {
    this.props.updateInput({ input: '' });
    this.props.updatePayment({ payment: undefined });
  }

  _onPressKey = (input) => {
    this.props.updateInput({ input });
  }

  _onPressPayment = (payment) => {
    const { key } = payment
    this.props.updatePayment({ payment: key });
    this.props.navigate('OrderScreen');
  }


  render() {
    const payments = Object.values(PaymentConfig).map((config, index) => {
      const { key, icon, title } = config
      let iconView = <AntDesign name={icon}
        size={Metrics.paymentSize}
        color={Colors.primary}
      />
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

    const { input, fiat } = this.props;
    return (
      <View style={styles.mainContainer}>
        <NavigationEvents onWillFocus={() => this._onWillFocus()} />
        <View style={[styles.container, styles.topSection]}>
          <View style={styles.input}>
            <Text style={styles.symbol}>{getFiatSymbol(fiat)}</Text>
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
    payment: { fiat, input },
  } = state;
  return { fiat, input };
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route, params) => dispatch(NavigationActions.navigate({ routeName: route, params })),
  updatePayment: (params) => dispatch(PaymentActions.update(params)),
  updateInput: (params) => dispatch(PaymentActions.updateInput(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptScreen)
