export type CheckTransactionResponse = {
  "transaction-id": number;
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
