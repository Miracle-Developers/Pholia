import { useRouterNavigation } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import * as api from '@/infrastructure/api';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from 'react';

export const useAddTree = () => {
  const { goToTreeSelection } = useRouterNavigation();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTree = useCallback(
    async (treeName: string) => {
      try {
        setIsLoading(true);
        
        // 選択されたフォレストIDを取得
        const forestIdStr = await SecureStore.getItemAsync('selectedForestId');
        if (!forestIdStr) {
          showToast({ title: 'フォレスト情報が見つかりません' });
          return;
        }
        const forestId = Number(forestIdStr);

        // 新しい木を作成するためのAPI呼び出し
        await api.createTree(forestId, treeName);

        showToast({ title: '木を作成しました' });
        goToTreeSelection();
      } catch (error: any) {
        console.error('Failed to create tree:', error);
        showToast({
          title: '木の作成に失敗しました',
          message: error?.message || String(error),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [goToTreeSelection, showToast]
  );

  return {
    handleCreateTree,
    isLoading,
  };
};
