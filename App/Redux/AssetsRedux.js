import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import { KeyboardConfig } from '../Config/ContenConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  getOrders: ['data'],
  getAssets: ['data'],
  requestSuccess: ['data'],
  requestFailure: ['data'],
})

export const AssetsTypes = Types
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

// request the avatar for a user
export const request = (state, params) => {
  console.log('=======Assets=====request=========');
  console.log(params);
  console.log('=======Assets=====request=========');
  return state.merge({ loading: true })
}

// successful avatar lookup
export const success = (state, { data }) => {
  console.log('============success========================');
  console.log(data);
  console.log(state.merge({ loading: false, ...data }));
  console.log('============success========================');
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
  [Types.GET_ORDERS]: request,
  [Types.GET_ASSETS]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})
