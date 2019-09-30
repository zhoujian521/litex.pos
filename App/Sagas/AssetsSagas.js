import { call, put, select } from 'redux-saga/effects'
import { path } from 'ramda'
import AssetsActions from '../Redux/AssetsRedux'

export function* getOrders(api, { data: params }) {
  try {
    const { page } = params
    // make the call to the api
    const response = yield call(api.getOrders, params)

    let { code = 0, msg = "", data = [] } = response.data
    if (!code) {
      const orders = { orders: data, page }
      yield put(AssetsActions.getOrdersSuccess(orders))
    } else {
      yield put(AssetsActions.getOrdersFailure())
    }
  } catch (error) {
    console.log('==========getOrders===error========');
    console.log(error);
    console.log('==========getOrders===error========');
  }
}

export function* getAssets(api, { data: params }) {
  console.log('=============params=======================');
  console.log(params);
  console.log('=============params=======================');
  try {
    // make the call to the api
    const { page } = params
    const response = yield call(api.getAssets, params)

    const { code = 0, msg = "", data } = response.data

    if (!code) {
      const { balance, asset: assets } = data
      yield put(AssetsActions.getAssetsSuccess({ balance, assets, page }))
    } else {
      yield put(AssetsActions.getAssetsFailure())
    }
  } catch (error) {
    console.log('==========getAssets===error=========');
    console.log(error);
    console.log('==========getAssets===error=========');
  }
}
