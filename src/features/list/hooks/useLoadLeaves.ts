import type { LeafData } from "@/application/leaves/types";
import { loadLeavesFromStructure } from "@/application/leaves/usecases";
import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { loadUserTrees } from "@/application/structure/usecases/loadUserTrees";
import { useEffect, useState } from "react";

export const useLoadLeaves = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaves, setLeaves] = useState<LeafData[]>([]);

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const selectedTree = getSelectedTree();
        if (!selectedTree) {
          if (isActive) {
            setLeaves([]);
            setIsLoading(false);
          }
          return;
        }

        const loadedLeaves = await loadLeavesFromStructure(selectedTree.id);
        if (!isActive) return;

        let resolvedLeaves = loadedLeaves;
        if (loadedLeaves.some((leaf) => !leaf.treeName)) {
          let treeNameById: Record<number, string> = {};
          if (selectedTree.name) {
            treeNameById = { [selectedTree.id]: selectedTree.name };
          } else {
            try {
              const trees = await loadUserTrees();
              treeNameById = trees.reduce<Record<number, string>>((acc, tree) => {
                acc[tree.id] = tree.name;
                return acc;
              }, {});
            } catch (error) {
              console.warn("コンテキスト情報の読み込みに失敗:", error);
            }
          }
          if (Object.keys(treeNameById).length > 0) {
            resolvedLeaves = loadedLeaves.map((leaf) => {
              const treeName = leaf.treeName ?? treeNameById[leaf.treeId];
              return treeName ? { ...leaf, treeName } : leaf;
            });
          }
        }

        if (isActive) {
          setLeaves(resolvedLeaves);
        }
      } catch (error) {
        console.warn("葉の読み込みに失敗:", error);
        if (isActive) {
          setLeaves([]);
        }
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
  }, []);

  return { isLoading, leaves };
};
