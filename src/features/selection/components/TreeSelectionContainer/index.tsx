import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { WoodenButton } from '@/components/Buttons/WoodenButton';
import { Header } from '@/components/Header';
import { TreeCarousel } from '@/features/selection/components/TreeCarousel';
import { useTreeCarousel } from '@/features/selection/hooks/useTreeCarousel';
import { TREES } from '@/features/selection/constants/trees';
import { styles } from './styles';

type TreeSelectionContainerProps = {
  userName?: string;
  userId?: string;
  onConfirm: (treeId: number) => void;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

const TreeSelectionContainer = ({
  userName = 'ぽっぽ',
  userId = 'poppo',
  onConfirm,
  onPressProfile,
  onPressSettings,
}: TreeSelectionContainerProps) => {
  const { selectedTreeId, currentIndex, handlePrevious, handleNext } = 
    useTreeCarousel(TREES, 1);

  const handleConfirm = () => {
    onConfirm(selectedTreeId);
  };

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        
        <Header
          name={userName}
          userId={userId}
          avatarSource={require('@/../assets/logo.png')}
          onPressProfile={onPressProfile}
          onPressSetting={onPressSettings}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{userName}の木</Text>
          
          <TreeCarousel
            trees={TREES}
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
};

export default TreeSelectionContainer;
