import { StyleSheet, PixelRatio} from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical:  Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  itemSection: {
    flexDirection: "column",
    alignItems: "flex-end"
  },
  statusText: {
    fontSize: Fonts.size.medium,
  },
  tokenText: {
    fontSize: Fonts.size.medium
  },
  stampText: {
    fontSize: Fonts.size.small,
    paddingTop: Metrics.smallMargin,
    color: Colors.text003,
  },
  fiatText: {
    fontSize: Fonts.size.small,
    paddingTop: Metrics.smallMargin,
    color: Colors.golden,
  },
  header: {
    backgroundColor: "#dddddd",
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
  }
})
