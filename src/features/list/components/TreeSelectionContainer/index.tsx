import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { BackTitle } from '@/components/BackTitle';
import { WoodenButton } from '@/components/Buttons/WoodenButton';
import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { Header } from '@/components/Header';
import { TreeCarousel } from '@/features/list/components/TreeCarousel';
import { useTreeCarousel } from '@/features/list/hooks/useTreeCarousel';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouterNavigation } from '@/hooks/useRouter';
import { getTreesForForest } from '@/infrastructure/api';
import * as auth from '@/infrastructure/auth';
import { styles } from './styles';

type Tree = {
  id: number;
  name: string;
};

type TreeSelectionContainerProps = {
  onConfirm: (treeId: number) => void;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

export default function TreeSelectionContainer({
  onConfirm,
  onPressProfile,
  onPressSettings,
}: TreeSelectionContainerProps) {
  const [apiTrees, setApiTrees] = useState<Tree[]>([]);
  const [selectedForestId, setSelectedForestId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: userLoading } = useCurrentUser();

  const { goToAddTree, goToForestSelection } = useRouterNavigation();

  // フォレストIDを取得
  useEffect(() => {
    const getSelectedForestId = async () => {
      try {
        const forestIdStr = await SecureStore.getItemAsync('selectedForestId');
        if (forestIdStr) {
          setSelectedForestId(Number(forestIdStr));
        }
      } catch (error) {
        console.error('Failed to get selected forest ID:', error);
      }
    };
    getSelectedForestId();
  }, []);

  // 選択されたフォレストから木を取得
  useEffect(() => {
    const loadTrees = async () => {
      if (!selectedForestId) return;
      try {
        setIsLoading(true);
        const currentUserId = auth.getUserId();
        if (!currentUserId) {
          console.error('User ID not found');
          return;
        }
        const response = await getTreesForForest(currentUserId, selectedForestId);
        if (response?.trees && Array.isArray(response.trees)) {
          setApiTrees(response.trees);
        }
      } catch (error) {
        console.error('Failed to load trees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrees();
  }, [selectedForestId]);

  const { selectedTreeId, currentIndex, handlePrevious, handleNext } = 
    useTreeCarousel(apiTrees);

  const hasTrees = apiTrees.length > 0;

  const handleConfirm = () => {
    if (hasTrees && selectedTreeId !== null) {
      onConfirm(selectedTreeId);
    }
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
        />

        <BackTitle 
          title="森を選択"
          style={styles.backTitle}
          onPress={goToForestSelection}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.contentTop}>
            <Text style={styles.title}>
              {apiTrees[currentIndex]?.name || `木を選択`}
            </Text>
            
            <TreeCarousel
              trees={apiTrees}
              currentIndex={currentIndex}
              onPrevious={handlePrevious}
              onNext={handleNext}
              disabled={!hasTrees}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <WoodenButton
              title="決定"
              onPress={handleConfirm}
              disabled={isLoading || userLoading || !hasTrees}
            />
            <WoodenButton
              title="+ 木を追加"
              onPress={goToAddTree}
              disabled={isLoading || userLoading}
              style={styles.addButton}
            />
          </View>
        </ScrollView>
      </View>
    </BackgroundContainer>
  );
}
