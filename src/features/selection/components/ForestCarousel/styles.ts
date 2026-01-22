import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const FOREST_WIDTH = width * 0.7;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  arrowButton: {
    padding: 10,
  },
  forestContainer: {
    width: FOREST_WIDTH,
    height: FOREST_WIDTH * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forestImage: {
    width: '100%',
    height: '100%',
  },
});
