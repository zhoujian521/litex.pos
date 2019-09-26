import { StyleSheet, PixelRatio } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  tabBarStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarUnderline: {
    backgroundColor: Colors.primary,
    height: 5 / PixelRatio.get(),
  },
})
