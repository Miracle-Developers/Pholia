import { Dimensions } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { LeafData } from "@/application/leaves/types";

type LeafSlot = {
  key: string;
  leaf: LeafData | null;
};

type LeafPage = {
  key: string;
  slots: LeafSlot[];
};

type LeafPagerState = {
  pages: LeafPage[];
  currentPage: number;
  totalPages: number;
  selectedLeafId: number | null;
  selectedLeaf: LeafData | null;
  pageWidth: number;
  onMomentumScrollEnd: (event: { nativeEvent: { contentOffset: { x: number } } }) => void;
  onSelectLeaf: (leafId: number) => void;
};

const chunk = <T,>(array: T[], size: number): T[][] => {
  return array.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]),
    [] as T[][],
  );
};

export const useLeafPager = (leaves: LeafData[], pageSize = 9): LeafPagerState => {
  const pageWidth = Dimensions.get("window").width;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLeafId, setSelectedLeafId] = useState<number | null>(null);

  const slotIds = useMemo(
    () => Array.from({ length: pageSize }, (_, index) => `slot-${index + 1}`),
    [pageSize],
  );

  const pages = useMemo<LeafPage[]>(() => {
    const rawPages = chunk(leaves, pageSize);
    const normalizedPages = rawPages.length > 0 ? rawPages : [[]];

    return normalizedPages.map((pageLeaves) => {
      const pageKey =
        pageLeaves.length > 0
          ? pageLeaves.map((leaf) => (leaf ? String(leaf.id) : "empty")).join("-")
          : "empty";
      const filledPage = [...pageLeaves, ...Array(pageSize - pageLeaves.length).fill(null)];
      const slots = slotIds.map((slotId, index) => {
        const leaf = filledPage[index] as LeafData | null;
        return {
          key: leaf ? `leaf-${leaf.id}` : `placeholder-${pageKey}-${slotId}`,
          leaf,
        };
      });
      return { key: `page-${pageKey}`, slots };
    });
  }, [leaves, pageSize, slotIds]);

  const totalPages = pages.length;

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
      setSelectedLeafId(null);
    }
  }, [currentPage, totalPages]);

  const onSelectLeaf = useCallback((leafId: number) => {
    setSelectedLeafId((prev) => (prev === leafId ? null : leafId));
  }, []);

  const onMomentumScrollEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const nextPage = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
      setCurrentPage(nextPage);
      setSelectedLeafId(null);
    },
    [pageWidth],
  );

  const selectedLeaf = useMemo(
    () => (selectedLeafId ? leaves.find((leaf) => leaf.id === selectedLeafId) ?? null : null),
    [leaves, selectedLeafId],
  );

  return {
    pages,
    currentPage,
    totalPages,
    selectedLeafId,
    selectedLeaf,
    pageWidth,
    onMomentumScrollEnd,
    onSelectLeaf,
  };
};
