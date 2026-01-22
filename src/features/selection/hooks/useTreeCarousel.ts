import { useState } from 'react';
import type { Tree, TreeCarouselState } from '@/features/selection/types';

export function useTreeCarousel(trees: Tree[], initialTreeId = 1) {
  const [state, setState] = useState<TreeCarouselState>(() => {
    const initialIndex = trees.findIndex(tree => tree.id === initialTreeId);
    return {
      selectedTreeId: initialTreeId,
      currentIndex: initialIndex >= 0 ? initialIndex : 0,
    };
  });

  const handleNext = () => {
    const nextIndex = (state.currentIndex + 1) % trees.length;
    const nextTree = trees[nextIndex];
    setState({
      selectedTreeId: nextTree.id,
      currentIndex: nextIndex,
    });
  };

  const handlePrevious = () => {
    const prevIndex = state.currentIndex === 0 ? trees.length - 1 : state.currentIndex - 1;
    const prevTree = trees[prevIndex];
    setState({
      selectedTreeId: prevTree.id,
      currentIndex: prevIndex,
    });
  };

  return {
    selectedTreeId: state.selectedTreeId,
    currentIndex: state.currentIndex,
    handleNext,
    handlePrevious,
  };
}