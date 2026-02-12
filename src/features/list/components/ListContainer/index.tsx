import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { Header } from "@/components/Header";
import { styles } from "@/features/list/components/ListContainer/styles";
import { useLoadLeaves } from "@/features/list/hooks/useLoadLeaves";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";

const windowWidth = Dimensions.get("window").width;

const chunk = <T,>(array: T[], size: number): T[][] => {
  return array.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]),
    [] as T[][],
  );
};

const ListContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToLeafAddition, goToLeafDetail, goToProfile, goToSetting, goToTreeDetail } =
    useRouterNavigation();
  const { leaves } = useLoadLeaves();
  const selectedTree = getSelectedTree();
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

          <View style={{ height: 420 }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={{ width: windowWidth }}
            >
              {chunk(leaves, 9).map((pageLeaves, pageIndex) => {
                const filledPage = [...pageLeaves, ...Array(9 - pageLeaves.length).fill(null)];

                return (
                  <View key={pageIndex} style={[styles.leafGrid, { width: windowWidth }]}>
                    {filledPage.map((leaf, index) => {
                      if (!leaf) {
                        return <View key={`placeholder-${index}`} style={styles.leafItem} />;
                      }
                      return (
                        <TouchableOpacity
                          key={leaf.id}
                          activeOpacity={0.85}
                          onPress={() => {
                            goToLeafDetail(leaf.id);
                          }}
                          style={styles.leafItem}
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
                );
              })}
            </ScrollView>
          </View>
        </View>

        <WoodenButton
          title="葉の追加"
          onPress={goToLeafAddition}
          style={styles.confirmButton}
        />
      </ScrollView>
    </View>
  );
};

export { ListContainer };

