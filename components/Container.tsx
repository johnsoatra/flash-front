'use client';
import React, { useEffect } from "react";
import { useTrack } from "react-use-current";
import { useMainContext } from "@/context/mainContext";
import useCheckToken from "@/service/useCheckToken";
import useResetToken from "@/service/useResetToken";
import useGetConfig from "@/service/useGetConfig";
import useGetBakongToken from "@/service/useGetBakongToken";
import { getCards, setCards } from "@/utils/localStorage/cards";
import { getBakongToken, setBakongToken } from "@/utils/localStorage/bakongToken";

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
  const { request: requestBakongToken } = useGetBakongToken();

  useEffect(() => {
    context.cards = getCards();
    context.bakongToken = getBakongToken();
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
    if (context.bakongToken !== undefined) {
      setBakongToken(context.bakongToken);
    }
  }, [context.bakongToken]);

  useEffect(() => {
    if (context.tokenExisted) {
      requestConfig().then(config => context.config = config);
    }
  }, [context.tokenExisted]);
  useEffect(() => {
    if (
      context.tokenExisted &&
      context.bakongToken !== undefined &&
      !context.bakongToken
    ) {
      requestBakongToken().then(res => context.bakongToken = res.token);
    }
  }, [context.tokenExisted, context.bakongToken]);

  return (
    <>{children}</>
  );
}
