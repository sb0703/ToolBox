export function encodeBase64(input: string): string {
  if (typeof window === "undefined")
    return Buffer.from(input, "utf-8").toString("base64");
  return btoa(encodeURIComponent(input));
}
export function decodeBase64(input: string): {
  ok: boolean;
  output: string;
  error?: string;
} {
  try {
    const txt =
      typeof window === "undefined"
        ? Buffer.from(input, "base64").toString("utf-8")
        : decodeURIComponent(atob(input));
    return { ok: true, output: txt };
  } catch (e: any) {
    return { ok: false, output: "", error: e?.message || "Invalid Base64" };
  }
}
