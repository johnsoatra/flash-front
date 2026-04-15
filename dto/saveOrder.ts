import { Card } from "./getCards";

export type SaveOrderResponse = {
  card: Card,
}

export type SaveOrderRequest = {
  transactionId: string;
}
