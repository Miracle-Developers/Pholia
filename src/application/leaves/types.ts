export type LeafData = {
  id: number;
  treeId: number;
  treeName?: string;
  uploaderId: number;
  fileKey: string;
  caption: string;
  takenAt: string;
  createdAt: string;
  imageUrl: string | null;
  locationText?: string;
};
