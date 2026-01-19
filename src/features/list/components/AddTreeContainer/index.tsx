import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';

import { BackTitle } from '@/components/BackTitle';
import { WoodenButton } from '@/components/Buttons/WoodenButton';
import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { Header } from '@/components/Header';
import { useAddTree } from '@/features/list/hooks/useAddTree';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { styles } from './styles';

type AddTreeContainerProps = {
  onPressProfile: () => void;
  onPressSettings: () => void;
};

export default function AddTreeContainer({
  onPressProfile,
  onPressSettings,
}: AddTreeContainerProps) {
  const [treeName, setTreeName] = useState('');
  const { user, isLoading: userLoading } = useCurrentUser();
  const { handleCreateTree, isLoading: creatingTree } = useAddTree();

  const isLoading = userLoading || creatingTree;

  const handleCreate = async () => {
    if (!treeName.trim()) {
      console.warn('Tree name is empty');
      return;
    }
    console.log('Creating tree with name:', treeName);
    await handleCreateTree(treeName);
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

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <BackTitle title="新規木作成" style={styles.backTitle} />

          <View style={styles.treeImageContainer}>
            <Image
              source={require('@/../assets/tree1.png')}
              style={styles.treeImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formSection}>
              <Text style={styles.sectionIcon}>🍂</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionLabel}>木の名前を入力</Text>
              </View>
              <Text style={styles.sectionButton}>✏️</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="木の名前"
              placeholderTextColor="#999"
              value={treeName}
              onChangeText={setTreeName}
              editable={!isLoading}
            />

            <View style={styles.divider} />

            <View style={styles.formSection}>
              <Text style={styles.sectionIcon}>👤</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionLabel}>@aaa  @bbb  @ccc</Text>
              </View>
              <Text style={styles.sectionButton}>＋</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <WoodenButton
            title="作成"
            onPress={handleCreate}
            disabled={isLoading || !treeName.trim()}
          />
        </View>
      </View>
    </BackgroundContainer>
  );
}
