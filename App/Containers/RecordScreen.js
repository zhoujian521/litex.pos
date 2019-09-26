import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import Simple from 'react-native-vector-icons/SimpleLineIcons';
import { Metrics, Colors } from '../Themes';
import I18n from '../I18n'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Orders from '../Components/Orders';
import Assets from '../Components/Assets';

import Icon from 'react-native-vector-icons/FontAwesome';


// Styles
import styles from './Styles/RecordScreenStyle'

class RecordScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: I18n.t('RecordTitle'),
      tabBarLabel: navigation.getParam('tabBarLabel'),
      tabBarIcon: ({ tintColor }) => (
        <Simple name={'notebook'}
          size={Metrics.tabIconSize}
          color={tintColor}
        />
      )
    }
  }

  componentDidMount = () => {
    this._updateText();
  }

  _updateText = () => {
    this.props.navigation.setParams({
      tabBarLabel: I18n.t('RecordTab')
    });
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
    >
      <Orders tabLabel={I18n.t('Orders')} />
      <Assets tabLabel={I18n.t('Assets')} />
    </ScrollableTabView>;

    // return (
    //   <View style={styles.mainContainer}>
    //     <ScrollableTabView
    //       initialPage={0}
    //       style={styles.tabBarStyle}
    //       tabBarActiveTextColor={Colors.primary}
    //       tabBarInactiveTextColor={Colors.text003}
    //       tabBarUnderlineStyle={styles.tabBarUnderline}
    //       renderTabBar={() => <DefaultTabBar />}
    //       onChangeTab={(params) => this._onChangeTab(params)}
    //     >
    //     </ScrollableTabView>
    //   </View>
    // )
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
