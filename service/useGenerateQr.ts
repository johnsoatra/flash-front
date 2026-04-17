import Api from "@/constants/api";
import useRequest from "../hooks/useRequest";
import { GenerateQrData, GenerateQrRequest, GenerateQrResponse } from "@/dto/generateQr";

export default function useGenerateQr() {
  return useRequest<GenerateQrResponse, GenerateQrRequest, GenerateQrData>({
    endpoint: Api.GenerateQr,
    options: ({ lockId }) => ({
      method: 'post',
      body: {
        lock_id: lockId,
      },
    }),
    pick(response) {
      return response.data;
    },
  });
}
