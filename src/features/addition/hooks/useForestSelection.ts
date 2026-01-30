import { useCallback, useEffect, useMemo, useState } from "react";

import { type ForestOption, loadUserForests } from "@/application/structure/usecases";

export const useForestSelection = () => {
  const [forests, setForests] = useState<ForestOption[]>([]);
  const [selectedForestId, setSelectedForestId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await loadUserForests();
      setForests(data);
      if (data.length > 0) {
        setSelectedForestId((current) => current ?? data[0].id);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selectedForest = useMemo(
    () => forests.find((forest) => forest.id === selectedForestId) || null,
    [forests, selectedForestId],
  );

  const openPicker = () => setIsPickerOpen(true);
  const closePicker = () => setIsPickerOpen(false);
  const selectForest = (forestId: number) => {
    setSelectedForestId(forestId);
    closePicker();
  };

  return {
    forests,
    selectedForest,
    selectedForestId,
    isLoading,
    isPickerOpen,
    openPicker,
    closePicker,
    selectForest,
    reload: load,
  };
};
