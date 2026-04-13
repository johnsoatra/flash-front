import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { GetConfigResponse } from "@/dto/getConfig";

export default function useGetConfig() {
  const data = useRequest<GetConfigResponse>({
    endpoint: Api.GetConfig,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
