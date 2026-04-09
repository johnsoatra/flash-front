export type SaveOrderResponse = {
  success: boolean;
  card: {
    id: string;
    created_at: string;
    provider: string;
    number_order: string;
    code: string;
    data_amount: number;
    order_id: string;
    expired_date: string;
  }
}

export type SaveOrderRequest = {
  transactionId: number;
}
