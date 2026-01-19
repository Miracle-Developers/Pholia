import type { ImageSourcePropType } from 'react-native';

export type Forest = {
  id: number;
  name: string;
  image: ImageSourcePropType;
};

export type ForestSelectionProps = {
  userName: string;
  userId: string;
  onForestSelect: (forestId: number) => void;
};
