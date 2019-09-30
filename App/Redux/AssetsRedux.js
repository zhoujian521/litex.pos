import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { RefreshState } from '../Components/RefreshListView'
import { isEmptyArray } from '../utils/utils'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  update: ['data'],
  getOrders: ['data'],
  getAssets: ['data'],
  requestSuccess: ['data'],
  requestFailure: ['data'],

  getOrdersSuccess: ['data'],
  getAssetsSuccess: ['data'],
  getOrdersFailure: ['data'],
  getAssetsFailure: ['data'],
})

export const AssetsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  oLoading: RefreshState.Idle,
  aLoading: 0,
  balance: undefined,
  orders: [],
  assets: []
})
/* ------------- Selectors ------------- */

export const AssetsSelectors = {
  selectOrders: state => state.assets.orders,
  selectAssets: state => state.assets.assets,
}

/* ------------- Reducers ------------- */
export const update = (state, { data }) => {
  return state.merge({ ...data })
}

// request the avatar for a user
export const request = (state, params) => {
  const { type, data: { page } } = params
  let status = RefreshState.Idle
  if (page === 1) {
    status = RefreshState.HeaderRefreshing
  } else {
    status = RefreshState.FooterRefreshing
  }
  switch (type) {
    case "GET_ORDERS":
      return state.merge({ oLoading: status })
    case "GET_ASSETS":
      return state.merge({ aLoading: status })

    default:

      break;
  }
  return state.merge({ oLoading: RefreshState.Idle, aLoading: RefreshState.Idle })
}

// successful avatar lookup
export const success = (state, { type, data }) => {
  // console.log('=========success===========================');
  // console.log(type, data);
  // console.log(state.orders);
  // console.log('=========success===========================');
  let status = RefreshState.Idle

  switch (type) {
    case "GET_ORDERS_SUCCESS": {
      const { orders, page } = data
      let array = state.orders;
      if (isEmptyArray(orders) && page === 1) {
        array = []
        status = RefreshState.EmptyData
      }
      if (isEmptyArray(orders) && page > 1) {  // -1
        status = RefreshState.NoMoreData
      }
      if (!isEmptyArray(orders)) {
        status = RefreshState.Idle
        if (page === 1) {
          array = orders;
        } else {
          array = [...array, ...orders];
        }
      }
      return state.merge({ oLoading: status, orders: array })
    }

    case "GET_ASSETS_SUCCESS": {
      const { balance, assets, page } = data
      let array = state.assets;
      if (isEmptyArray(assets) && page === 1) {
        array = []
        status = RefreshState.EmptyData
      }
      if (isEmptyArray(assets) && page > 1) { // -1
        status = RefreshState.NoMoreData
      }
      if (!isEmptyArray(assets)) {
        if (page === 1) {
          array = assets;
        } else {
          array = [...array, ...assets];
        }

        status = RefreshState.Idle
      }
      return state.merge({ balance, aLoading: status, assets: array })
    }

    default:
      break;
  }

  return state.merge({ oLoading: RefreshState.Idle, aLoading: RefreshState.Idle })
}

// failed to get the avatar
export const failure = (state, { type, data }) => {
  switch (type) {
    case "GET_ORDERS_SUCCESS":
      return state.merge({ oLoading: RefreshState.Failure })
    case "GET_ASSETS_SUCCESS":
      return state.merge({ aLoading: RefreshState.Failure })

    default:

      break;
  }

  return state.merge({ oLoading: RefreshState.Idle, aLoading: RefreshState.Idle })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.GET_ORDERS]: request,
  [Types.GET_ASSETS]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure,
  [Types.GET_ORDERS_SUCCESS]: success,
  [Types.GET_ASSETS_SUCCESS]: success,
  [Types.GET_ORDERS_FAILURE]: failure,
  [Types.GET_ASSETS_FAILURE]: failure,
})
