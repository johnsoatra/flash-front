import Env from "@/constants/env";
import { fillParams } from "./url";
import { RequestInitial } from "@/hooks/useRequest";

export default async function request(endpoint: string, requestInit?: RequestInitial) {
  const { params, ...restOptions } = requestInit ?? {};
  const url = fillParams(
    `${Env.ApiBaseUrl}/${endpoint}`,
    params ?? {},
  );
  return fetch(url, {
    ...restOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...restOptions?.headers,
    },
    body: JSON.stringify(restOptions?.body),
  }).then(res => res.json());
}
