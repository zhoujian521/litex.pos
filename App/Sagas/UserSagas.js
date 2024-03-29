import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserActions from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation';
import { channel } from 'redux-saga'
let global = require('../../global');
import { DeviceStorage, Keys } from '../Lib/DeviceStorage'

export function* login(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.login, params)
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(UserActions.requestSuccess(data))
      yield put(NavigationActions.navigate({ routeName: 'App' }))

      let { userId } = data
      DeviceStorage.setItem(Keys.USER_ID, userId)

      global.socket && userId && global.socket.emit('login', { userId: userId + '' })

      const res = yield call(api.getUserInfo, { userId })
      const { code: infoCode = 0, msg: infoMsg = "", data: info } = res.data
      if (!infoCode) {
        yield put(UserActions.requestSuccess(info))
      } else {
        // TODO toast
        yield put(UserActions.requestFailure())
      }

    } else {
      // TODO toast
      yield put(NavigationActions.navigate({ routeName: 'Auth' }))
      yield put(UserActions.requestFailure())
    }
  } catch (error) {
    console.log('==========login===error===========');
    console.log(error);
    console.log('==========login===error===========');
  }
}

export function* getUserInfo(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.getUserInfo, params)
    const { code = 0, msg = "", data } = response.data
    if (!code) {

      let { userId } = data
      DeviceStorage.setItem(Keys.USER_ID, userId)
      global.socket && userId && global.socket.emit('login', { userId: userId + '' })

      yield put(UserActions.requestSuccess(data))
    } else {
      // TODO toast
      yield put(UserActions.requestFailure())
    }
  } catch (error) {
    console.log('==========getUserInfo===error==========');
    console.log(error);
    console.log('==========getUserInfo===error===========');
  }
}

export function* logout(api, action) {
  try {
    // make the call to the api
    const response = yield call(api.logout)
    const { code = 0, msg = "", data } = response.data
    console.log('===========logout=========================');
    console.log(response);
    console.log('===========logout=========================');
    if (!code) {
      yield put(UserActions.requestSuccess(data))
      yield put(NavigationActions.navigate({ routeName: 'Auth' }))
    } else {
      // TODO toast
      yield put(UserActions.requestFailure())
      yield put(NavigationActions.navigate({ routeName: 'App' }))
    }
  } catch (error) {
    console.log('==========logout===error=======================');
    console.log(error);
    console.log('==========logout===error=======================');
  }
}

export function* switchFiat(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.switchFiat, params)
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(UserActions.requestSuccess(data))
    } else {
      yield put(UserActions.requestFailure())
    }
  } catch (error) {
    console.log('=======switchFiat=====error========');
    console.log(error);
    console.log('=======switchFiat=====error========');
  }
}
