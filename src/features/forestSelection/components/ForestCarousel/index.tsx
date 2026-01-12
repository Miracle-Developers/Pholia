import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Forest } from '@/features/forestSelection/types';

const { width } = Dimensions.get('window');
const FOREST_WIDTH = width * 0.7;

type ForestCarouselProps = {
  forests: Forest[];
  selectedForestId: number;
  onSelectForest: (forestId: number) => void;
};

export const ForestCarousel = ({
  forests,
  selectedForestId,
  onSelectForest,
}: ForestCarouselProps) => {
  const currentIndex = forests.findIndex(f => f.id === selectedForestId);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : forests.length - 1;
    onSelectForest(forests[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = currentIndex < forests.length - 1 ? currentIndex + 1 : 0;
    onSelectForest(forests[newIndex].id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevious} style={styles.arrowButton}>
        <Ionicons name="chevron-back" size={40} color="#5D3A1A" />
      </TouchableOpacity>

      <View style={styles.forestContainer}>
        <Image
          source={forests[currentIndex].image}
          style={styles.forestImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={40} color="#5D3A1A" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
