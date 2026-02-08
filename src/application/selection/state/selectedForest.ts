let selectedForestId: number | null = null;

export const setSelectedForestId = (forestId: number | null) => {
  selectedForestId = forestId;
};

export const getSelectedForestId = () => {
  return selectedForestId;
};

export const clearSelectedForestId = () => {
  selectedForestId = null;
};
