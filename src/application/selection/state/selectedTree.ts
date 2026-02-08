type SelectedTree = {
  id: number;
  name?: string;
};

let selectedTree: SelectedTree | null = null;

export const setSelectedTree = (tree: SelectedTree | null) => {
  selectedTree = tree;
};

export const getSelectedTree = () => {
  return selectedTree;
};

export const clearSelectedTree = () => {
  selectedTree = null;
};
