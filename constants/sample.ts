import { type Card } from "@/dto/getCards"

const Card: Card = {
  id: '1',
  provider: 'smart',
  number_order: '1',
  data_amount: 1,
  code: '**************',
  order_id: '1',
  created_at: '2026-04-27T03:18:41.774Z',
  expired_date: '2026-04-27T03:18:41.774Z',
};

const Sample = {
  Card,
} as const;

export default Sample;
