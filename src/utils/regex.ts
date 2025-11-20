export function runRegex(pattern: string, flags: string, text: string) {
  try {
    const reg = new RegExp(pattern, flags);
    const data: Array<Record<string, any>> = [];
    let match: RegExpExecArray | null;
    let count = 0;
    if (!reg.global) {
      match = reg.exec(text);
      if (match) {
        data.push(toRow(match));
        count = 1;
      }
    } else {
      while ((match = reg.exec(text))) {
        data.push(toRow(match));
        count++;
        if (match.index === reg.lastIndex) reg.lastIndex++;
      }
    }
    return {
      ok: true,
      summary: `共匹配 ${count} 次`,
      columns: [
        { title: "匹配内容", dataIndex: "match" },
        { title: "位置", dataIndex: "index" },
        { title: "分组", dataIndex: "groups" },
      ],
      data,
    };
  } catch (err: any) {
    return { ok: false, error: err?.message || "正则解析失败" };
  }
}

function toRow(match: RegExpExecArray) {
  return {
    key: `${match.index}-${match[0]}`,
    match: match[0],
    index: match.index,
    groups: match.slice(1).join(", "),
  };
}
