import {StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
        backgroundColor: Colors.background,
    },
    footerText: {
        fontSize: Fonts.size.medium,
        color: Colors.primary,
        backgroundColor: Colors.background,
    }
});
