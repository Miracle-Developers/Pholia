import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { Header } from "@/components/Header";
import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { styles } from "@/features/list/components/ListContainer/styles";
import { useLoadLeaves } from "@/features/list/hooks/useLoadLeaves";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { leafItems } from "@/utils/leafItems";

const leafIds = Array.from({ length: 9 }, (_, index) => index + 1);

export const ListContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToLeafAddition, goToLeafDetail, goToProfile, goToSetting, goToTreeAction } =
    useRouterNavigation();
  const [selectedLeafId, setSelectedLeafId] = useState<number | null>(null);
  const { leavesById } = useLoadLeaves(leafIds);
  const selectedTree = getSelectedTree();
  const selectedLeaf = selectedLeafId ? leavesById[selectedLeafId] : null;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header
        name={name}
        userId={userId}
        avatarSource={avatarSource}
        style={styles.topHeader}
        onPressProfile={goToProfile}
        onPressSetting={goToSetting}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BackTitle title="ホーム" style={styles.backTitle} onPress={goToTreeAction} />
        <View style={styles.contentTop}>
          <View style={styles.nameplateWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>
                {selectedTree?.name ? `${selectedTree.name}の木` : "○○の木"}
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.leafGrid}>
            {leafItems.map((leaf) => {
              const isSelected = leaf.leafId === selectedLeafId;
              const leafData = leavesById[leaf.leafId];

              return (
                <TouchableOpacity
                  key={leaf.id}
                  activeOpacity={0.85}
                  onPress={() =>
                    setSelectedLeafId((prev) => (prev === leaf.leafId ? null : leaf.leafId))
                  }
                  style={[styles.leafItem, isSelected && styles.leafItemSelected]}
                >
                  <View style={styles.leafImageWrapper}>
                    <Image
                      source={require("@/../assets/leaf.png")}
                      style={styles.leafImage}
                      resizeMode="contain"
                    />
                    {leafData?.imageUrl ? (
                      <View style={styles.leafPhotoWrapper}>
                        <Image source={{ uri: leafData.imageUrl }} style={styles.leafPhoto} />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <WoodenButton
          title={selectedLeaf ? "決定" : "葉の追加"}
          onPress={selectedLeaf ? () => goToLeafDetail(selectedLeaf.id) : goToLeafAddition}
          style={styles.confirmButton}
        />
      </ScrollView>
    </View>
  );
};
