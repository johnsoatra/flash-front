'use client';
import React, { useEffect } from "react";
import { useMainContext } from "@/context/mainContext";
import useCheckToken from "@/service/useCheckToken";
import useResetToken from "@/service/useResetToken";
import { getCardId, removeCardId, setCardId } from "@/utils/localStorage/card-id";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useMainContext();
  const { request: requestCheckToken } = useCheckToken();
  const { request: requestResetToken } = useResetToken();

  useEffect(() => {
    context.lastCardId = getCardId();
  }, []);
  useEffect(() => {
    if (context.lastCardId !== undefined) {
      if (context.lastCardId !== null) {
        setCardId(context.lastCardId);
      } else {
        removeCardId();
      }
    }
  }, [context.lastCardId]);
  useEffect(() => {
    requestCheckToken()
      .then(res => {
        if (!res.existed) {
          requestResetToken()
            ?.then(res => {
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
