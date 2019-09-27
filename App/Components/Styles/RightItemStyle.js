import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: Metrics.doubleBaseMargin,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Metrics.section,
    paddingVertical: Metrics.baseMargin,
    height: 35,
  },
  item: {
    color: Colors.primary
  }
});
