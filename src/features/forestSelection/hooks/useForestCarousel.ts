import type { Forest } from '@/features/forestSelection/types';
import { useEffect, useState } from 'react';

export const useForestCarousel = (forests: Forest[], initialForestId: number | null = null) => {
  const [selectedForestId, setSelectedForestId] = useState<number | null>(null);

  // フォレストが変更されたら選択IDを更新
  useEffect(() => {
    if (forests.length > 0) {
      // initialForestIdが指定されている場合はそれを使用、なければ最初の森を選択
      if (initialForestId !== null && forests.some(f => f.id === initialForestId)) {
        setSelectedForestId(initialForestId);
      } else {
        setSelectedForestId(forests[0].id);
      }
    }
  }, [forests, initialForestId]);

  const currentIndex = selectedForestId !== null ? forests.findIndex(f => f.id === selectedForestId) : 0;

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
    currentIndex: currentIndex >= 0 ? currentIndex : 0,
    handlePrevious,
    handleNext,
    setSelectedForestId,
  };
};
