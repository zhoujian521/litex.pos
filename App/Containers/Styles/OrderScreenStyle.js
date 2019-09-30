import { StyleSheet, PixelRatio } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'
import { Metrics, Fonts } from '../../Themes';


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  topSection: {
    flex: 3,
    margin: Metrics.doubleSection,
    marginBottom: 0,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: Colors.line,
    borderRadius: Metrics.buttonRadius * 2,
  },
  bottomSection: {
    flex: 1,
    alignItems: "center"
  },
  amountSection: {
    paddingVertical: Metrics.baseMargin,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: Colors.line,
    borderStyle:'solid', // 'solid' | 'dotted' | 'dashed',
  },
  qrCodeSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: '40%',
    textAlign: "right",
    paddingRight: Metrics.smallMargin
  },
  rightAmount: {
    color: Colors.golden,
    fontSize: Fonts.size.medium,
    paddingRight: Metrics.smallMargin
  }
})
