import { parseCsv } from "./csv";

export function csvToJson(text: string) {
  const table = parseCsv(text);
  const json = JSON.stringify(table.data, null, 2);
  return { json, columns: table.columns, data: table.data };
}
