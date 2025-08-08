export function formatDateTime(date: string | number | Date) {
  return new Date(date).toLocaleString();
}
