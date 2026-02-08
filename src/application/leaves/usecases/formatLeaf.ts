import type { LeafData } from "@/application/leaves/types";
import type { ApiLeafResponse } from "@/infrastructure/api";
import { toRecord } from "@/utils/record";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

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

export const formatLeaf = (apiLeaf: ApiLeafResponse): LeafData => {
  const leafRecord = apiLeaf as Record<string, unknown>;
  const treeName =
    typeof leafRecord.tree_name === "string"
      ? leafRecord.tree_name
      : typeof leafRecord.treeName === "string"
        ? leafRecord.treeName
        : (() => {
            const tree = toRecord(leafRecord.tree);
            return tree && typeof tree.name === "string" ? tree.name : undefined;
          })();
  const locationText =
    typeof leafRecord.location_text === "string"
      ? leafRecord.location_text
      : typeof leafRecord.locationText === "string"
        ? leafRecord.locationText
        : undefined;

  return {
    id: apiLeaf.id,
    treeId: apiLeaf.tree_id,
    treeName,
    uploaderId: apiLeaf.uploader_id ?? apiLeaf.uploaded_by ?? 0,
    fileKey: apiLeaf.file_key || apiLeaf.r2_key || "",
    caption: apiLeaf.caption || apiLeaf.title || "",
    takenAt: apiLeaf.taken_at,
    createdAt: apiLeaf.created_at,
    imageUrl: resolveFileUrl(apiLeaf.file_key || apiLeaf.r2_key || "", apiLeaf.r2_url),
    locationText,
  };
};
