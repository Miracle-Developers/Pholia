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
};

export type ForestCarouselState = {
  selectedForestId: number;
  currentIndex: number;
};

export type TreeCarouselState = {
  selectedTreeId: number;
  currentIndex: number;
};

export type ForestSelectionProps = {
  userName: string;
  userId: string;
  onForestSelect: (forestId: number) => void;
};
