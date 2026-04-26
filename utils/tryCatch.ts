export default async function tryCatch<T, K = T>(
  tryFn: () => Promise<T>,
  catchFn: (error: unknown) => Promise<K>,
) {
  try {
    return await tryFn();
  } catch (error) {
    return await catchFn(error);
  }
}
