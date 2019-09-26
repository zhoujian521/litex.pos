import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { KeyboardConfig } from '../Config/ContenConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  updateInput: ['data'],
})

export const GithubTypes = Types
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

export const GithubSelectors = {
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  console.log('============update=====payment===================');
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
export const request = (state, { username }) =>
  state.merge({ fetching: true, username, avatar: null })

// successful avatar lookup
export const success = (state, action) => {
  const { avatar } = action
  return state.merge({ fetching: false, error: null, avatar })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.UPDATE_INPUT]: updateInput,

})
