import Api from "@/constants/api";
import Env from "@/constants/env";
import useRequest from "../hooks/useRequest";
import { CheckTransactionRequest, CheckTransactionResponse } from "@/dto/checkTransaction";
import { useMainContext } from "@/context/mainContext";

export default function useCheckTransaction() {
  const context = useMainContext();
  return useRequest<CheckTransactionResponse, CheckTransactionRequest>({
    endpoint: `${Env.BakongBaseUrl}/${Api.CheckTransaction}`,
    options: (payload) => ({
      method: 'post',
      headers: {
        'Authorization': `Bearer ${context.bakongToken}`,
      },
      body: payload,
    }),
  });
}
