import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { GenerateTokenResponse } from "@/dto/generateToken";

export default function useGenerateToken() {
  const data = useRequest<GenerateTokenResponse>({
    endpoint: Api.GenerateToken,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
