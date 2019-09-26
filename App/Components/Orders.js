import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import styles from './Styles/OrdersStyle'
import RefreshListView, { RefreshState } from './RefreshListView'

class Orders extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  _onRefresh = () => {
    console.log('============_onRefresh========================');
  }

  _handleLoadMore = () => {
    console.log('============_handleLoadMore========================');
  }

  _renderItem = ({ item, index }) => {
    return (<View key={index} style={styles.itemsContainer}>
      <View style={[styles.itemSection, {alignItems: "flex-start"}]}>
        <Text style={styles.statusText}>收款成功</Text>
        <Text style={styles.stampText}>2019-09-25 17:21:47</Text>
      </View>
      <View style={styles.itemSection}>
        <Text style={styles.tokenText}>+ 0.13564700 USDT</Text>
        <Text style={styles.fiatText}>1.00 CNY</Text>
      </View>
    </View>)
  }

  render() {
    const { oLoading } = this.props
    const data = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header}>已经是最新数据了</Text>
        </View>
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
    assets: { oLoading },
  } = state;
  return { oLoading };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

