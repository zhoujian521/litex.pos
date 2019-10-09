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
import { DeviceStorage, Keys } from '../Lib/DeviceStorage'

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
  const userId = yield select(UserSelectors.selectUserId);

  socket.on('connect', () => {
    console.log('===========connect=========================');
    console.log(userId);
    console.log('===========connect=========================');
    socket && userId && socket.emit('login', { userId: userId + '' })
  })

  socket.on('disconnect', () => {
    console.log('===========disconnect=========================');
    console.log(userId);
    console.log('===========disconnect=========================');
  })

  socket.on('userPayRes', async (data) => {
    // console.log('============userPayRes========================');
    // console.log(data);
    // console.log('============userPayRes========================');
    if (!data) return
    const userId = await DeviceStorage.getItem(Keys.USER_ID)
    const { userId: payUserId } = data
    if (payUserId !== userId) return
    // 是否为当前用户
    // 用户是否为登录状态
    EventEmitter.emit(EventKeys.USER_PAY_RES, data);
    // reduxChannel.put(PaymentActions.update({ payRes: data }))
    // reduxChannel.put(ConfigActions.update({ isShowModel: true }))
  })
}
