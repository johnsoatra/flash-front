import Env from "@/constants/env";
import { fillParams } from "./url";
import { RequestInitial } from "@/hooks/useRequest";

function appendProtocol(endpoint: string) {
  if (/^https?:\/\//.test(endpoint)) {
    return endpoint;
  }
  return `${Env.ApiBaseUrl}/${endpoint}`;
}

export default async function request(endpoint: string, requestInit?: RequestInitial) {
  const { params, ...restOptions } = requestInit ?? {};
  const url = fillParams(appendProtocol(endpoint), params ?? {});
  return fetch(url, {
    ...restOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...restOptions?.headers,
    },
    body: JSON.stringify(restOptions?.body),
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    });
}
