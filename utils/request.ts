import Env from "@/constants/env";

export default async function request(endpoint: string, requestInit?: RequestInit) {
  return fetch(`${Env.ApiBaseUrl}/${endpoint}`, {
    ...requestInit,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...requestInit?.headers,
    },
    body: JSON.stringify(requestInit?.body),
  }).then(res => res.json());
}
