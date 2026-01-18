import { Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Forest } from '@/features/forestSelection/types';
import { styles } from './styles';

type ForestCarouselProps = {
  forests: Forest[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const ForestCarousel = ({
  forests,
  currentIndex,
  onPrevious,
  onNext,
}: ForestCarouselProps) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.arrowButton}>
        <Ionicons name="chevron-back" size={40} color="#5D3A1A" />
      </TouchableOpacity>

      <View style={styles.forestContainer}>
        <Image
          source={forests[currentIndex].image}
          style={styles.forestImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity onPress={onNext} style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={40} color="#5D3A1A" />
      </TouchableOpacity>
    </View>
  );
};
