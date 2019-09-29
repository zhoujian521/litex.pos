import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'



/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  getConfig: ['data'],
  requestSuccess: ['data'],
  requestFailure: ['data'],
})

export const ConfigTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  locale: 'zh',
  currency: 'CNY',
  loading: false
})
/* ------------- Selectors ------------- */

export const GithubSelectors = {
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  console.log('============update=====config===================');
  console.log(data);
  console.log(state.merge({ ...data }));
  console.log('============update=====config===================');
  return state.merge({ ...data })
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
  [Types.GET_CONFIG]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})

