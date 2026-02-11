import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { TreeCarousel } from "@/features/selection/components/TreeCarousel";
import type { Tree } from "@/features/selection/types";
import { StatusBar } from "expo-status-bar";
import type { ImageSourcePropType } from "react-native";
import { Text, View } from "react-native";
import { styles } from "./styles";

type TreeSelectionContainerProps = {
  userName: string;
  userId: string;
  avatarSource?: ImageSourcePropType;
  trees: Tree[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onConfirm: () => void;
  onBack: () => void;
  isLoading?: boolean;
  canConfirm?: boolean;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

const TreeSelectionContainer = ({
  userName,
  userId,
  avatarSource,
  trees,
  currentIndex,
  onPrevious,
  onNext,
  onConfirm,
  onBack,
  isLoading = false,
  canConfirm = true,
  onPressProfile,
  onPressSettings,
}: TreeSelectionContainerProps) => {
  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <Header
          name={userName}
          userId={userId}
          avatarSource={avatarSource ?? require("@/../assets/logo.png")}
          onPressProfile={onPressProfile}
          onPressSetting={onPressSettings}
        />

        <View style={styles.content}>
          <BackTitle title="森一覧" onPress={onBack} style={styles.backTitle} />
          <Text style={styles.title}>{trees[currentIndex]?.name ?? "木"}</Text>

          <TreeCarousel
            trees={trees}
            currentIndex={currentIndex}
            onPrevious={onPrevious}
            onNext={onNext}
          />

          {isLoading ? (
            <Text style={styles.emptyText}>読み込み中...</Text>
          ) : trees.length === 0 ? (
            <Text style={styles.emptyText}>選択できる木がありません</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <WoodenButton title="決定" onPress={onConfirm} disabled={!canConfirm} />
          </View>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default TreeSelectionContainer;
