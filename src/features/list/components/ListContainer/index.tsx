import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { BackTitle } from "@/components/BackTitle";
import { Header } from "@/components/Header";
import { styles } from "@/features/list/components/ListContainer/styles";
import { leafItems } from "@/utils/leafItems";

export const ListContainer = () => {
  const [selectedLeafId, setSelectedLeafId] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header
        name="ぽっぽ"
        userId="poppo"
        avatarSource={require("@/../assets/logo.png")}
        style={styles.topHeader}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BackTitle title="森一覧" style={styles.backTitle} />
        <View style={styles.contentTop}>
          <View style={styles.nameplateWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>○○の木</Text>
            </ImageBackground>
          </View>

          <View style={styles.leafGrid}>
            {leafItems.map((leaf) => {
              const isSelected = leaf.id === selectedLeafId;

              return (
                <TouchableOpacity
                  key={leaf.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedLeafId(leaf.id)}
                  style={[styles.leafItem, isSelected && styles.leafItemSelected]}
                >
                  <Image source={require("@/../assets/leaf.png")} style={styles.leafImage} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <WoodenButton title="決定" onPress={() => {}} style={styles.confirmButton} />
      </ScrollView>
    </View>
  );
};
