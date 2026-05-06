import { useState } from 'react';
import QRCode from 'qrcode';

export default function useQrCode() {
  const [value, setValue] = useState<string>();

  async function generate(text: string) {
    return QRCode
      .toDataURL(text, { margin: 0 })
      .then((dataUrl) => {
        setValue(dataUrl);
        return dataUrl;
      })
      .catch(error => {
        setValue(undefined);
        throw error;
      });
  }

  return {
    value,
    generate,
  }
}
