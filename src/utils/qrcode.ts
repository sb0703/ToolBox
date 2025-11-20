import QRCode from "qrcode";
import jsQR from "jsqr";

export async function handleQrTask(opts: {
  type: "generate";
  text: string;
  size: number;
}): Promise<{ ok: boolean; dataUrl?: string; text?: string; error?: string }>;
export async function handleQrTask(opts: {
  type: "decode";
  file: File;
}): Promise<{ ok: boolean; text?: string; error?: string }>;
export async function handleQrTask(opts: any) {
  if (opts.type === "generate") {
    if (!opts.text) return { ok: false, error: "内容不能为空" };
    const dataUrl = await QRCode.toDataURL(opts.text, {
      width: opts.size || 320,
      margin: 2,
    });
    return { ok: true, dataUrl, text: opts.text };
  }
  if (opts.type === "decode") {
    if (!opts.file) return { ok: false, error: "请上传二维码图片" };
    const dataUrl = await readFile(opts.file);
    const img = await loadImage(dataUrl);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { ok: false, error: "浏览器不支持 Canvas" };
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const result = jsQR(imageData.data, imageData.width, imageData.height);
    if (!result) return { ok: false, error: "未检测到二维码" };
    return { ok: true, text: result.data };
  }
  return { ok: false, error: "未知操作" };
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
