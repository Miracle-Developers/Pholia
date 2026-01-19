import { getUser } from '@/infrastructure/api';
import * as auth from '@/infrastructure/auth';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
import { useEffect, useState } from 'react';

export type UserInfo = {
  id: number;
  name: string;
  user_handle: string;
  email: string;
  avatarFileKey: string | null;
  avatar_url?: string; // getAvatarUrl()で取得したURL（完全なURL）
  created_at: string;
};

export const useCurrentUser = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        setIsLoading(true);
        const userId = auth.getUserId();
        if (!userId) {
          setError('User ID not found');
          return;
        }

        const userData = await getUser(userId);
        if (userData) {
          const data = userData as Record<string, any>;
          let avatarUrl: string | undefined;
          if (data?.avatar_url) {
            // avatar_urlが相対パスの場合、完全なURLに変換
            if (data.avatar_url.startsWith('/')) {
              const baseUrl = getApiBaseUrl();
              avatarUrl = `${baseUrl}${data.avatar_url}`;
            } else {
              avatarUrl = data.avatar_url;
            }
          }
          
          setUser({
            ...data,
            avatarFileKey: data?.avatar_url || null,
            avatar_url: avatarUrl,
          } as UserInfo);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load current user:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  return { user, isLoading, error };
};
