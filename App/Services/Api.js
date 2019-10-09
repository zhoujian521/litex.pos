// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Config from 'react-native-config';
import Toast from 'react-native-root-toast';
import I18n from '../I18n';
import { transformApiError } from '../utils/helper'
import { EventEmitter, EventKeys } from '../utils/EventEmitter';
// our "constructor"
const create = (baseURL = Config.API_URL || 'http://192.168.51.73:7002') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })
  api.addRequestTransform((request) => {
    // console.log('==========request==========================');
    // console.log(request);
    // console.log('===========request=========================');
  });

  api.addResponseTransform(response => {
    console.log('==========response==========================');
    console.log(response);
    console.log('===========response=========================');
    const { ok } = response
    if (!response || !ok) {
      Toast.show(I18n.t('NetworkError'), {
        shadow: true,
        position: Toast.positions.CENTER
      });
      return
    }
    let { code = 0 } = response.data
    code = parseInt(code)
    if (!code) return response;
    const { msg } = transformApiError(code)
    Toast.show(msg, {
      shadow: true,
      position: Toast.positions.CENTER
    });
    if (code === 501 || code === 50001) {
      EventEmitter.emit(EventKeys.USER_IS_NOT_LOGIN);
    }
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', { q: username })

  const getConfig = () => api.get('/api/v1/config');
  const login = (params) => api.post('/api/v1/login', params);
  const getUserInfo = (params) => api.get('/api/v1/userInfo', params);
  const logout = () => api.post('/api/v1/logout');
  const pleaseOrder = (params) => api.post('/api/v1/placeOrder', params);
  const getOrders = (params) => api.get('/api/v1/orders', params);
  const getAssets = (params) => api.get('/api/v1/assets', params);
  const switchFiat = (params) => api.post('/api/v1/switchFiat', params);

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,

    getConfig,
    login,
    getUserInfo,
    logout,
    pleaseOrder,
    getOrders,
    getAssets,
    switchFiat
  }
}

// let's return back our create method as the default.
export default {
  create
}
