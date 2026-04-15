import Api from "@/constants/api";
import Env from "@/constants/env";
import useRequest from "../hooks/useRequest";
import { CheckTransactionRequest, CheckTransactionResponse } from "@/dto/checkTransaction";

export default function useCheckTransaction() {
  return useRequest<CheckTransactionResponse, CheckTransactionRequest>({
    endpoint: `${Env.BakongBaseUrl}/${Api.CheckTransaction}`,
    options: (payload) => ({
      method: 'post',
      headers: {
        origin: Env.BakongBaseUrl,
      },
      body: payload,
    }),
  });
}
