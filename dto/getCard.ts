export type CardProvider = 'smart';

export type Card = {
  id: string;
  created_at: string;
  provider: CardProvider;
  number_order: string;
  code: string;
  data_amount: number;
  order_id: string;
  expired_date: string;
}

export type GetCardResponse = {
  data: Card[],
}

export type GetCardRequest = {
  cardIds: string[];
}
