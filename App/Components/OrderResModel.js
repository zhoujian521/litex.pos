import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Overlay from 'react-native-modal-overlay';
import ConfigActions from '../Redux/ConfigRedux'
import { Metrics, Images, Fonts, Colors } from '../Themes';
var moment = require('moment');
const Ramda = require('ramda')
import I18n from '../I18n'

import styles from './Styles/OrderResModelStyle'

class OrderResModel extends Component {

  _onComplete = () => {
    this.props.update({ isShowModel: false })
  }

  render() {
    const { isShowModel, payRes, fiats } = this.props
    const { orderId, fiat, token, stamp } = payRes || {} // userId, status,
    const array = !fiat ? [] : fiats.filter(item => item.fiatType === fiat.fiatType)
    const { fiatSymbol = '' } = Ramda.head(array) || {}

    return (
      <Overlay containerStyle={styles.container}
        childrenWrapperStyle={styles.content}
        visible={isShowModel}
        animationType="zoomIn"
        animationDuration={300}>
        <View style={styles.top}>
          <Text style={styles.goods}>商品/店铺名称</Text>
          <Image source={Images.success} style={styles.icon} />
          <Text style={styles.resText}>{I18n.t('PayRes')}</Text>
        </View>
        <View style={styles.center}>
          <View style={styles.item}>
            <Text style={styles.leftText}>{I18n.t('PayAmount')}</Text>
            {fiat && <Text style={{color: Colors.golden, fontSize: Fonts.size.input}}>{fiat.amount} {fiatSymbol}</Text>}
          </View>
          <View style={styles.item}>
            <Text style={styles.leftText}>{I18n.t('OrderNum')}</Text>
            {orderId && <Text>{orderId}</Text>}
          </View>
          <View style={styles.item}>
            <Text style={styles.leftText}>{I18n.t('OrderNum')}</Text>
            {token && <Text>{token.amount} {token.symbol}</Text>}
          </View>
          <View style={styles.item}>
            <Text style={styles.leftText}>{I18n.t('PayMethod')}</Text>
            <Text style={styles.logoText}>LITEX Pay</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.leftText}>{I18n.t('PayTime')}</Text>
            {stamp && <Text>{moment(stamp).format("YYYY-MM-DD HH:mm:ss")}</Text>}
          </View>
        </View>
        <TouchableOpacity style={styles.completeBtn} onPress={this._onComplete}>
          <Text style={styles.completeTitle}>完成</Text>
        </TouchableOpacity>
      </Overlay>
    )
  }
}


const mapStateToProps = (state) => {
  const {
    config: { isShowModel, fiats },
    payment: { payRes }
  } = state;
  return { isShowModel, payRes, fiats };
}

const mapDispatchToProps = (dispatch) => ({
  update: (params) => dispatch(ConfigActions.update(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderResModel)
