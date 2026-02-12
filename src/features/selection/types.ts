import type { ImageSourcePropType } from "react-native";

export type Forest = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  nameplate?: ImageSourcePropType;
};

export type Tree = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  nameplate?: ImageSourcePropType;
  leafCount?: number;
};

export type ForestCarouselState = {
  selectedForestId: number | null;
  currentIndex: number;
};

export type TreeCarouselState = {
  selectedTreeId: number | null;
  currentIndex: number;
};

export type ForestSelectionProps = {
  userName: string;
  userId: string;
  onForestSelect: (forestId: number) => void;
};
