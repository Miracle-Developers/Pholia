import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const TREE_WIDTH = width * 0.7;

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
  treeContainer: {
    width: TREE_WIDTH,
    height: TREE_WIDTH * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeImage: {
    width: '100%',
    height: '100%',
  },
});