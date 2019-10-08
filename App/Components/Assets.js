import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/AssetsStyle'
import RefreshListView, { RefreshState } from './RefreshListView'
import { Colors, Images } from '../Themes';
import AssetsActions from '../Redux/AssetsRedux'
import I18n from '../I18n'
var moment = require('moment');
const Ramda = require('ramda')
const limit = 10


class Assets extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  componentDidMount = () => {
    this._onRefresh()
  }

  _onRefresh = () => {
    if (this.props.oLoading === RefreshState.HeaderRefreshing || this.props.oLoading === RefreshState.FooterRefreshing) return
    console.log('==========_onRefresh==========================');
    this.setState({ page: 1 })
    const { userId } = this.props
    const params = { userId, page: 1, limit }
    this.props.getAssets(params)
  }

  _handleLoadMore = () => {
    if (this.props.oLoading === RefreshState.FooterRefreshing || this.props.oLoading === RefreshState.HeaderRefreshing) return
    console.log('===========_handleLoadMore=========================');
    let { page } = this.state
    page += 1
    this.setState({ page })
    const { userId } = this.props
    const params = { userId, page, limit }
    this.props.getAssets(params)
  }

  _onPressItem = (item) => {
    console.log('============_onPressItem========================');
  }

  _renderItem = ({ item, index }) => {

    const { fiat, token, stamp } = item;
    const array = this.props.fiats.filter(item => item.fiatType === fiat.fiatType)
    const { fiatSymbol } = Ramda.head(array)

    return (
      <TouchableOpacity key={index} onPress={() => this._onPressItem(item)}>
        <View style={styles.itemsContainer}>
          <View style={styles.leftSection}>
            <Image source={Images.LITEXPay} style={styles.image} />
            <View style={[styles.itemSection, { alignItems: "flex-start" }]}>
              <Text style={[styles.statusText, { color: "green" }]}>收款</Text>
              <Text style={styles.stampText}>{moment(stamp).format("YYYY-MM-DD HH:mm:ss")}</Text>
            </View>
          </View>
          <View style={styles.itemSection}>
            <Text style={styles.fiatText}>+{fiat && fiat.amount} {fiatSymbol}</Text>
            <Text style={styles.tokenText}>{token && token.amount} {token.symbol}</Text>
          </View>
        </View>
      </TouchableOpacity>)
  }

  render() {
    const { assets: data, aLoading, balance } = this.props

    return (
      <View style={styles.container}>
        {data && data.length ? <View style={styles.header}>
          <Text>{moment().format("YYYY-MM-DD")}</Text>
          <View style={styles.headerRight}>
            <Text>{I18n.t('TotalAmount')}</Text>
            <Text style={{ color: Colors.golden }}>{balance && balance.amount} {balance && balance.symbol}</Text>
          </View>
        </View> : null}
        <RefreshListView
          style={styles.container}
          data={data}
          renderItem={this._renderItem}
          refreshState={aLoading}
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
    assets: { aLoading, assets, balance },
    config: { fiats }
  } = state;
  return { aLoading, assets, fiats, balance, userId };
}

const mapDispatchToProps = (dispatch) => ({
  getAssets: (params) => dispatch(AssetsActions.getAssets(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
