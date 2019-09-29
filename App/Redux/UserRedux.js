import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import { KeyboardConfig } from '../Config/ContenConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  login: ['data'],
  logout: ['data'],
  getUserInfo: ['data'],
  requestSuccess: ['data'],
  requestFailure: ['data'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userId: undefined,
  status: 0,
  balance: 0,
  fiatType: undefined,
})
/* ------------- Selectors ------------- */

export const PaymentSelectors = {
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  return state.merge({ ...data })
}

// request the avatar for a user
export const request = (state, params) => {
  return state.merge({ loading: true })
}

// successful avatar lookup
export const success = (state, { data }) => {
  // console.log('======user======success======');
  // console.log(data);
  // console.log('======user======success=======');
  return state.merge({ loading: false, ...data })
}

// failed to get the avatar
export const failure = (state, { data }) => {
  return state.merge({ loading: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.LOGIN]: request,
  [Types.LOGOUT]: request,
  [Types.GET_USER_INFO]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})
