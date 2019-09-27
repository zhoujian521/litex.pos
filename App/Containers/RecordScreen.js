import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Metrics, Colors } from '../Themes';
import I18n from '../I18n'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Orders from '../Components/Orders';
import Assets from '../Components/Assets';
import RightItem from '../Components/RightItem';


// Styles
import styles from './Styles/RecordScreenStyle'

class RecordScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: I18n.t('RecordTitle'),
      headerRight: (<RightItem />)
    }
  }

  componentDidMount = () => {
  }

  _onChangeTab = (params) => {
    console.log('==============onChangeTab======================');
    console.log(params);
    console.log('==============onChangeTab======================');
  }

  render() {
    return <ScrollableTabView
      style={{ marginTop: Metrics.smallMargin }}
      initialPage={0}
      renderTabBar={() => <DefaultTabBar />}
      // onChangeTab={this._onChangeTab}
      tabBarUnderlineStyle={styles.tabBarUnderline}
      tabBarInactiveTextColor={Colors.text002}
      tabBarActiveTextColor={Colors.primary}
    >
      <Orders tabLabel={I18n.t('Orders')} />
      <Assets tabLabel={I18n.t('Assets')} />
    </ScrollableTabView>;
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen)
