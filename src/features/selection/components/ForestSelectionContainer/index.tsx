import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { WoodenButton } from '@/components/Buttons/WoodenButton';
import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { Header } from '@/components/Header';
import { ForestCarousel } from '@/features/selection/components/ForestCarousel';
import { FORESTS } from '@/features/selection/constants/forests';
import { useForestCarousel } from '@/features/selection/hooks/useForestCarousel';
import { useHeaderProfile } from '@/hooks/useHeaderProfile';
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
  const { name, userId, avatarSource } = useHeaderProfile();
  const { selectedForestId, currentIndex, handlePrevious, handleNext } =
    useForestCarousel(FORESTS, 1);

  const handleConfirm = () => {
    onConfirm(selectedForestId);
  };

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <Header
          name={name}
          userId={userId}
          avatarSource={avatarSource}
          onPressProfile={onPressProfile}
          onPressSetting={onPressSettings}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{name}の森</Text>

          <ForestCarousel
            forests={FORESTS}
            currentIndex={currentIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          <View style={styles.buttonContainer}>
            <WoodenButton
              title="決定"
              onPress={handleConfirm}
            />
          </View>
        </View>
      </View>
    </BackgroundContainer>
  );
}
