import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";

import type { Tree } from "@/features/selection/types";
import { styles } from "./styles";

type TreeCarouselProps = {
  trees: Tree[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const TreeCarousel = ({ trees, currentIndex, onPrevious, onNext }: TreeCarouselProps) => {
  const hasTrees = trees.length > 0;
  const tree = hasTrees ? trees[currentIndex] : null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.arrowButton} disabled={!hasTrees}>
        <Ionicons name="chevron-back" size={40} color="#5D3A1A" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNext}
        style={styles.treeContainer}
        activeOpacity={0.85}
        disabled={!hasTrees}
      >
        <Image
          source={tree?.image ?? require("@/../assets/tree1.png")}
          style={styles.treeImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext} style={styles.arrowButton} disabled={!hasTrees}>
        <Ionicons name="chevron-forward" size={40} color="#5D3A1A" />
      </TouchableOpacity>
    </View>
  );
};
