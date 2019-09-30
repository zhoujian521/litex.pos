import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import styles from './Styles/OrdersStyle'
import RefreshListView, { RefreshState } from './RefreshListView'
import AssetsActions from '../Redux/AssetsRedux'
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

  _renderItem = ({ item, index }) => {
    const { fiat, token, status, stamp, orderId } = item;
    const array = this.props.fiats.filter(item => item.fiatType === fiat.fiatType)
    const { fiatSymbol } = Ramda.head(array)

    return (<View key={index} style={styles.itemsContainer}>
      <View style={[styles.itemSection, { alignItems: "flex-start" }]}>
        <Text style={styles.statusText}>支付状态：{status}</Text>
        <Text style={styles.stampText}>{stamp || '时间戳为空'}</Text>
      </View>
      <View style={styles.itemSection}>
        <Text style={styles.tokenText}>+ {token.amount} {token.symbol}</Text>
        <Text style={styles.fiatText}>{fiat.amount} {fiatSymbol}</Text>
      </View>
    </View>)
  }

  render() {
    const { oLoading, orders: data } = this.props
    let { page } = this.state;

    return (
      <View style={styles.container}>
        {data.length ? <View style={styles.header}>
          <Text>已经是最新数据了</Text>
        </View> : null}
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

