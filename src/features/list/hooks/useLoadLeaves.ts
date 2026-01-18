import { useEffect, useState } from "react";

import { loadLeaves } from "@/application/leaves/usecases";
import type { LeafData } from "@/application/leaves/types";

export function useLoadLeaves(leafIds: number[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [leavesById, setLeavesById] = useState<Record<number, LeafData>>({});

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      if (!leafIds.length) {
        if (isActive) {
          setLeavesById({});
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        const leaves = await loadLeaves(leafIds);
        if (!isActive) return;
        const map = leaves.reduce<Record<number, LeafData>>((acc, leaf) => {
          acc[leaf.id] = leaf;
          return acc;
        }, {});
        setLeavesById(map);
      } catch (error) {
        console.warn("葉の読み込みに失敗:", error);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      isActive = false;
    };
  }, [leafIds]);

  return { isLoading, leavesById };
}
