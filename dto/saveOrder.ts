import { Card } from "./getCard";

export type SaveOrderResponse = {
  card: Card,
}

export type SaveOrderRequest = {
  transactionId: string;
}
