import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../I18n';
import { StackActions } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { LanguageConfig } from '../Config/ContenConfig'
import ConfigActions from '../Redux/ConfigRedux';
import { Metrics, Colors } from '../Themes';
import CommonHeader from '../Components/CommonHeader';

// Styles
import styles from './Styles/LanguageScreenStyle'

class LanguageScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: () => <CommonHeader
        title={I18n.t('MenuLanguage')}
      />
    }
  }

  constructor(props) {
    super(props);
    const { locale } = this.props
    this.state = {
      locale
    };
  }

  _onPressSave = () => {
    const { locale } = this.state;
    I18n.locale = locale;
    console.log('=============locale=======================');
    console.log(locale);
    console.log(I18n.locale);
    console.log('=============locale=======================');
    this.props.updateLocale({ locale })
    this.props.pop()
  }

  _onPressItem = (item) => {
    const { locale } = item;
    this.setState({ locale });
  }

  _renderItem = ({ item }) => {
    const { locale } = this.state
    const { title = '', locale: itemLocale } = item;

    return (<TouchableOpacity onPress={() => this._onPressItem(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        {itemLocale === locale ? <View>
          <Feather name={'check'}
            size={Metrics.icons.small}
            color={Colors.primary}
          />
        </View> : null}
      </View>
    </TouchableOpacity>);
  }

  render() {
    const data = Object.values(LanguageConfig).map((config) => config)
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
    config: { locale }
  } = state;
  return { locale };
}

const mapDispatchToProps = (dispatch) => ({
  pop: () => dispatch(StackActions.pop()),
  updateLocale: (params) => dispatch(ConfigActions.update(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen)
