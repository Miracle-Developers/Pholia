import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";

import type { Forest } from "@/features/selection/types";
import { styles } from "./styles";

type ForestCarouselProps = {
  forests: Forest[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const ForestCarousel = ({
  forests,
  currentIndex,
  onPrevious,
  onNext,
}: ForestCarouselProps) => {
  const hasForests = forests.length > 0;
  const forest = hasForests ? forests[currentIndex] : null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.arrowButton} disabled={!hasForests}>
        <Ionicons name="chevron-back" size={40} color="#5D3A1A" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNext}
        style={styles.forestContainer}
        activeOpacity={0.85}
        disabled={!hasForests}
      >
        <Image
          source={forest?.image ?? require("@/../assets/forest1.png")}
          style={styles.forestImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext} style={styles.arrowButton} disabled={!hasForests}>
        <Ionicons name="chevron-forward" size={40} color="#5D3A1A" />
      </TouchableOpacity>
    </View>
  );
};
