import { useMemo, useState } from 'react';
import { ErrorResponse } from '@/types';
import requestApi from '@/utils/request';

type RecordAny = Record<string, any>;
export type RequestInitial = Omit<RequestInit, 'body'> & {
  body?: RecordAny;
}
export type UseRequestProps<Res, Req, Data> = {
  endpoint: string,
  options: (payload: Req) => RequestInitial & {
    query?: RecordAny,
    params?: RecordAny
  }
  retry?: (error: any) => boolean;
} & ([Data] extends [never] ? {} : {
  pick: (response: Res) => Data;
})
export type UseRequest<Res, Req, Data> = {
  pending: boolean | undefined;
  response: Res | undefined;
  data: ([Data] extends [never] ? Res : Data) | undefined,
  error: ErrorResponse | undefined;
  request: (payload: Req, options?: RequestInitial) => Promise<Res>;
  reset: () => void;
}
export default function useRequest<Res, Req = unknown, Data = never>(
  props: UseRequestProps<Res, Req, Data>,
): UseRequest<Res, Req, Data> {
  const [response, setResponse] = useState<Res>();
  const [error, setError] = useState<ErrorResponse>();
  const [pending, setPending] = useState<boolean>();

  const data = useMemo(() => {
    if ('pick' in props && response) {
      return props.pick(response);
    }
    return response;
  }, [response, props]) as ([Data] extends [never] ? Res : Data) | undefined;

  function reset() {
    setResponse(undefined);
    setError(undefined);
    setPending(undefined);
  }
  function request(payload: Req, options?: RequestInitial): Promise<Res> {
    return new Promise((res, rej) => {
      setPending(true);
      requestApi(props.endpoint, {
        ...(options ?? {}),
        ...props.options?.(payload),
      } as any)
        .then((response: any) => {
          setResponse(response);
          setError(undefined);
          res(response);
        })
        .catch((error: any) => {
          if (props.retry?.(error)) {
            res(request(payload, options));
            return;
          }
          if (error.name !== 'AbortError') {
            setResponse(undefined);
          }
          setError(error);
          rej(error);
        })
        .finally(() => {
          setPending(false);
        });
    });
  }

  return {
    pending,
    response,
    data,
    error,
    reset,
    request,
  };
}
