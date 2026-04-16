import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { CheckTransactionRequest, CheckTransactionResponse } from "@/dto/checkTransaction";

export default function useCheckTransaction() {
  return useRequest<CheckTransactionResponse, CheckTransactionRequest>({
    endpoint: Api.CheckTransaction,
    options: ({ qrId }) => ({
      method: 'post',
      body: {
        qr_id: qrId,
      },
    }),
  });
}
