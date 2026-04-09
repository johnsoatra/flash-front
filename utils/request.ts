import Env from "@/constants/env";
import { getToken } from "./localStorage/token";

export default function request(endpoint: string, requestInit?: RequestInit) {
  const token = getToken();
  return fetch(`${Env.ApiBaseUrl}/${endpoint}`, {
    ...requestInit,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ?? ''}`,
      ...requestInit?.headers,
    },
    body: JSON.stringify(requestInit?.body),
  });
}
