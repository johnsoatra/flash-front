export type VerifyTransactionResponse = {
  verified: false;
} | {
  verified: true;
  transaction_id: string;
}

export type VerifyTransactionRequest = {
  qrId: string;
}
