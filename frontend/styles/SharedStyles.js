import { StyleSheet } from 'react-native';
import StyleVars from './StyleVars';

export default StyleSheet.create({
  sceenContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: StyleVars.Color.mediumBackground,
  },
  headingText: {
    color: StyleVars.Color.primary,
    fontFamily: StyleVars.Fonts.logo,
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    color: StyleVars.Color.primary,
    fontFamily: StyleVars.Fonts.gerneral,
    fontSize: 12,
    fontWeight: '400',
  },
  navBarTitleText: {
    color: StyleVars.Color.navBarTitle,
    fontFamily: StyleVars.Fonts.logo,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  },
});
