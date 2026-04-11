export function localDate(utc: string) {
  const date = new Date(utc);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
