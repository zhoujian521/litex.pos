import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import ConfigActions from '../Redux/ConfigRedux'

export function* getConfig(api, action) {
  try {
    // make the call to the api
    const response = yield call(api.getConfig)
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(ConfigActions.requestSuccess(data))
    } else {
      yield put(ConfigActions.requestFailure(data))
    }
  } catch (error) {
    console.log('=======getConfig=====error========');
    console.log(error);
    console.log('=======getConfig=====error========');
  }
}


