import { useEffect, useState } from "react";
import type { Forest, ForestCarouselState } from "@/features/selection/types";

export const useForestCarousel = (forests: Forest[], initialForestId: number = 1) => {
  const [state, setState] = useState<ForestCarouselState>(() => {
    const initialIndex = forests.findIndex((forest) => forest.id === initialForestId);
    if (forests.length === 0) {
      return { selectedForestId: null, currentIndex: 0 };
    }
    return {
      selectedForestId: initialForestId,
      currentIndex: initialIndex >= 0 ? initialIndex : 0,
    };
  });

  useEffect(() => {
    if (forests.length === 0) {
      setState({ selectedForestId: null, currentIndex: 0 });
      return;
    }
    setState((prev) => {
      const existingIndex = prev.selectedForestId
        ? forests.findIndex((forest) => forest.id === prev.selectedForestId)
        : -1;
      if (existingIndex >= 0) {
        return { selectedForestId: prev.selectedForestId, currentIndex: existingIndex };
      }
      return { selectedForestId: forests[0].id, currentIndex: 0 };
    });
  }, [forests]);

  const handlePrevious = () => {
    if (forests.length === 0) return;
    const newIndex = state.currentIndex > 0 ? state.currentIndex - 1 : forests.length - 1;
    setState({
      selectedForestId: forests[newIndex].id,
      currentIndex: newIndex,
    });
  };

  const handleNext = () => {
    if (forests.length === 0) return;
    const newIndex = state.currentIndex < forests.length - 1 ? state.currentIndex + 1 : 0;
    setState({
      selectedForestId: forests[newIndex].id,
      currentIndex: newIndex,
    });
  };

  return {
    selectedForestId: state.selectedForestId,
    currentIndex: state.currentIndex,
    handlePrevious,
    handleNext,
  };
};
