import { useState } from 'react';
import type { Forest } from '@/features/selection/types';

export const useForestCarousel = (forests: Forest[], initialForestId: number = 1) => {
  const [selectedForestId, setSelectedForestId] = useState(initialForestId);

  const currentIndex = forests.findIndex(f => f.id === selectedForestId);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : forests.length - 1;
    setSelectedForestId(forests[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = currentIndex < forests.length - 1 ? currentIndex + 1 : 0;
    setSelectedForestId(forests[newIndex].id);
  };

  return {
    selectedForestId,
    currentIndex,
    handlePrevious,
    handleNext,
    setSelectedForestId,
  };
};
