import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { KeyboardConfig } from '../Config/ContenConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  updateInput: ['data'],
  pleaseOrder: ['data'],
  requestSuccess: ['data'],
  requestFailure: ['data'],

  socketInit: ['data'],
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  input: '',
  payment: undefined,
  order: {
    orderId: '',
    fiat: undefined,
    token: undefined
  },
  payRes: undefined
})
/* ------------- Selectors ------------- */

export const PaymentSelectors = {
  selectAvatar: state => state.payment.avatar
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  return state.merge({ ...data })
}

export const updateInput = (state, { data: { input: item } }) => {
  if (!item) {
    return state.merge({ input: '' })
  }
  const { key, label } = item
  let { input } = state
  if (key !== KeyboardConfig.delete.key && input.length < 12) {
    input += label
    // if (key !== KeyboardConfig.point.key) {
    //   input = parseFloat(input)
    //   input = Math.round(input * 100) / 100
    // }
    // input += ''
  } else {
    if (input.length) {
      input = input.substring(0, input.length - 1);
    }
  }
  return state.merge({ input })
}

// request the avatar for a user
export const request = (state, params) => {
  return state.merge({ loading: true })
}

// successful avatar lookup
export const success = (state, { data }) => {
  // console.log('======payment======success========');
  // console.log(data);
  // console.log('======payment======success========');
  return state.merge({ loading: false, ...data })
}

// failed to get the avatar
export const failure = (state, { data }) => {
  return state.merge({ loading: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.UPDATE_INPUT]: updateInput,
  [Types.PLEASE_ORDER]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})
