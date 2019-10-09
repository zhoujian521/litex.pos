import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'



/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  getConfig: ['data'],
  requestSuccess: ['data'],
  requestFailure: ['data']
})

export const ConfigTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  baseUrl: "",
  contacts: undefined,
  fiats: [],
  locale: undefined,
  isShowModel: false
})
/* ------------- Selectors ------------- */

export const ConfigSelectors = {
  selectAvatar: state => state.config.avatar
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  console.log('============data========================');
  console.log(data);
  console.log('============data========================');
  return state.merge({ ...data })
}

// request the avatar for a user
export const request = (state, params) => {
  return state.merge({ loading: true })
}

// successful avatar lookup
export const success = (state, { data }) => {
  // console.log('======config======success===========');
  // console.log(data);
  // console.log('======config======success===========');
  return state.merge({ loading: false, ...data })
}

// failed to get the avatar
export const failure = (state, { data }) => {
  return state.merge({ loading: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.GET_CONFIG]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})

