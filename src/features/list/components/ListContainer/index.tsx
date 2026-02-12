import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { Header } from "@/components/Header";
import { styles } from "@/features/list/components/ListContainer/styles";
import { useLeafPager } from "@/features/list/hooks/useLeafPager";
import { useLoadLeaves } from "@/features/list/hooks/useLoadLeaves";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";

export const ListContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToLeafAddition, goToLeafDetail, goToProfile, goToSetting, goToTreeDetail } =
    useRouterNavigation();
  const { leaves } = useLoadLeaves();
  const selectedTree = getSelectedTree();
  const {
    pages,
    currentPage,
    totalPages,
    selectedLeaf,
    selectedLeafId,
    pageWidth,
    onMomentumScrollEnd,
    onSelectLeaf,
  } = useLeafPager(leaves);
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

      <View style={styles.content}>
        <BackTitle title="戻る" style={styles.backTitle} onPress={() => goToTreeDetail(selectedTree?.id)} />
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

          <View style={styles.pagerArea}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={{ width: pageWidth }}
              onMomentumScrollEnd={onMomentumScrollEnd}
            >
              {pages.map((page) => (
                <View key={page.key} style={[styles.leafGrid, { width: pageWidth }]}>
                  {page.slots.map((slot) => {
                    const leaf = slot.leaf;
                    if (!leaf) {
                      return <View key={slot.key} style={styles.leafItem} />;
                    }
                    const isSelected = leaf.id === selectedLeafId;
                    return (
                      <TouchableOpacity
                        key={slot.key}
                        activeOpacity={0.85}
                        onPress={() => onSelectLeaf(leaf.id)}
                        style={[styles.leafItem, isSelected && styles.leafItemSelected]}
                      >
                        <View style={styles.leafImageWrapper}>
                          <Image
                            source={require("@/../assets/leaf.png")}
                            style={styles.leafImage}
                            resizeMode="contain"
                          />
                          {leaf.imageUrl ? (
                            <View style={styles.leafPhotoWrapper}>
                              <Image source={{ uri: leaf.imageUrl }} style={styles.leafPhoto} />
                            </View>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.pagerText}>{`${currentPage + 1}/${totalPages}`}</Text>
          <View style={styles.swipeHint}>
            <MaterialIcons name="chevron-left" size={24} color="#B79066" />
            <Text style={styles.swipeHintText}>横にスワイプ</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B79066" />
          </View>
        </View>

        <WoodenButton
          title={selectedLeafId ? "決定" : "葉の追加"}
          onPress={
            selectedLeaf ? () => goToLeafDetail(selectedLeaf.id) : goToLeafAddition
          }
          style={styles.confirmButton}
        />
      </View>
    </View>
  );
};
