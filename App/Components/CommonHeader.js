import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import styles from './Styles/CommonHeaderStyle'
import { Metrics, Colors, Fonts } from '../Themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux'

class CommonHeader extends Component {
  // Prop type warnings
  static propTypes = {
    headerRight: PropTypes.element,
    isShowLeft: PropTypes.bool,
    title: PropTypes.string,
  }

  // Defaults for props
  static defaultProps = {
    headerRight: null,
    isShowLeft: true,
    title: null
  }

  _onPressBack = () => {
    this.props.pop()
  }

  render() {
    const { headerRight, isShowLeft, title } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: Colors.primary }]}>
        <StatusBar
          animated
          backgroundColor={Colors.text003}
          networkActivityIndicatorVisible
          StatusBarStyle="default"
        />
        <View style={styles.content}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => this._onPressBack()}>
            {isShowLeft && < Ionicons name={"ios-arrow-back"}
              size={Metrics.icons.medium}
              color={Colors.background}
            />}
          </TouchableOpacity>
          <View style={styles.centerItem}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.headerRight}>
            <View>{headerRight}</View>
          </View>
        </View>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader)


