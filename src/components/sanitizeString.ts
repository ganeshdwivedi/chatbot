export function sanitizeMarkdown(text: string) {
  return text
    .replace(/```markdown/g, "")
    .replace(/```/g, "")
    .trim();
}
