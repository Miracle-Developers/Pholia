import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { Header } from "@/components/Header";
import { styles } from "@/features/list/components/ListContainer/styles";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouterNavigation } from "@/hooks/useRouter";
import { getLeavesForTree, getTreesForForest } from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";
import { getApiBaseUrl } from "@/utils/apiBaseUrl";

type Tree = {
  id: number;
  name: string;
};

type Leaf = {
  id: number;
  tree_id: number;
  r2_url?: string;
};

export const ListContainer = () => {
  const { user, isLoading: userLoading } = useCurrentUser();
  const { goToTreeSelection, goToProfile, goToSetting } = useRouterNavigation();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedForestId, setSelectedForestId] = useState<number | null>(null);
  const [selectedTreeId, setSelectedTreeId] = useState<number | null>(null);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [selectedLeafId, setSelectedLeafId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedImageUrl, setExpandedImageUrl] = useState<string | null>(null);

  // フォレストIDと木IDを取得
  useEffect(() => {
    const getSelectedIds = async () => {
      try {
        const forestIdStr = await SecureStore.getItemAsync('selectedForestId');
        const treeIdStr = await SecureStore.getItemAsync('selectedTreeId');
        if (forestIdStr) {
          setSelectedForestId(Number(forestIdStr));
        }
        if (treeIdStr) {
          setSelectedTreeId(Number(treeIdStr));
        }
      } catch (error) {
        console.error("Failed to get selected IDs:", error);
      }
    };
    getSelectedIds();
  }, []);

  // 選択されたフォレストから木を取得
  useEffect(() => {
    const loadTrees = async () => {
      if (!selectedForestId) return;
      try {
        setIsLoading(true);
        const userId = auth.getUserId();
        if (!userId) {
          console.error("User ID not found");
          return;
        }
        const response = await getTreesForForest(userId, selectedForestId);
        if (response?.trees && Array.isArray(response.trees)) {
          setTrees(response.trees);
        }
      } catch (error) {
        console.error("Failed to load trees:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTrees();
  }, [selectedForestId]);

  // 選択された木から葉を取得
  useEffect(() => {
    const loadLeaves = async () => {
      const treeIdToUse = selectedTreeId || trees[0]?.id;
      if (!treeIdToUse) {
        console.log('No tree ID to load leaves');
        return;
      }
      try {
        const userId = auth.getUserId();
        if (!userId) {
          console.error("User ID not found");
          return;
        }
        console.log('Loading leaves for treeId:', treeIdToUse, 'userId:', userId);
        const response = await getLeavesForTree(userId, treeIdToUse);
        console.log('getLeavesForTree response:', response);
        if (response?.leaves && Array.isArray(response.leaves)) {
          const baseUrl = getApiBaseUrl();
          const leavesWithFullUrls = response.leaves.map((leaf: any) => ({
            ...leaf,
            r2_url: leaf.r2_url ? `${baseUrl}${leaf.r2_url}` : undefined,
            avatar_url: leaf.avatar_url ? `${baseUrl}${leaf.avatar_url}` : undefined,
          }));
          console.log('Setting leaves:', leavesWithFullUrls);
          setLeaves(leavesWithFullUrls);
        } else {
          console.warn('No leaves in response or invalid structure:', response);
        }
      } catch (error) {
        console.error("Failed to load leaves:", error);
      }
    };
    loadLeaves();
  }, [selectedTreeId, trees]);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header
        name={user?.name || "ユーザー"}
        userId={user?.user_handle || ""}
        avatarSource={
          user?.avatar_url
            ? { uri: user.avatar_url }
            : require("@/../assets/logo.png")
        }
        onPressProfile={goToProfile}
        onPressSetting={goToSetting}
        style={styles.topHeader}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BackTitle 
          title="写真一覧" 
          style={styles.backTitle}
          onPress={goToTreeSelection}
        />
        <View style={styles.contentTop}>
          <View style={styles.nameplateWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>
                {selectedTreeId 
                  ? trees.find(t => t.id === selectedTreeId)?.name || "○○の木"
                  : trees[0]?.name || "○○の木"}
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.leafGrid}>
            {leaves.map((leaf) => {
              const isSelected = leaf.id === selectedLeafId;

              return (
                <TouchableOpacity
                  key={leaf.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedLeafId(leaf.id)}
                  style={[styles.leafItem, isSelected && styles.leafItemSelected]}
                >
                  <View style={styles.leafImageWrapper}>
                    <Image
                      source={require("@/../assets/leaf.png")}
                      style={styles.leafImage}
                      resizeMode="contain"
                    />
                    {leaf.r2_url ? (
                      <TouchableOpacity 
                        style={styles.leafPhotoWrapper}
                        onPress={() => setExpandedImageUrl(leaf.r2_url || null)}
                        activeOpacity={0.8}
                      >
                        <Image source={{ uri: leaf.r2_url }} style={styles.leafPhoto} />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* 画像拡大表示モーダル */}
      <Modal
        visible={expandedImageUrl !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setExpandedImageUrl(null)}
      >
        <View style={styles.expandedImageContainer}>
          <TouchableOpacity
            style={styles.expandedImageBackground}
            activeOpacity={1}
            onPress={() => setExpandedImageUrl(null)}
          >
            {expandedImageUrl ? (
              <Image
                source={{ uri: expandedImageUrl }}
                style={styles.expandedImage}
                resizeMode="contain"
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
