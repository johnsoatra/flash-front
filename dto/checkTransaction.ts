export type CheckTransactionResponse = {
  transaction_id: string;
  data: {
    responseCode: number;
    responseMessage: string;
    errorCode: number | null;
    data: Record<string, any> | null;
  }
}

export type CheckTransactionRequest = {
  md5: string;
}
