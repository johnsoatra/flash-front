import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { Card, GetCardsRequest, GetCardsResponse } from "@/dto/getCards";

export default function useGetCards() {
  return useRequest<GetCardsResponse, GetCardsRequest, Card[]>({
    endpoint: Api.GetCards,
    options: ({ cardIds }) => ({
      method: 'post',
      body: {
        'card_ids': cardIds,
      }
    }),
    pick(response) {
      return response.data;
    },
  });
}
