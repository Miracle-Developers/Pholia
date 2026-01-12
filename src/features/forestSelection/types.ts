export type Forest = {
  id: number;
  name: string;
  image: any; // require() image
};

export type ForestSelectionProps = {
  userName: string;
  userId: string;
  onForestSelect: (forestId: number) => void;
};
