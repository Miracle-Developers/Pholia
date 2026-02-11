import { MaterialIcons } from "@expo/vector-icons";
import type { ImagePickerAsset } from "expo-image-picker";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

type PhotosModalProps = {
    visible: boolean;
    photos: ImagePickerAsset[];
    onClose: () => void;
};

export const PhotosModal = ({ visible, photos, onClose }: PhotosModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>選択した写真 ({photos.length}枚)</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#7A4B2A" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.grid}>
                            {photos.map((photo, index) => (
                                <View key={photo.uri + index} style={styles.photoWrapper}>
                                    <Image source={{ uri: photo.uri }} style={styles.photo} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};
