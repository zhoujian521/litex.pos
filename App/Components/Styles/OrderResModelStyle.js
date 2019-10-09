import { StyleSheet, PixelRatio, Platform } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'rgba(37, 8, 10, 0.2)'
  },
  children: {
    alignItems: 'stretch',
    backgroundColor: Colors.background
  },
  content: {
    alignItems: 'stretch',
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: Metrics.buttonRadius
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrics.section
  },
  center: {
  },
  icon: {
    height: Metrics.images.large,
    width: Metrics.images.large,
    marginVertical: Metrics.baseMargin
  },
  goods: {
  },
  resText: {
    fontSize: Fonts.size.input,
    marginTop: Metrics.section
  },
  completeBtn: {
    alignSelf:'center',
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: Metrics.doubleBaseMargin * 2,
    backgroundColor: Colors.primary,
    marginTop: Metrics.section,
    borderRadius: Metrics.buttonRadius
  },
  completeTitle: {
    color: Colors.background,
    fontSize: Fonts.size.medium
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical : Metrics.baseMargin,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  logoText: {
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
    color: Colors.primary
  },
  leftText: {
    color: (Platform.OS === 'ios') ? Colors.text002 : Colors.text003,
  }
})
