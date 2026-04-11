import { useMemo, useState } from 'react';
import { ErrorResponse } from '@/types';
import Api from '@/constants/api';
import Message from '@/constants/message';
import { useMainContext } from '@/context/mainContext';
import requestApi from '@/utils/request';

type RecordAny = Record<string, any>;
export type RequestInitial = Omit<RequestInit, 'body'> & {
  body?: RecordAny;
  params?: RecordAny;
}
export type UseRequestProps<Res, Req, Data> = {
  endpoint: string,
  options: (payload: Req) => RequestInitial;
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
  const context = useMainContext();
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
          if (error.statusCode === 401 && props.endpoint !== Api.ResetToken) {
            if (context.lastCardId) {
              alert(Message.Clear_Your_Card);
              context.openLastCard = true;
              rej(error);
            } else {
              requestApi(Api.ResetToken)
                .then(() => {
                  res(request(payload, options));
                })
                .catch(error => {
                  rej(error);
                });
            }
            return;
          }
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
