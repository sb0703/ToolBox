const rules: Array<[RegExp, string]> = [
  [/^###### (.*$)/gim, "<h6>$1</h6>"],
  [/^##### (.*$)/gim, "<h5>$1</h5>"],
  [/^#### (.*$)/gim, "<h4>$1</h4>"],
  [/^### (.*$)/gim, "<h3>$1</h3>"],
  [/^## (.*$)/gim, "<h2>$1</h2>"],
  [/^# (.*$)/gim, "<h1>$1</h1>"],
  [/\*\*(.*?)\*\*/gim, "<strong>$1</strong>"],
  [/\*(.*?)\*/gim, "<em>$1</em>"],
  [/`([^`]+)`/gim, "<code>$1</code>"],
  [/^\> (.*$)/gim, "<blockquote>$1</blockquote>"],
  [/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />'],
  [/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>'],
  [/\n$/gim, "<br />"],
];

export function markdownToHtml(md: string) {
  let html = md;
  rules.forEach(([regex, replacement]) => {
    html = html.replace(regex, replacement);
  });
  return html.trim();
}
