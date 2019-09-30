import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles/RefreshListViewStyle';
import I18n from '../I18n'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
};

// const DEBUG = false;
// const log = (text) => {DEBUG && console.log(text);};

export default class RefreshListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static propTypes = {
    refreshState: PropTypes.number,
    onHeaderRefresh: PropTypes.func,
    onFooterRefresh: PropTypes.func,
    data: PropTypes.array,

    listRef: PropTypes.string,

    footerRefreshingText: PropTypes.string,
    footerFailureText: PropTypes.string,
    footerNoMoreDataText: PropTypes.string,
    footerEmptyDataText: PropTypes.string,

    footerRefreshingComponent: PropTypes.element,
    footerFailureComponent: PropTypes.element,
    footerNoMoreDataComponent: PropTypes.element,
    footerEmptyDataComponent: PropTypes.element,

    renderItem: PropTypes.func,
  }

  static defaultProps = {
    refreshState: RefreshState.Idle,
    onHeaderRefresh: () => null,
    onFooterRefresh: () => null,
    data: [],

    listRef: 'refreshList',

    footerRefreshingText: I18n.t('footerRefreshingText'),
    footerFailureText: I18n.t('footerFailureText'),
    footerNoMoreDataText: I18n.t('footerNoMoreDataText'),
    footerEmptyDataText: I18n.t('footerEmptyDataText'),

    footerRefreshingComponent: null,
    footerFailureComponent: null,
    footerNoMoreDataComponent: null,
    footerEmptyDataComponent: null,

    renderItem: () => null,
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps !== this.props) {
      this.setState({
        onFooterRefresh: nextProps.onFooterRefresh
      });
    }
    return true;
  }





  _onRefresh = () => {
    if (!this._shouldStartHeaderRefreshing()) return;
    const { onHeaderRefresh } = this.props;
    onHeaderRefresh && onHeaderRefresh(RefreshState.HeaderRefreshing);
  }

  _onEndReached = () => {
    if (!this._shouldStartFooterRefreshing()) return;
    const { onFooterRefresh } = this.props;
    onFooterRefresh && onFooterRefresh(RefreshState.FooterRefreshing);
  }

  _shouldStartHeaderRefreshing = () => {
    const { refreshState } = this.props;
    if (refreshState === RefreshState.onHeaderRefresh || refreshState === RefreshState.onFooterRefresh) {
      return false;
    }
    return true;
  }

  _shouldStartFooterRefreshing = () => {
    const { refreshState, data } = this.props;
    if (!data.length) {
      return false;
    }
    return refreshState === RefreshState.Idle;
  }

  render() {
    const { renderItem, listRef, refreshState, ...rest } = this.props;
    return (
      <FlatList
        ref={listRef}
        extraData={this.state}

        renderItem={renderItem}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
        onRefresh={this._onRefresh}

        onEndReachedThreshold={0.1}
        onEndReached={this._onEndReached}
        ListFooterComponent={this._renderListFooter}
        {...rest}
      />
    );
  }

  _renderListFooter = () => {
    const {
      refreshState,

      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,
      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent
    } = this.props;

    let footer = null;
    switch (refreshState) {
      case RefreshState.Idle:
        return footer = (<View style={Styles.footerContainer} />);
      case RefreshState.FooterRefreshing: {
        const refreshStyle = { marginLeft: 7 };
        footer = footerRefreshingComponent || (
          <View style={Styles.footerContainer} >
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[Styles.footerText, refreshStyle]}>{footerRefreshingText}</Text>
          </View>);
        return footer;
      }
      case RefreshState.NoMoreData:
        footer = footerNoMoreDataComponent || (
          <View style={Styles.footerContainer} >
            <Text style={Styles.footerText}>{footerNoMoreDataText}</Text>
          </View>);
        return footer;
      case RefreshState.Failure:
        footer = (
          <TouchableOpacity onPress={this._onPressFailure}>
            {footerFailureComponent || (
              <View style={Styles.footerContainer}>
                <Text style={Styles.footerText}>{footerFailureText}</Text>
              </View>
            )}
          </TouchableOpacity>);
        return footer;
      case RefreshState.EmptyData:
        footer = (
          <TouchableOpacity onPress={this._onPressEmptyData}>
            {footerEmptyDataComponent || (
              <View style={Styles.footerContainer}>
                <Text style={Styles.footerText}>{footerEmptyDataText}</Text>
              </View>
            )}
          </TouchableOpacity>);
        return footer;

      default:
        break;
    }
    return footer;
  }
  _onPressFailure = () => {
    const { data, onHeaderRefresh, onFooterRefresh } = this.props;
    if (!data.length) {
      onHeaderRefresh && onHeaderRefresh(RefreshState.HeaderRefreshing);
    } else {
      onFooterRefresh && onFooterRefresh(RefreshState.FooterRefreshing);
    }
  }

  _onPressEmptyData = () => {
    const { onHeaderRefresh } = this.props;
    onHeaderRefresh && onHeaderRefresh(RefreshState.HeaderRefreshing);
  }

}
