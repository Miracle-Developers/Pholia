import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { DeleteConfirmModal } from "@/components/Modals/DeleteConfirmModal";
import { ForestCarousel } from "@/features/selection/components/ForestCarousel";
import type { Forest } from "@/features/selection/types";
import { styles } from "./styles";

type ForestSelectionContainerProps = {
  userName: string;
  userId: string;
  avatarSource?: ImageSourcePropType;
  forests: Forest[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onConfirm: () => void;
  onDelete?: () => void;
  onBack: () => void;
  isLoading?: boolean;
  canConfirm?: boolean;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

const ForestSelectionContainer = ({
  userName,
  userId,
  avatarSource,
  forests,
  currentIndex,
  onPrevious,
  onNext,
  onConfirm,
  onDelete,
  onBack,
  isLoading = false,
  canConfirm = true,
  onPressProfile,
  onPressSettings,
}: ForestSelectionContainerProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
          <View style={styles.headerRow}>
            <BackTitle title="森のホームへ" onPress={onBack} style={styles.backTitle} />
            {canConfirm && onDelete && (
              <TouchableOpacity
                onPress={() => setIsDeleteModalOpen(true)}
                style={styles.deleteButton}
              >
                <MaterialIcons name="delete" size={24} color="#A46B3D" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.title}>{forests[currentIndex]?.name ?? "森"}</Text>

          <ForestCarousel
            forests={forests}
            currentIndex={currentIndex}
            onPrevious={onPrevious}
            onNext={onNext}
          />

          {isLoading ? (
            <Text style={styles.emptyText}>読み込み中...</Text>
          ) : forests.length === 0 ? (
            <Text style={styles.emptyText}>選択できる森がありません</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <WoodenButton title="決定" onPress={onConfirm} disabled={!canConfirm} />
          </View>
        </View>

        <DeleteConfirmModal
          visible={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            onDelete?.();
          }}
          title="森を削除しますか？"
          message="この操作は取り消せません。森を削除します。"
        />
      </View>
    </BackgroundContainer>
  );
};

export default ForestSelectionContainer;
