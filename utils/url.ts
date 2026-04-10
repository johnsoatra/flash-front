export function fillParams(
  endpoint: string,
  params: Record<string, string | number | boolean>,
) {
  return endpoint.replace(/:(\w+)/g, (matched, key) => {
    return params[key] !== undefined ? encodeURIComponent(params[key]) : matched;
  });
}
