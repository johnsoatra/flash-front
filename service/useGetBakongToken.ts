import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { GetBakongTokenResponse } from "@/dto/getBakongToken";

export default function useGetBakongToken() {
  const data = useRequest<GetBakongTokenResponse>({
    endpoint: Api.GetBakongToken,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
