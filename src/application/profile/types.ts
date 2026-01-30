export type UserProfile = {
  id: number;
  name: string;
  userId: string;
  email: string;
  avatarFileKey: string | null;
  joinDate?: string;
  forestCount?: number;
  treeCount?: number;
};

export type UserProfileData = {
  id: number;
  name: string;
  userId: string;
  email: string;
  joinDate: string;
  forestCount: number;
  treeCount: number;
  avatarFileKey: string | null;
};

export type EditAvatarModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  userId: string;
};
