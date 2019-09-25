import { StyleSheet, PixelRatio } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Fonts } from '../../Themes';
import { Colors } from '../../../ignite/DevScreens/DevTheme';

const boxW = (Metrics.screenWidth - Metrics.doubleSection - 6.4) / 3;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  paymentContainer: {
    padding: Metrics.baseMargin,
    alignItems: "center",
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.marginVertical,
    borderColor: "#dddddd",
    borderWidth: 0.2,
  },
  keyItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: boxW,
    height: Metrics.doubleSection,
    borderColor: "#dddddd",
    borderWidth: 0.2,
    margin: Metrics.horizontalLineHeight,

    shadowColor: Colors.text003,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: Metrics.buttonRadius,
  },
  topSection: {
    justifyContent: "flex-start",
    borderColor: "#dddddd",
  },
  input: {
    borderWidth: Metrics.horizontalLineHeight / PixelRatio.get(),
    borderRadius: Metrics.buttonRadius,
    height: Metrics.doubleSection * 2,
    margin: Metrics.section,
    padding: Metrics.section,
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  symbol: {
    fontSize: Fonts.size.h4,
    color: "red",
    marginBottom: Metrics.smallMargin,
    alignSelf:'flex-end'
  },
  inputNum: {
    fontSize: Fonts.size.h1,
  }
})
