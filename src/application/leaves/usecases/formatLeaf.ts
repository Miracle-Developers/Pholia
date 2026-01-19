import type { ApiLeafResponse } from "@/infrastructure/api";
import type { LeafData } from "@/application/leaves/types";
import { getApiBaseUrl } from "@/utils/apiBaseUrl";

const FILE_BASE_URL = getApiBaseUrl();

const resolveFileUrl = (fileKey: string, directUrl?: string | null) => {
  if (directUrl) {
    if (directUrl.startsWith("http://") || directUrl.startsWith("https://")) {
      return directUrl;
    }
    if (FILE_BASE_URL) {
      return `${FILE_BASE_URL}${directUrl}`;
    }
  }
  if (!fileKey) return null;
  if (fileKey.startsWith("http://") || fileKey.startsWith("https://")) {
    return fileKey;
  }
  if (!FILE_BASE_URL) return null;
  if (fileKey.startsWith("/files/")) {
    return `${FILE_BASE_URL}${fileKey}`;
  }
  return `${FILE_BASE_URL}/files/${fileKey}`;
};

export function formatLeaf(apiLeaf: ApiLeafResponse): LeafData {
  return {
    id: apiLeaf.id,
    treeId: apiLeaf.tree_id,
    uploaderId: apiLeaf.uploader_id ?? apiLeaf.uploaded_by ?? 0,
    fileKey: apiLeaf.file_key || apiLeaf.r2_key || "",
    caption: apiLeaf.caption || apiLeaf.title || "",
    takenAt: apiLeaf.taken_at,
    createdAt: apiLeaf.created_at,
    imageUrl: resolveFileUrl(apiLeaf.file_key || apiLeaf.r2_key || "", apiLeaf.r2_url),
  };
}
