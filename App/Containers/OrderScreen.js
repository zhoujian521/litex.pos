import React, { Component } from 'react'
import { Text, View, Image, Platform } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../I18n'
import QRCode from 'react-native-qrcode-svg';
// Styles
import styles from './Styles/OrderScreenStyle'
import { Metrics, Images } from '../Themes';
import CommonHeader from '../Components/CommonHeader';
const Ramda = require('ramda')

class OrderScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <CommonHeader
        title={I18n.t('OrderTitle')}
      />
    }
  }

  componentDidMount = () => {
  }

  render() {
    const { orderId, fiat, token, fiats } = this.props
    const array = fiats.filter(item => item.fiatType === fiat.fiatType)
    const { fiatSymbol } = Ramda.head(array)

    return (
      <View style={styles.container} >
        {(Platform.OS === 'ios') ? <View style={{ flex: 0.3 }} /> : null}
        <View style={styles.topSection}>
          <View style={styles.amountSection}>
            <View style={styles.fiatSection}>
              <Text style={styles.leftTitle}>{I18n.t('QRCodeTitle')}</Text>
              <Text style={styles.rightAmount}>{fiat.amount}</Text>
              <Text style={styles.rightAmount}>{fiatSymbol}</Text>
            </View>
            <View style={[styles.tokenSection, { marginTop: Metrics.smallMargin }]}>
              <Text style={styles.leftTitle}>{I18n.t('QRCodeSubTitle')}</Text>
              <Text style={styles.rightAmount}>{token.amount}</Text>
              <Text style={styles.rightAmount}>{token.symbol}</Text>
            </View>
          </View>
          <View style={styles.qrCodeSection}>
            <QRCode value={orderId} size={Metrics.screenWidth * 0.45} />
            <Text style={styles.orderId}>{orderId}</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.imageSection}>
            <Image source={Images.LITEXPay} style={styles.image} />
          </View>
          <Text>{I18n.t('RecommendPayment')}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    payment: {
      order: {
        orderId, fiat, token
      }
    },
    config: { fiats }
  } = state;
  return { orderId: orderId + '', fiat, token, fiats };
}

export default connect(mapStateToProps, null)(OrderScreen)
