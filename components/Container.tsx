'use client';
import React, { useEffect } from "react";
import { useMainContext } from "@/context/mainContext";
import useCheckToken from "@/service/useCheckToken";
import useResetToken from "@/service/useResetToken";
import { getCards, setCards } from "@/utils/localStorage/cards";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useMainContext();
  const { request: requestCheckToken } = useCheckToken();
  const { request: requestResetToken } = useResetToken();

  useEffect(() => {
    context.cards = getCards();
  }, []);
  useEffect(() => {
    if (context.cards !== undefined) {
      setCards(context.cards);
    }
  }, [context.cards]);
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

  return (
    <>{children}</>
  );
}
