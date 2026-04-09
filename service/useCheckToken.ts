import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { CheckTokenResponse } from "@/dto/checkToken";

export default function useCheckToken() {
  const data = useRequest<CheckTokenResponse>({
    endpoint: Api.CheckToken,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
