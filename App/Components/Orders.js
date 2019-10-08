import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/OrdersStyle'
import RefreshListView, { RefreshState } from './RefreshListView'
import AssetsActions from '../Redux/AssetsRedux'
import I18n from '../I18n'
var moment = require('moment');
const Ramda = require('ramda')
const limit = 10
class Orders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  componentDidMount = () => [
    this._onRefresh()
  ]

  _orderStatus = (status) => {
    switch (status) {
      case 1:
        return I18n.t('OrderStatus012')
      case 2:
        return I18n.t('OrderStatus012')
      case 3:
        return I18n.t('OrderStatus003')
      case 4:
        return I18n.t('OrderStatus004')

      default:
        break;
    }
    return I18n.t('OrderStatus012')
  }

  _orderBgColor = (status) => {
    switch (status) {
      case 1:
        return "orange"
      case 2:
        return "orange"
      case 3:
        return "green"
      case 4:
        return "red"

      default:
        break;
    }
    return "orange"
  }

  _onRefresh = () => {
    if (this.props.oLoading === RefreshState.HeaderRefreshing) return
    console.log('==========_onRefresh==========================');
    this.setState({ page: 1 })
    const { userId } = this.props
    const params = { userId, page: 1, limit }
    this.props.getOrders(params)
  }

  _handleLoadMore = () => {
    if (this.props.oLoading === RefreshState.FooterRefreshing) return
    console.log('===========_handleLoadMore=========================');
    let { page } = this.state
    page += 1
    this.setState({ page })
    const { userId } = this.props
    const params = { userId, page, limit }
    this.props.getOrders(params)
  }

  _onPressItem = (item) => {
    console.log('============_onPressItem========================');
  }

  _renderItem = ({ item, index }) => {
    const { fiat, token, status, stamp, orderId } = item;
    const array = this.props.fiats.filter(item => item.fiatType === fiat.fiatType)
    const { fiatSymbol } = Ramda.head(array)
    const bgColor = this._orderBgColor(status)

    return (<TouchableOpacity key={index} onPress={() => this._onPressItem(item)}>
      <View style={styles.itemsContainer}>
        <View style={[styles.itemSection, { alignItems: "flex-start" }]}>
          <Text style={styles.statusText, { color: bgColor }}>{this._orderStatus(status)}</Text>
          <Text style={styles.stampText}>{moment(stamp).format("YYYY-MM-DD HH:mm:ss")}</Text>
        </View>
        <View style={styles.itemSection}>
          <Text style={styles.tokenText}>+ {token.amount} {token.symbol}</Text>
          <Text style={styles.fiatText}>{fiat.amount} {fiatSymbol}</Text>
        </View>
      </View>
    </TouchableOpacity>)
  }

  render() {
    const { oLoading, orders: data } = this.props
    let { page } = this.state;

    return (
      <View style={styles.container}>
        <RefreshListView
          style={styles.container}
          data={data}
          renderItem={this._renderItem}
          refreshState={oLoading}
          onHeaderRefresh={this._onRefresh}
          onFooterRefresh={this._handleLoadMore}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    user: { userId },
    assets: { oLoading, orders },
    config: { fiats }
  } = state;
  return { oLoading, orders, fiats, userId };
}

const mapDispatchToProps = (dispatch) => ({
  getOrders: (params) => dispatch(AssetsActions.getOrders(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

