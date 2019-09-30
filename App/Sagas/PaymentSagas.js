import { call, put, select } from 'redux-saga/effects'
import { path } from 'ramda'
import PaymentActions from '../Redux/PaymentRedux'
import { NavigationActions } from 'react-navigation';
import SocketIOClient from 'socket.io-client'
import Config from 'react-native-config';
import { UserSelectors } from '../Redux/UserRedux';
let global = require('../../global');


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

// socket.emit('lottery', W.address)
export function* socketInit(api, { data }) {
  yield socket = SocketIOClient(Config.API_URL, { forceNew: true })
  global.socket = socket;
  let userId = yield select(UserSelectors.selectUserId);
  socket.on('connect', () => {
    console.log('===========connect=========================');
    console.log(userId);
    console.log('===========connect=========================');
    userId = userId + ''
    socket && userId && socket.emit('login', userId)
  })
    .on('userPayRes', userPayRes)
}

function userPayRes(data) {
  console.log('============userPayRes========================');
  console.log(data);
  console.log('============userPayRes========================');
}
