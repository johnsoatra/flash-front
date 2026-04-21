export type CheckTransactionResponse = {
  verified: false;
} | {
  verified: true;
  transaction_id: string;
}

export type CheckTransactionRequest = {
  qrId: string;
}
