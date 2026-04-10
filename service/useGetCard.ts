import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { GetCardData, GetCardRequest, GetCardResponse } from "@/dto/getCard";

export default function useGetCard() {
  return useRequest<GetCardResponse, GetCardRequest, GetCardData>({
    endpoint: Api.GetCard,
    options: ({ id }) => ({
      params: {
        id,
      }
    }),
    pick(response) {
      return response.data;
    },
  });
}
