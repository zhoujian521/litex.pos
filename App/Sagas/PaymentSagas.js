import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import PaymentActions from '../Redux/PaymentRedux'
import { NavigationActions } from 'react-navigation';
import SocketIOClient from 'socket.io-client'
import Config from 'react-native-config';


export function* pleaseOrder(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.pleaseOrder, params)
    console.log('===========pleaseOrder=========================');
    console.log(response);
    console.log('===========pleaseOrder=========================');
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(PaymentActions.requestSuccess(data))
      yield put(NavigationActions.navigate({ routeName: 'OrderScreen' }))
    } else {
      // TODO toast
      yield put(PaymentActions.requestFailure())
    }
  } catch (error) {
    console.log('==========pleaseOrder===error=======================');
    console.log(error);
    console.log('==========pleaseOrder===error=======================');
  }
}

// socket.emit('lottery', W.address)
export function* socketInit(api, { data }) {
  yield socket = SocketIOClient(Config.API_URL, { forceNew: true })
  socket.on('connect', connect)
    .on('reconnect', reconnect)
}

function connect() {
  console.log('============connect========================');
}

function reconnect() {
  console.log('============reconnect========================');
}
