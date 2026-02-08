import { useEffect, useState } from "react";
import type { LeafData } from "@/application/leaves/types";
import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { loadLeavesFromStructure } from "@/application/leaves/usecases";
import { loadUserTrees } from "@/application/structure/usecases/loadUserTrees";

export const useLoadLeaves = (leafIds: number[]) => {
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
        const selectedTree = getSelectedTree();
        if (!selectedTree) {
          if (isActive) {
            setLeavesById({});
            setIsLoading(false);
          }
          return;
        }
        const leaves = await loadLeavesFromStructure(selectedTree.id);
        if (!isActive) return;
        let resolvedLeaves = leaves;
        if (leaves.some((leaf) => !leaf.treeName)) {
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
              console.warn("木の読み込みに失敗:", error);
            }
          }
          if (Object.keys(treeNameById).length > 0) {
            resolvedLeaves = leaves.map((leaf) => {
              const treeName = leaf.treeName ?? treeNameById[leaf.treeId];
              return treeName ? { ...leaf, treeName } : leaf;
            });
          }
        }
        const limited = resolvedLeaves.slice(0, leafIds.length);
        const map = leafIds.reduce<Record<number, LeafData>>((acc, leafId, index) => {
          const leaf = limited[index];
          if (leaf) {
            acc[leafId] = leaf;
          }
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
};
