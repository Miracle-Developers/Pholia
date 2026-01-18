import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { styles } from "@/features/list/components/ListContainer/styles";
import { leafItems } from "@/utils/leafItems";

export const ListContainer = () => {
  const [selectedLeafId, setSelectedLeafId] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={28} color="#6C4A2C" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>森一覧</Text>
          <View style={styles.headerUnderline} />
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
