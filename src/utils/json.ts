export function formatJson(
  input: string,
  compress = false
): { ok: boolean; output: string; error?: string } {
  try {
    const obj = JSON.parse(input);
    const space = compress ? 0 : 2;
    return { ok: true, output: JSON.stringify(obj, null, space) };
  } catch (e: any) {
    return { ok: false, output: "", error: e?.message || "Invalid JSON" };
  }
}
