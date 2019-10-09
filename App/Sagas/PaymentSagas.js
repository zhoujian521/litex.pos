import { call, put, select } from 'redux-saga/effects'
import { path } from 'ramda'
import PaymentActions from '../Redux/PaymentRedux'
import ConfigActions from '../Redux/ConfigRedux'
import { NavigationActions } from 'react-navigation';
import SocketIOClient from 'socket.io-client'
import Config from 'react-native-config';
import { UserSelectors } from '../Redux/UserRedux';
let global = require('../../global');
import { channel } from 'redux-saga'
const reduxChannel = channel()
import { EventEmitter, EventKeys } from '../utils/EventEmitter';

export function* pleaseOrder(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.pleaseOrder, params)
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(PaymentActions.requestSuccess({ order: { ...data } }))
      yield put(NavigationActions.navigate({ routeName: 'OrderScreen' }))
    } else {
      // TODO toast
      yield put(PaymentActions.requestFailure())
    }
  } catch (error) {
    console.log('====pleaseOrder===error=========');
    console.log(error);
    console.log('====pleaseOrder===error==========');
  }
}

export function* socketInit(api, { data }) {
  yield socket = SocketIOClient(Config.API_URL || "http://192.168.51.73:7002", { forceNew: true })
  global.socket = socket;
  let userId = yield select(UserSelectors.selectUserId);

  socket.on('connect', () => {
    console.log({ userId });
    userId = userId + ''
    socket && userId && socket.emit('login', { userId })
  })

  socket.on('disconnect', () => console.log('disconnect'))

  socket.on('userPayRes', (data) => {
    if (!data) return
    // 是否为当前用户
    // 用户是否为登录状态
    // data || model
    EventEmitter.emit(EventKeys.USER_PAY_RES, data);

    // console.log('============userPayRes========================');
    // console.log(data);
    // console.log('============userPayRes========================');
    // reduxChannel.put(PaymentActions.update({ payRes: data }))
    // reduxChannel.put(ConfigActions.update({ isShowModel: true }))
  })
}
