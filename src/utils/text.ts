export function countWords(text: string) {
  const chars = text.length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const lines = text.split(/\r?\n/).length;
  return `字符：${chars}，单词：${words}，行数：${lines}`;
}
