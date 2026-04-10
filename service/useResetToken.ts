import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { ResetTokenResponse } from "@/dto/resetToken";
import { useMainContext } from "@/context/mainContext";

export default function useResetToken() {
  const context = useMainContext();
  const data = useRequest<ResetTokenResponse>({
    endpoint: Api.ResetToken,
    options: () => ({}),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      if (context.lastCardId) {
        alert('Clear your last card first to renew token!');
        context.openLastCard = true;
        return;
      }
      return data.request(null, options);
    }
  };
}
