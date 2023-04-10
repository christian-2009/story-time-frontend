export function formatDateFromTimestamp(timestamp: Date) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}
