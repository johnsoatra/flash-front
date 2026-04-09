import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { RemoveLockResponse } from "@/dto/removeLock";

export default function useRemoveLock() {
  const data = useRequest<RemoveLockResponse>({
    endpoint: Api.RemoveLock,
    options: () => ({
      method: 'post',
    }),
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
