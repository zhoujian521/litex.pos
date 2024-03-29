import { Dimensions, Platform } from 'react-native'
import I18n from '../I18n';

const { width: screenW, height: screenH } = Dimensions.get('window')
// iPhoneX  iPhoneXS
const X_WIDTH = 375;
const X_HEIGHT = 812;
// iPhoneXR iPhoneX Max
const XR_WIDTH = 414;
const XR_HEIGHT = 896;
// iPhone11 iPhone11 Pro iPhone11 Pro Max

// iPhone X、iPhone XS
const isIPhoneX = Platform.OS === 'ios' && ((screenH === X_HEIGHT && screenW === X_WIDTH) || (screenH === X_WIDTH && screenW === X_HEIGHT))
// iPhone XS Max iPhoneXR
const isIPhoneXR = Platform.OS === 'ios' && ((screenH === XR_HEIGHT && screenW === XR_WIDTH) || (screenH === XR_WIDTH && screenW === XR_HEIGHT))

export function isIPhoneXL() {
  return isIPhoneX || isIPhoneXR
}

export const isBeforeAndroid21 = Platform.OS === 'android' && Platform.Version < 21;


export async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export function isEmptyArray(obj) {
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    return true;
  }
  return false;
}

export function isEmptyObject(obj) {
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}
