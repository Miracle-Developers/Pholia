import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity, View } from 'react-native';

type Tree = {
  id: number;
  name: string;
};

type TreeCarouselProps = {
  trees: Tree[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
};

import { styles } from './styles';

export const TreeCarousel = ({
  trees,
  currentIndex,
  onPrevious,
  onNext,
  disabled = false,
}: TreeCarouselProps) => {
  // 木データがない場合は何も表示しない
  if (!trees || trees.length === 0) {
    return null;
  }

  // currentIndexが有効な範囲外の場合の防御
  const validIndex = currentIndex >= 0 && currentIndex < trees.length ? currentIndex : 0;
  const currentTree = trees[validIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onPrevious} 
        style={styles.arrowButton}
        disabled={disabled}
      >
        <Ionicons 
          name="chevron-back" 
          size={40} 
          color={disabled ? '#CCCCCC' : '#5D3A1A'} 
        />
      </TouchableOpacity>

      <View style={styles.treeContainer}>
        <Image
          source={require('@/../assets/tree1.png')}
          style={[styles.treeImage, disabled && styles.treeImageDisabled]}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity 
        onPress={onNext} 
        style={styles.arrowButton}
        disabled={disabled}
      >
        <Ionicons 
          name="chevron-forward" 
          size={40} 
          color={disabled ? '#CCCCCC' : '#5D3A1A'} 
        />
      </TouchableOpacity>
    </View>
  );
};
