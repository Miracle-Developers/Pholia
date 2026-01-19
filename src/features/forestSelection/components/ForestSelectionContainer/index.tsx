import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageSourcePropType, Text, View } from 'react-native';

import { WoodenButton } from '@/components/Buttons/WoodenButton';
import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { Header } from '@/components/Header';
import { ForestCarousel } from '@/features/forestSelection/components/ForestCarousel';
import { useForestCarousel } from '@/features/forestSelection/hooks/useForestCarousel';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouterNavigation } from '@/hooks/useRouter';
import { getForests } from '@/infrastructure/api';
import * as auth from '@/infrastructure/auth';
import { styles } from './styles';

type ForestSelectionContainerProps = {
  onConfirm: (forestId: number) => void;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

export default function ForestSelectionContainer({
  onConfirm,
  onPressProfile,
  onPressSettings,
}: ForestSelectionContainerProps) {
  const [apiForests, setApiForests] = useState([] as Array<{
    id: number;
    name: string;
    image: ImageSourcePropType;
  }>);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: userLoading } = useCurrentUser();

  const FOREST_IMAGES: ImageSourcePropType[] = [
    require('@/../assets/forest1.png'),
    require('@/../assets/forest2.png'),
    require('@/../assets/forest3.png'),
  ];

  const { goToAddForest } = useRouterNavigation();

  useEffect(() => {
    const loadForests = async () => {
      try {
        setIsLoading(true);
        const currentUserId = auth.getUserId();
        if (!currentUserId) {
          console.error('User ID not found');
          return;
        }
        const forests = await getForests(currentUserId);
        if (forests && forests.length > 0) {
          const mappedForests = forests.map((forest, index) => ({
            id: forest.id,
            name: forest.name,
            image: FOREST_IMAGES[index % FOREST_IMAGES.length],
          }));
          setApiForests(mappedForests);
        }
      } catch (error) {
        console.error('Failed to load forests:', error);
        // フォールバック: デフォルトのFORESTSを使用
      } finally {
        setIsLoading(false);
      }
    };

    loadForests();
  }, []);

  const { selectedForestId, currentIndex, handlePrevious, handleNext } = 
    useForestCarousel(apiForests);

  const hasForests = apiForests.length > 0;

  const handleConfirm = () => {
    if (hasForests && selectedForestId !== null) {
      onConfirm(selectedForestId as number);
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

        <View style={styles.content}>
          <Text style={styles.title}>
            {apiForests[currentIndex]?.name || `森を選択`}
          </Text>
          
          <ForestCarousel
            forests={apiForests}
            currentIndex={currentIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
            disabled={!hasForests}
          />
          
          <View style={styles.buttonContainer}>
            <WoodenButton
              title="決定"
              onPress={handleConfirm}
              disabled={isLoading || userLoading || !hasForests}
            />
            <WoodenButton
              title="+ 森を追加"
              onPress={goToAddForest}
              disabled={isLoading || userLoading}
              style={styles.addButton}
            />
          </View>
        </View>
      </View>
    </BackgroundContainer>
  );
}
