/**
 * URLからファイルキーを抽出（R2形式）
 */
export function extractFileKeyFromUrl(url: string): string | null {
    if (!url) return null;
    // URLがすでにファイルキーの場合
    if (!url.includes("/")) return url;
    // /files/keyの形式から keyを抽出
    const match = url.match(/\/files\/(.+)$/);
    return match ? match[1] : null;
}
