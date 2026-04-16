'use client';
import React, { useEffect } from "react";
import { useTrack } from "react-use-current";
import { useMainContext } from "@/context/mainContext";
import useCheckToken from "@/service/useCheckToken";
import useResetToken from "@/service/useResetToken";
import useGetConfig from "@/service/useGetConfig";
import { getCards, setCards } from "@/utils/localStorage/cards";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useMainContext();
  const track = useTrack();
  const { request: requestCheckToken } = useCheckToken();
  const { request: requestResetToken } = useResetToken();
  const { request: requestConfig } = useGetConfig();

  useEffect(() => {
    context.cards = getCards();
  }, []);
  useEffect(() => {
    requestCheckToken()
      .then(res => {
        if (!res.existed) {
          requestResetToken()
            ?.then(() => {
              context.tokenExisted = true;
            });
        } else {
          context.tokenExisted = true;
        }
      })
  }, []);
  useEffect(() => {
    if (context.cards !== undefined) {
      setCards(context.cards);
    }
  }, [track(context.cards)]);

  useEffect(() => {
    if (context.tokenExisted) {
      requestConfig().then(config => context.config = config);
    }
  }, [context.tokenExisted]);

  return (
    <>{children}</>
  );
}
