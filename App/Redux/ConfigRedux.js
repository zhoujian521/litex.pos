import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'



/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
})

export const GithubTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  locale: 'zh',
})
/* ------------- Selectors ------------- */

export const GithubSelectors = {
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  console.log('============update=====locale===================');
  console.log(data);
  console.log(state.merge({ ...data }));
  console.log('============update=====locale===================');
  return state.merge({ ...data })
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
  [Types.UPDATE]: update
})
