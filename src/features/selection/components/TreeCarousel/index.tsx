import { Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Tree } from '@/features/selection/types';
import { styles } from './styles';

type TreeCarouselProps = {
  trees: Tree[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const TreeCarousel = ({
  trees,
  currentIndex,
  onPrevious,
  onNext,
}: TreeCarouselProps) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.arrowButton}>
        <Ionicons name="chevron-back" size={40} color="#5D3A1A" />
      </TouchableOpacity>

      <View style={styles.treeContainer}>
        <Image
          source={trees[currentIndex].image}
          style={styles.treeImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity onPress={onNext} style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={40} color="#5D3A1A" />
      </TouchableOpacity>
    </View>
  );
};