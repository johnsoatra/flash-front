import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { VerifyTransactionRequest, VerifyTransactionResponse } from "@/dto/verifyTransaction";

export default function useVerifyTransaction() {
  return useRequest<VerifyTransactionResponse, VerifyTransactionRequest>({
    endpoint: Api.CheckTransaction,
    options: ({ qrId }) => ({
      method: 'post',
      body: {
        qr_id: qrId,
      },
    }),
  });
}
