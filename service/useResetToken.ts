import Api from "@/constants/api";
import Message from "@/constants/message";
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
      if (context.cards?.length) {
        alert(Message.Clear_Your_Card);
        context.openCards = true;
        return;
      }
      return data.request(null, options);
    }
  };
}
