import { StyleSheet, PixelRatio } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopColor: Colors.line,
  },
  bottom: {
    backgroundColor: Colors.background,
    borderTopColor: Colors.line,
    borderTopWidth: 1 / PixelRatio.get(),
  }
})
