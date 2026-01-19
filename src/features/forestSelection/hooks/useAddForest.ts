import { useRouterNavigation } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import * as api from '@/infrastructure/api';
import * as auth from '@/infrastructure/auth';
import { useCallback, useState } from 'react';

export const useAddForest = () => {
  const { goToForestSelection } = useRouterNavigation();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateForest = useCallback(
    async (forestName: string) => {
      try {
        setIsLoading(true);
        const userId = auth.getUserId();
        if (!userId) {
          showToast({ title: 'ユーザー情報が見つかりません' });
          return;
        }

        // 新しい森を作成するためのAPI呼び出し
        await api.createForest(userId, forestName);

        showToast({ title: '森を作成しました' });
        goToForestSelection();
      } catch (error: any) {
        console.error('Failed to create forest:', error);
        showToast({
          title: '森の作成に失敗しました',
          message: error?.message || String(error),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [goToForestSelection, showToast]
  );

  return {
    handleCreateForest,
    isLoading,
  };
};
