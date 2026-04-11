import { GetCardData } from "./getCard";

export type SaveOrderResponse = {
  card: GetCardData,
}

export type SaveOrderRequest = {
  transactionId: string;
}
