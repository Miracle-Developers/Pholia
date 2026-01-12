import { useRouter } from 'expo-router';

import ForestSelectionContainer from '@/features/forestSelection/components/ForestSelectionContainer';

export default function ForestSelectionPage() {
  const router = useRouter();

  const handleConfirm = (forestId: number) => {
    console.log('Selected forest:', forestId);
    // TODO: Navigate to tree selection page
    // router.push('/tree-selection');
  };

  return <ForestSelectionContainer onConfirm={handleConfirm} />;
}
