import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { IsAllowedResponse } from "@/dto/isAllowed";

export default function useIsAllowed() {
  const data = useRequest<IsAllowedResponse>({
    endpoint: Api.IsAllowed,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
