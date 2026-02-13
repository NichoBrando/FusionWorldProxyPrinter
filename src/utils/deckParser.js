export function parseDeck(text) {
  const lines = text.split("\n");

  return lines
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split(" ");
      const qty = parseInt(parts[0]);
      const name = parts.slice(1).join(" ");

      return { qty, name };
    });
}
