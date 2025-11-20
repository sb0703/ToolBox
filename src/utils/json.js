export function formatJson(input, compress = false) {
    try {
        const obj = JSON.parse(input);
        const space = compress ? 0 : 2;
        return { ok: true, output: JSON.stringify(obj, null, space) };
    }
    catch (e) {
        return { ok: false, output: "", error: e?.message || "Invalid JSON" };
    }
}
