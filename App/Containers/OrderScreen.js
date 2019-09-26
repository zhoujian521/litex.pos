import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../I18n'
import QRCode from 'react-native-qrcode-svg';
// Styles
import styles from './Styles/OrderScreenStyle'
import { Metrics, Images } from '../Themes';

class OrderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      backgroundColor: 'red'
    }
  }

  componentDidMount = () => {
    this._updateTitle();
  }

  _updateTitle = () => {
    this.props.navigation.setParams({
      title: I18n.t('OrderTitle')
    });
  }

  render() {
    const orderInfo = {
      orderId: '2019092516533784284',
      fiat: {
        symbol: 'USD',
        amount: '1.2'
      },
      token: {
        symbol: 'USDT',
        amount: '1200000',
        decimal: 6,
        round: 2
      }
    }
    const { order = orderInfo } = this.props
    console.log('============render========================');
    console.log(order);
    console.log('============render========================');
    const { orderId,
      fiat: { symbol: fiatSymbol, amount: fiatAmount },
      token: { symbol: tokenSymbol, amount: tokenAmount }
    } = order
    return (
      <View style={[styles.mainContainer, styles.container]} >
        <View style={[styles.topSection]}>
          <View style={styles.amountSection}>
            <View style={styles.fiatSection}>
              <Text style={styles.leftTitle}>{I18n.t('QRCodeTitle')}</Text>
              <Text style={styles.rightAmount}>{fiatAmount}</Text>
              <Text style={styles.rightAmount}>{fiatSymbol}</Text>
            </View>
            <View style={[styles.tokenSection, {marginTop: Metrics.smallMargin}]}>
              <Text style={styles.leftTitle}>{I18n.t('QRCodeSubTitle')}</Text>
              <Text style={styles.rightAmount}>{tokenAmount}</Text>
              <Text style={styles.rightAmount}>{tokenSymbol}</Text>
            </View>
          </View>

          <View style={styles.qrCodeSection}>
            <QRCode value={orderId} size={Metrics.screenWidth * 0.45} />
            <Text style={styles.orderId}>{orderId}</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.imageSection}>
            <Image source={Images.LITEXPay} style={styles.image}/>
          </View>
          <Text>{I18n.t('RecommendPayment')}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    payment: { order },
  } = state;
  return { order };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
