const lengthUnits: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};

const weightUnits: Record<string, number> = {
  g: 1,
  kg: 1000,
  lb: 453.592,
};

const currencyRates: Record<string, number> = {
  CNY: 1,
  USD: 7.1,
  EUR: 7.8,
};

export function convertUnit(value: number, from: string, to: string) {
  if (!Number.isFinite(value)) return { ok: false, error: "请输入数字" };
  if (from in lengthUnits && to in lengthUnits) {
    const meters = value * lengthUnits[from];
    return {
      ok: true,
      text: `${value}${from} = ${(meters / lengthUnits[to]).toFixed(4)}${to}`,
    };
  }
  if (from in weightUnits && to in weightUnits) {
    const grams = value * weightUnits[from];
    return {
      ok: true,
      text: `${value}${from} = ${(grams / weightUnits[to]).toFixed(4)}${to}`,
    };
  }
  if (from in currencyRates && to in currencyRates) {
    const cny = value * currencyRates[from];
    return {
      ok: true,
      text: `${value}${from} ≈ ${(cny / currencyRates[to]).toFixed(2)}${to}`,
    };
  }
  return { ok: false, error: "暂不支持的单位" };
}
