import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { Card, GetCardRequest, GetCardResponse } from "@/dto/getCard";

export default function useGetCards() {
  return useRequest<GetCardResponse, GetCardRequest, Card[]>({
    endpoint: Api.GetCards,
    options: ({ cardIds }) => ({
      method: 'post',
      params: {
        'card_ids': cardIds,
      }
    }),
    pick(response) {
      return response.data;
    },
  });
}
