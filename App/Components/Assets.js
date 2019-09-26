import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/AssetsStyle'
import RefreshListView, { RefreshState } from './RefreshListView'
import { Colors, Images } from '../Themes';

class Assets extends Component {

  _onRefresh = () => {
    console.log('============_onRefresh========================');
  }

  _handleLoadMore = () => {
    console.log('============_handleLoadMore========================');
  }

  _onPressItem = (item) => {
    console.log('============_onPressItem========================');
  }


  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} onPress={() => this._onPressItem(item)}>
        <View style={styles.itemsContainer}>
          <View style={styles.leftSection}>
            <Image source={Images.LITEXPay} style={styles.image} />
            <View style={[styles.itemSection, { alignItems: "flex-start" }]}>
              <Text style={styles.statusText}>收款/退款</Text>
              <Text style={styles.stampText}>2019-09-25 17:21:47</Text>
            </View>
          </View>
          <View style={styles.itemSection}>
            <Text style={styles.tokenText}>+ 0.13564700 USDT</Text>
            <Text style={styles.fiatText}>1.00 CNY</Text>
          </View>
        </View>
      </TouchableOpacity>)
  }

  render() {
    const { aLoading } = this.props
    const data = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>2019-09-26</Text>
          <View style={styles.headerRight}>
            <Text>总额：</Text>
            <Text style={{ color: Colors.golden }}>$ 25000.12</Text>
          </View>
        </View>
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
    assets: { aLoading },
  } = state;
  return { aLoading };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
