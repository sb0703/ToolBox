export function parseCsv(text: string): { columns: any[]; data: any[] } {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { columns: [], data: [] };
  const headers = splitCsvLine(lines[0]);
  const columns = headers.map((h) => ({ title: h, dataIndex: h }));
  const data = lines.slice(1).map((line, idx) => {
    const cells = splitCsvLine(line);
    const row: Record<string, any> = { key: idx };
    headers.forEach((h, i) => {
      row[h] = cells[i] ?? "";
    });
    return row;
  });
  return { columns, data };
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (ch === "," && !quoted) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}
