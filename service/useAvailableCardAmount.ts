import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { AvailableCardAmountResponse } from "@/dto/availableCardAmount";

export default function useAvailableCardAmount() {
  const data = useRequest<AvailableCardAmountResponse>({
    endpoint: Api.AvailableCardAmount,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
