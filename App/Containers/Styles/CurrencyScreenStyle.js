import { StyleSheet, PixelRatio } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  saveBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: Metrics.doubleBaseMargin * 2,
    backgroundColor: Colors.primary,
    marginHorizontal: Metrics.section,
    borderRadius: Metrics.buttonRadius,
    marginBottom: Metrics.doubleSection
  },
  saveTitle: {
    color: Colors.background,
    fontSize: Fonts.size.medium
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.doubleBaseMargin,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1 / PixelRatio.get(),
    height: Metrics.doubleSection
  },
  itemTitle: {
    color: Colors.text002,
  },
})
