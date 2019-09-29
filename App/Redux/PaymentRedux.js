import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { KeyboardConfig } from '../Config/ContenConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  updateInput: ['data'],
  pleaseOrder: ['data'],
  socketInit: ['data'],
  requestSuccess: ['data'],
  requestFailure: ['data'],
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fiat: 'CNY',
  payment: undefined,
  input: '',
  order: {
    orderId: '2019092516533784284',
    fiat: {
      symbol: 'USD',
      amount: '1.2'
    },
    token: {
      symbol: 'USDT',
      amount: '1200000',
      decimal: 6,
      round: 2
    }
  }
})
/* ------------- Selectors ------------- */

export const PaymentSelectors = {
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  console.log('============update=====payment===================');
  console.log(data);
  console.log(state.merge({ ...data }));
  console.log('============update=====payment===================');
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
  } else {
    if (input.length) {
      input = input.substring(0, input.length - 1);
    }
  }
  return state.merge({ input })
}

// request the avatar for a user
export const request = (state, params) => {
  console.log('============request========================');
  console.log(params);
  console.log('============request========================');
  return state.merge({ loading: true })
}

// successful avatar lookup
export const success = (state, { data }) => {
  console.log('======payment======success========');
  console.log(data);
  console.log(state.merge({ loading: false, ...data }));
  console.log('======payment======success========');
  return state.merge({ loading: false, ...data })
}

// failed to get the avatar
export const failure = (state, { data }) => {
  console.log('============failure========================');
  console.log(data);
  console.log('============failure========================');
  return state.merge({ loading: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.UPDATE_INPUT]: updateInput,
  [Types.PLEASE_ORDER]: request,
  // [Types.SOCKET_INIT]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})
