import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes';
const margin = Platform.OS === 'ios' ? Metrics.baseMargin : 0

export default StyleSheet.create({
  container: {
    height: Metrics.navBarHeight,
  },
  content: {
    marginTop: Metrics.statusBarHeight + margin,
    paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    width: 80,
    height: Metrics.navBarHeight - Metrics.statusBarHeight,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  headerRight: {
    width: 80,
    height: Metrics.navBarHeight - Metrics.statusBarHeight,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  centerItem: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Fonts.size.input,
    color: Colors.background
  }
})
