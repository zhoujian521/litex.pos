import { StyleSheet, PixelRatio, Platform } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: Metrics.section
  },
  centerSection: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomSection: {
    justifyContent: "center",
    alignItems: "center",
    padding: Metrics.baseMargin
  },
  logo: {
    height: Metrics.images.large,
    width: Metrics.images.large,
    resizeMode: "stretch",
    marginBottom: Metrics.baseMargin,
  },
  titleText: {
    fontSize: Fonts.size.h6,
    fontWeight: "bold",
    color: Colors.primary
  },
  infoView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.section
  },
  inputView: {
    width: "80%",
    height: "100%",
    borderBottomColor: Platform.OS === 'ios' ? Colors.primary : Colors.background ,
    borderBottomWidth: 1 / PixelRatio.get(),
    paddingLeft: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: Metrics.doubleBaseMargin * 2,
    backgroundColor: Colors.primary,
    marginTop: Metrics.section,
    borderRadius: Metrics.buttonRadius
  },
  loginTitle: {
    color: Colors.background,
    fontSize: Fonts.size.medium
  }

})
