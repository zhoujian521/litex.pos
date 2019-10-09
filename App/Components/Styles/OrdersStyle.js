import { StyleSheet, PixelRatio, Platform } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    flexDirection: "column",
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Metrics.baseMargin
  },
  statusText: {
    fontSize: Fonts.size.medium,
  },
  tokenText: {
    fontSize: Fonts.size.medium,
    color: Colors.golden,
  },
  stampText: {
    fontSize: Fonts.size.small,
    paddingTop: Metrics.smallMargin,
    color: Colors.text003,
  },
  fiatText: {
    fontSize: Fonts.size.small,
    paddingTop: Metrics.smallMargin,
  },
  leftText: {
    color: (Platform.OS === 'ios') ? Colors.text002 : Colors.text003,
  }
})
