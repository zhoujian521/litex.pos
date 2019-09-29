import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AssetsActions from '../Redux/AssetsRedux'

export function* getOrders(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.getOrders, params)
    console.log('===========getOrders=========================');
    console.log(response);
    console.log('===========getOrders=========================');
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(AssetsActions.requestSuccess(data))
    } else {
      // TODO toast
      yield put(AssetsActions.requestFailure())
    }
  } catch (error) {
    console.log('==========getOrders===error=======================');
    console.log(error);
    console.log('==========getOrders===error=======================');
  }
}

export function* getAssets(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.getAssets, params)
    console.log('===========getAssets=========================');
    console.log(response);
    console.log('===========getAssets=========================');
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(AssetsActions.requestSuccess(data))
    } else {
      // TODO toast
      yield put(AssetsActions.requestFailure())
    }
  } catch (error) {
    console.log('==========getAssets===error=======================');
    console.log(error);
    console.log('==========getAssets===error=======================');
  }
}
