import Api from "@/constants/api";
import useRequest, { RequestInitial } from "../hooks/useRequest";
import { GenerateQrData, GenerateQrResponse } from "@/dto/generateQr";

export default function useGenerateQr() {
  const data = useRequest<GenerateQrResponse, null, GenerateQrData>({
    endpoint: Api.GenerateQr,
    options: () => ({}),
    pick(response) {
      return response.data;
    },
  });
  return {
    ...data,
    request(options?: RequestInitial) {
      return data.request(null, options);
    }
  };
}
