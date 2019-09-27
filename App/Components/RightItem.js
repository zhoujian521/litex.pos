import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './Styles/RightItemStyle'
import { Metrics, Colors } from '../Themes';
import ModalDropdown from 'react-native-modal-dropdown';
import { MenuConfig } from '../Config/ContenConfig'
import { NavigationActions, NavigationEvents } from 'react-navigation';

class RightItem extends Component {

  _adjustFrame = (option) => {
    const { right, top } = option
    return {
      height: 35 * 5,
      right,
      top
    }
  }

  _renderRow = (option, index, isSelected) => {
    const { title } = option
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{title}</Text>
      </View>
    )
  }

  _onSelect = (index, option) => {
    const { screen } = option
    screen && this.props.navigate(screen);
  }

  render() {
    const menus = Object.values(MenuConfig).map((config, index) => config)
    return (
      <View style={styles.container}>
        <ModalDropdown
          options={menus}
          onSelect={this._onSelect}
          renderRow={this._renderRow}
          adjustFrame={this._adjustFrame}
        >
          <Entypo name={'menu'}
            size={Metrics.images.small + 10}
            color={Colors.background}
          />
        </ModalDropdown>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    payment: { fiat, input },
  } = state;
  return { fiat, input };
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route, params) => dispatch(NavigationActions.navigate({ routeName: route, params }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RightItem)

