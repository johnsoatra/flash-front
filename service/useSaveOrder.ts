import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { SaveOrderRequest, SaveOrderResponse } from "@/dto/saveOrder";

export default function useSaveOrder() {
  return useRequest<SaveOrderResponse, SaveOrderRequest>({
    endpoint: Api.SaveOrder,
    options: ({ transactionId }) => ({
      method: 'post',
      body: {
        transaction_id: transactionId,
      },
    }),
  });
}
