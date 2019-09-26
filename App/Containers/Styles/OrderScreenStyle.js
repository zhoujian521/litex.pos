import { StyleSheet, PixelRatio, Platform } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'
import { Metrics, Fonts } from '../../Themes';


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  topSection: {
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.section,
    borderWidth: Metrics.horizontalLineHeight / PixelRatio.get(),
    borderColor: Colors.line,
    borderRadius: Metrics.buttonRadius * 2,
    alignItems: 'center'
  },
  bottomSection: {
    padding: Metrics.baseMargin,
  },
  amountSection: {
    paddingHorizontal: Metrics.section,
    paddingBottom: Metrics.baseMargin,
    borderBottomWidth: Metrics.horizontalLineHeight / PixelRatio.get(),
    borderBottomColor: Colors.line,
    borderStyle:'solid', // 'solid' | 'dotted' | 'dashed',
  },
  qrCodeSection: {
    paddingTop: Metrics.section,
    alignItems: 'center',
    paddingHorizontal: Metrics.section,
  },
  fiatSection: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  tokenSection: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  orderId: {
    paddingTop: Metrics.baseMargin,
    color: Colors.primary
  },
  imageSection: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    padding: Metrics.baseMargin,
  },
  image: {
    backgroundColor: "#eeeeee",
    height: Metrics.icons.medium,
    width: Metrics.icons.medium,
    resizeMode: "center",
    borderRadius: Metrics.buttonRadius,
  },
  leftTitle: {
    color: Colors.text002,
    fontSize: Fonts.size.medium,
  },
  rightAmount: {
    color: Colors.golden,
    fontSize: Fonts.size.input,
  }
})
