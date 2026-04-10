import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { RemoveLockRequest, RemoveLockResponse } from "@/dto/removeLock";

export default function useRemoveLock() {
  return useRequest<RemoveLockResponse, RemoveLockRequest>({
    endpoint: Api.RemoveLock,
    options: ({ slot }) => ({
      method: 'post',
      body: {
        slot,
      }
    }),
  });
}
