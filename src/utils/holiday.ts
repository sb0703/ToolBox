const preset = [
  { id: "spring", name: "春节", date: "2025-01-29" },
  { id: "dragon", name: "端午节", date: "2025-05-31" },
  { id: "national", name: "国庆节", date: "2025-10-01" },
];

export function getHolidayCountdown(id: string, customDate?: string) {
  let target = preset.find((p) => p.id === id);
  if (id === "custom" && customDate) {
    target = { id: "custom", name: "自定义日期", date: customDate };
  }
  if (!target) return { ok: false, error: "请选择节日或输入日期" };
  const date = new Date(target.date);
  if (isNaN(date.getTime())) return { ok: false, error: "日期格式不正确" };
  const diff = date.getTime() - Date.now();
  if (diff < 0) return { ok: true, text: `${target.name} 已经过去啦` };
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return { ok: true, text: `距离 ${target.name} 还有 ${days} 天` };
}
