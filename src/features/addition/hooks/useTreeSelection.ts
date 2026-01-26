import { useCallback, useEffect, useMemo, useState } from "react";

import { loadUserStructure, type TreeOption } from "@/application/structure/usecases";

export function useTreeSelection() {
  const [trees, setTrees] = useState<TreeOption[]>([]);
  const [selectedTreeId, setSelectedTreeId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await loadUserStructure();
      setTrees(data);
      if (data.length > 0) {
        setSelectedTreeId((current) => current ?? data[0].id);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selectedTree = useMemo(
    () => trees.find((tree) => tree.id === selectedTreeId) || null,
    [selectedTreeId, trees],
  );

  const openPicker = () => setIsPickerOpen(true);
  const closePicker = () => setIsPickerOpen(false);
  const selectTree = (treeId: number) => {
    setSelectedTreeId(treeId);
    closePicker();
  };

  return {
    trees,
    selectedTree,
    selectedTreeId,
    isLoading,
    isPickerOpen,
    openPicker,
    closePicker,
    selectTree,
    reload: load,
  };
}
