export function parseCsv(text) {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (!lines.length)
        return { columns: [], data: [] };
    const headers = splitCsvLine(lines[0]);
    const columns = headers.map((h) => ({ title: h, dataIndex: h }));
    const data = lines.slice(1).map((line, idx) => {
        const cells = splitCsvLine(line);
        const row = { key: idx };
        headers.forEach((h, i) => {
            row[h] = cells[i] ?? "";
        });
        return row;
    });
    return { columns, data };
}
function splitCsvLine(line) {
    const out = [];
    let cur = "";
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (quoted && line[i + 1] === '"') {
                cur += '"';
                i++;
            }
            else {
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
