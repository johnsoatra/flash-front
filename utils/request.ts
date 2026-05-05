import Env from "@/constants/env";
import { fillParams } from "./url";
import { RequestInitial } from "@/hooks/useRequest";
import { ErrorResponse } from "@/types";

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

export async function errorJson(response: Response, endpoint: string): Promise<ErrorResponse> {
  try {
    const data = await response.json();
    return {
      ...data,
      url: response.url,
    };
  } catch (error: unknown) {
    return {
      error: String(error),
      statusCode: 403,
      message: 'fetch from server',
      url: appendProtocol(endpoint),
    };
  }
}
