export function fillParams(
  endpoint: string,
  params: Record<string, string | number | boolean>,
) {
  return endpoint.replace(/:(\w+)/g, (matched, key) => {
    return params[key] !== undefined ? encodeURIComponent(params[key]) : matched;
  });
}

export function downloadQr(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = 'qr-code-smart-1.png';
  a.style = 'position:fixed;display:none;';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
