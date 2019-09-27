import { Dimensions, Platform } from 'react-native'
import { isIPhoneXL, isBeforeAndroid21 } from '../utils/utils'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? (isIPhoneXL() ? 88 : 64) : 54,
  statusBarHeight: isIPhoneXL() ? 44 : 0, //(isBeforeAndroid21 ? 0 : 20)
  tabBarHeight: isIPhoneXL() ? 83 : 49,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },
  tabIconSize: 24,
  paymentSize: 30
}

export default metrics
