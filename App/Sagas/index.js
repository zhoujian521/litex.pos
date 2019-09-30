import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'

import { ConfigTypes } from '../Redux/ConfigRedux'
import { UserTypes } from '../Redux/UserRedux'
import { PaymentTypes } from '../Redux/PaymentRedux'
import { AssetsTypes } from '../Redux/AssetsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'

import { getConfig } from './ConfigSagas'
import { login, getUserInfo, logout, switchFiat } from './UserSagas'
import { pleaseOrder, socketInit } from './PaymentSagas'
import { getOrders, getAssets } from './AssetsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(ConfigTypes.GET_CONFIG, getConfig, api),
    takeLatest(UserTypes.LOGIN, login, api),
    takeLatest(UserTypes.GET_USER_INFO, getUserInfo, api),
    takeLatest(UserTypes.LOGOUT, logout, api),
    takeLatest(PaymentTypes.PLEASE_ORDER, pleaseOrder, api),
    takeLatest(AssetsTypes.GET_ORDERS, getOrders, api),
    takeLatest(AssetsTypes.GET_ASSETS, getAssets, api),
    takeLatest(PaymentTypes.SOCKET_INIT, socketInit, api),
    takeLatest(UserTypes.SWITCH_FIAT, switchFiat, api)
  ])
}
