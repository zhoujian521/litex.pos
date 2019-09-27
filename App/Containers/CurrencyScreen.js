import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../I18n';
import Feather from 'react-native-vector-icons/Feather';
import { CurrencyConfig } from '../Config/ContenConfig'
import ConfigActions from '../Redux/ConfigRedux';
import { Metrics, Colors } from '../Themes';
import { StackActions } from 'react-navigation';

// Styles
import styles from './Styles/CurrencyScreenStyle'

class CurrencyScreen extends Component {
  static navigationOptions = () => {
    return {
      title: I18n.t('MenuCurrency')
    }
  }

  constructor(props) {
    super(props);
    const { currency } = this.props
    this.state = {
      currency
    };
  }

  _onPressSave = () => {
    const { currency } = this.state;
    this.props.updateLocale({ currency });
    this.props.pop()
  }

  _onPressItem = (item) => {
    const { currency } = item;
    this.setState({ currency });
  }

  _renderItem = ({ item }) => {
    const { currency } = this.state
    const { title = '', currency: itemCurrency } = item;

    return (<TouchableOpacity onPress={() => this._onPressItem(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        {itemCurrency === currency ? <View>
          <Feather name={'check'}
            size={Metrics.icons.small}
            color={Colors.primary}
          />
        </View> : null}
      </View>
    </TouchableOpacity>);
  }

  render() {
    const data = Object.values(CurrencyConfig).map((config) => config)
    return (
      <View style={styles.container}>
        <FlatList style={styles.container}
          data={data}
          keyExtractor={(item, index) => '' + index}
          renderItem={this._renderItem}
        />
        <TouchableOpacity style={styles.saveBtn} onPress={this._onPressSave}>
          <Text style={styles.saveTitle}>{I18n.t('saveBtn')}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    config: { currency }
  } = state;
  return { currency };
}

const mapDispatchToProps = (dispatch) => ({
  pop: () => dispatch(StackActions.pop()),
  updateLocale: (params) => dispatch(ConfigActions.update(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyScreen)
