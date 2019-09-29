import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import PaymentActions from '../Redux/PaymentRedux'

export function* login(api, { data: params }) {
  // try {
  //   // make the call to the api
  //   const response = yield call(api.login, params)
  //   const { code = 0, msg = "", data } = response.data
  //   if (!code) {
  //     yield put(PaymentActions.requestSuccess(data))
  //     const { userId } = data
  //     const res = yield call(api.getUserInfo, { userId })
  //     const { code: infoCode = 0, msg: infoMsg = "", data: info } = res.data
  //     if (!infoCode) {
  //       yield put(PaymentActions.requestSuccess(info))
  //     } else {
  //       // TODO toast
  //       yield put(PaymentActions.requestFailure())
  //     }
  //   } else {
  //     // TODO toast
  //     yield put(PaymentActions.requestFailure())
  //   }
  // } catch (error) {
  //   console.log('==========login===error=======================');
  //   console.log(error);
  //   console.log('==========login===error=======================');
  // }
}

export function* getUserInfo(api, { data: params }) {
  // try {
  //   // make the call to the api
  //   const response = yield call(api.getUserInfo, params)
  //   const { code = 0, msg = "", data } = response.data
  //   if (!code) {
  //     yield put(PaymentActions.requestSuccess(data))
  //   } else {
  //     // TODO toast
  //     yield put(PaymentActions.requestFailure())
  //   }
  // } catch (error) {
  //   console.log('==========getUserInfo===error=======================');
  //   console.log(error);
  //   console.log('==========getUserInfo===error=======================');
  // }
}
