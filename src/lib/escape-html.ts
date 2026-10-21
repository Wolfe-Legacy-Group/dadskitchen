const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// Escapes a value for use in HTML text or a quoted attribute, so user input
// placed in an email body renders as literal text.
export function escapeHtml(value: string | number): string {
  return String(value).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}
