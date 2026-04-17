export type GenerateQrData = {
  status: {
    code: number;
    errorCode: number | null;
    message: string | null;
  },
  data: {
    qr: string;
    md5: string;
  }
}

export type GenerateQrResponse = {
  id: string;
  data: GenerateQrData;
  expired_at: number;
}

export type GenerateQrRequest = {
  lockId: string;
}
