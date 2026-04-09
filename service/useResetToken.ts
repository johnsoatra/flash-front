import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { ResetTokenResponse } from "@/dto/resetToken";

export default function useResetToken() {
  const data = useRequest<ResetTokenResponse>({
    endpoint: Api.ResetToken,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
