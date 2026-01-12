import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { WoodenButton } from '@/components/Buttons/WoodenButton';
import { ForestSelectionHeader } from '@/features/forestSelection/components/ForestSelectionHeader';
import { ForestCarousel } from '@/features/forestSelection/components/ForestCarousel';
import type { Forest } from '@/features/forestSelection/types';

// Mock data - 3 forests
const FORESTS: Forest[] = [
  {
    id: 1,
    name: '森1',
    image: require('@/../assets/forest1.png'),
  },
  {
    id: 2,
    name: '森2',
    image: require('@/../assets/forest2.png'),
  },
  {
    id: 3,
    name: '森3',
    image: require('@/../assets/forest3.png'),
  },
];

type ForestSelectionContainerProps = {
  userName?: string;
  userId?: string;
  onConfirm: (forestId: number) => void;
  onPressProfile?: () => void;
  onPressSettings?: () => void;
};

export default function ForestSelectionContainer({
  userName = 'ぽっぽ',
  userId = 'poppo',
  onConfirm,
  onPressProfile = () => console.log('Profile pressed'),
  onPressSettings = () => console.log('Settings pressed'),
}: ForestSelectionContainerProps) {
  const [selectedForestId, setSelectedForestId] = useState(1);

  const handleConfirm = () => {
    onConfirm(selectedForestId);
  };

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        
        <ForestSelectionHeader
          userName={userName}
          userId={userId}
          onPressProfile={onPressProfile}
          onPressSettings={onPressSettings}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{userName}の森</Text>
          
          <ForestCarousel
            forests={FORESTS}
            selectedForestId={selectedForestId}
            onSelectForest={setSelectedForestId}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#5D3A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});
