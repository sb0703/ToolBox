interface CompressOptions {
  quality?: number;
  format?: string;
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
) {
  if (!file) return { ok: false, error: "未选择文件" };
  const dataUrl = await readFile(file);
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { ok: false, error: "浏览器不支持 Canvas" };
  ctx.drawImage(img, 0, 0);
  const format = options.format || "image/jpeg";
  const out = canvas.toDataURL(format, options.quality ?? 0.7);
  const meta = `压缩后大小约 ${(out.length / 1.37 / 1024).toFixed(2)} KB`;
  return { ok: true, dataUrl: out, meta };
}

export async function convertImage(file: File, format: string) {
  if (!file) return { ok: false, error: "未选择文件" };
  const dataUrl = await readFile(file);
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { ok: false, error: "浏览器不支持 Canvas" };
  ctx.drawImage(img, 0, 0);
  const out = canvas.toDataURL(format);
  const meta = `转换后格式：${format}, 大小约 ${(out.length / 1.37 / 1024).toFixed(
    2
  )} KB`;
  return { ok: true, dataUrl: out, meta };
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
