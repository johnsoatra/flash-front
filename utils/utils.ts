export function monthStamp() {
  const date = new Date();
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
}
