import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { BackTitle } from '@/components/BackTitle';
import { WoodenButton } from '@/components/Buttons/WoodenButton';
import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { Header } from '@/components/Header';
import { useAddForest } from '@/features/forestSelection/hooks/useAddForest';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { styles } from './styles';

type AddForestContainerProps = {
  onPressProfile: () => void;
  onPressSettings: () => void;
};

export default function AddForestContainer({
  onPressProfile,
  onPressSettings,
}: AddForestContainerProps) {
  const [forestName, setForestName] = useState('');
  const { user, isLoading: userLoading } = useCurrentUser();
  const { handleCreateForest, isLoading: creatingForest } = useAddForest();

  const isLoading = userLoading || creatingForest;

  const handleCreate = async () => {
    if (!forestName.trim()) {
      return;
    }
    await handleCreateForest(forestName);
  };

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <Header
          name={user?.name || 'ユーザー'}
          userId={user?.user_handle || ''}
          avatarSource={
            user?.avatar_url
              ? { uri: user.avatar_url }
              : require('@/../assets/logo.png')
          }
          onPressProfile={onPressProfile}
          onPressSetting={onPressSettings}
          style={styles.topHeader}
        />

        <View style={styles.content}>
          <BackTitle title="森を追加" style={styles.backTitle} />

          <View style={styles.forestImageContainer}>
            <View style={styles.forestImage}>
              {/* 森のアイコン/画像 */}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>森の名前を入力</Text>
            <TextInput
              style={styles.textInput}
              placeholder="森の名前"
              placeholderTextColor="#999"
              value={forestName}
              onChangeText={setForestName}
              editable={!isLoading}
            />
          </View>

          <View style={styles.buttonContainer}>
            <WoodenButton
              title="作成"
              onPress={handleCreate}
              disabled={isLoading || !forestName.trim()}
            />
          </View>
        </View>
      </View>
    </BackgroundContainer>
  );
}
