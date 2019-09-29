import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './Styles/RightItemStyle'
import { Metrics, Colors } from '../Themes';
import ModalDropdown from 'react-native-modal-dropdown';
import { MenuConfig } from '../Config/ContenConfig'
import { NavigationActions } from 'react-navigation';
import UserActions from '../Redux/UserRedux'

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
    if (screen) return
    const { key } = option
    switch (key) {
      case "logout":
          this.props.logout()
        break;

      default:
        break;
    }
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
          showsVerticalScrollIndicator={false}
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
  navigate: (route, params) => dispatch(NavigationActions.navigate({ routeName: route, params })),
  logout: () => dispatch(UserActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RightItem)

