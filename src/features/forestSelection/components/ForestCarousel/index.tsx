import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity, View } from 'react-native';

import type { Forest } from '@/features/forestSelection/types';
import { styles } from './styles';

type ForestCarouselProps = {
  forests: Forest[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
};

export const ForestCarousel = ({
  forests,
  currentIndex,
  onPrevious,
  onNext,
  disabled = false,
}: ForestCarouselProps) => {
  // 森データがない場合は何も表示しない
  if (!forests || forests.length === 0) {
    return null;
  }

  // currentIndexが有効な範囲外の場合の防御
  const validIndex = currentIndex >= 0 && currentIndex < forests.length ? currentIndex : 0;
  const currentForest = forests[validIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.arrowButton}>
        <Ionicons name="chevron-back" size={40} color="#5D3A1A" />
      </TouchableOpacity>

      <View style={styles.forestContainer}>
        <Image
          source={currentForest.image}
          style={[styles.forestImage, disabled && styles.forestImageDisabled]}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity onPress={onNext} style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={40} color="#5D3A1A" />
      </TouchableOpacity>
    </View>
  );
};
