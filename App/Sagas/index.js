import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'

import { ConfigTypes } from '../Redux/ConfigRedux'
import { PaymentTypes } from '../Redux/PaymentRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'

import { getConfig } from './ConfigSagas'
import { login, getUserInfo, logout } from './UserSagas'

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
  ])
}
