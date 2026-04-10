import { GetCardData } from "./getCard";

export type SaveOrderResponse = {
  success: boolean;
  card: GetCardData,
}

export type SaveOrderRequest = {
  transactionId: number;
}
