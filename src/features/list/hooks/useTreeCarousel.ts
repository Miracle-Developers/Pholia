import { useEffect, useState } from 'react';

type Tree = {
  id: number;
  name: string;
};

export const useTreeCarousel = (trees: Tree[], initialTreeId: number | null = null) => {
  const [selectedTreeId, setSelectedTreeId] = useState<number | null>(null);

  // ツリーが変更されたら選択IDを更新
  useEffect(() => {
    if (trees.length > 0) {
      // initialTreeIdが指定されている場合はそれを使用、なければ最初の木を選択
      if (initialTreeId !== null && trees.some(t => t.id === initialTreeId)) {
        setSelectedTreeId(initialTreeId);
      } else {
        setSelectedTreeId(trees[0].id);
      }
    }
  }, [trees, initialTreeId]);

  const currentIndex = selectedTreeId !== null ? trees.findIndex(t => t.id === selectedTreeId) : 0;

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : trees.length - 1;
    setSelectedTreeId(trees[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = currentIndex < trees.length - 1 ? currentIndex + 1 : 0;
    setSelectedTreeId(trees[newIndex].id);
  };

  return {
    selectedTreeId,
    currentIndex: currentIndex >= 0 ? currentIndex : 0,
    handlePrevious,
    handleNext,
    setSelectedTreeId,
  };
};
