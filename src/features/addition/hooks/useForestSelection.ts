import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type ForestOption, loadUserForests } from "@/application/structure/usecases";

export const useForestSelection = () => {
  const params = useLocalSearchParams<{ forestId?: string }>();
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
        const initialId = params.forestId ? Number(params.forestId) : undefined;
        const target =
          initialId && data.some((f) => f.id === initialId) ? initialId : data[0].id;
        setSelectedForestId((current) => current ?? target);
      }
    } finally {
      setIsLoading(false);
    }
  }, [params.forestId]);

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
