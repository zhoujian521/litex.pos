import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../I18n';
import Feather from 'react-native-vector-icons/Feather';
import ConfigActions from '../Redux/ConfigRedux';
import { Metrics, Colors } from '../Themes';
import { StackActions } from 'react-navigation';
import CommonHeader from '../Components/CommonHeader';
import UserActions from '../Redux/UserRedux'

// Styles
import styles from './Styles/CurrencyScreenStyle'

class CurrencyScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <CommonHeader
        title={I18n.t('MenuCurrency')}
      />
    }
  }

  constructor(props) {
    super(props);
    const { fiatType } = this.props
    this.state = {
      fiatType
    };
  }

  _onPressSave = () => {
    const { userId } = this.props;
    const { fiatType } = this.state;
    this.props.updateCurrency({ fiatType });
    this.props.switchFiat({ userId, fiatType })
    this.props.pop()
  }

  _onPressItem = (item) => {
    const { fiatType } = item;
    this.setState({ fiatType });
  }

  _renderItem = ({ item }) => {
    const { fiatType: type } = this.state
    const { title = '', fiatType } = item;

    return (<TouchableOpacity onPress={() => this._onPressItem(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        {fiatType === type ? <View>
          <Feather name={'check'}
            size={Metrics.icons.small}
            color={Colors.primary}
          />
        </View> : null}
      </View>
    </TouchableOpacity>);
  }

  render() {
    const { fiats = [] } = this.props
    return (
      <View style={styles.container}>
        <FlatList style={styles.container}
          data={fiats}
          extraData={this.state}
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
    config: { fiats, fiatType },
    user: { userId }
  } = state;
  return { fiats, fiatType, userId };
}

const mapDispatchToProps = (dispatch) => ({
  pop: () => dispatch(StackActions.pop()),
  updateCurrency: (params) => dispatch(ConfigActions.update(params)),
  switchFiat: (params) => dispatch(UserActions.switchFiat(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyScreen)
