import { useEffect, useState } from "react";

import { loadForest } from "@/application/forests/usecases/loadForest";
import { loadTree } from "@/application/trees/usecases/loadTree";
import { loadTreeMembers, type TreeMember } from "@/application/trees/usecases/loadTreeMembers";
import { loadUserForests } from "@/application/structure/usecases/loadUserForests";

export type TreeDetailData = {
  id: number;
  name?: string;
  forestId?: number;
  imageUrl?: string;
  createdAt?: string;
  forestName?: string;
  members?: TreeMember[];
};

export const useLoadTreeDetail = (treeId?: number | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [treeDetail, setTreeDetail] = useState<TreeDetailData | null>(null);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      if (!treeId || !Number.isFinite(treeId)) {
        if (isActive) {
          setTreeDetail(null);
          setIsLoading(false);
        }
        return;
      }
      setIsLoading(true);
      try {
        const tree = await loadTree(treeId);
        if (!isActive) return;

        const forestId = tree.forest_id ?? tree.forests?.[0]?.id ?? undefined;
        let forestName: string | undefined;
        if (forestId) {
          try {
            const forest = await loadForest(forestId);
            forestName = forest.name;
          } catch {
            forestName = undefined;
          }
        }
        if (!forestName && forestId) {
          try {
            const forests = await loadUserForests();
            forestName = forests.find((forest) => forest.id === forestId)?.name;
          } catch {
            forestName = undefined;
          }
        }

        let members: TreeMember[] = [];
        try {
          members = await loadTreeMembers(treeId);
        } catch {
          members = [];
        }
        if (!isActive) return;

        setTreeDetail({
          id: tree.id,
          name: tree.name,
          forestId,
          imageUrl: tree.cover_image_url,
          createdAt: tree.created_at,
          forestName,
          members,
        });
      } catch {
        if (isActive) {
          setTreeDetail(null);
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
  }, [treeId]);

  return { isLoading, treeDetail };
};
