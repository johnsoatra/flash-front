import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { AddLockResponse } from "@/dto/addLock";

export default function useAddLock() {
  const data = useRequest<AddLockResponse>({
    endpoint: Api.AddLock,
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
