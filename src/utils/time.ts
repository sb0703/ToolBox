export function tsToDate(ts: string | number, useUTC = false): string {
  const n = typeof ts === "string" ? Number(ts) : ts;
  if (!Number.isFinite(n)) return "NaN";
  const ms = String(n).length <= 10 ? n * 1000 : n;
  const d = new Date(ms);
  return useUTC ? d.toUTCString() : d.toLocaleString();
}
export function dateToTs(dateStr: string, useUTC = false): number {
  if (!dateStr) return NaN;
  const d = new Date(dateStr);
  const ms = useUTC
    ? Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      )
    : d.getTime();
  return Math.floor(ms / 1000);
}
