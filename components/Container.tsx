'use client';
import React, { useEffect } from "react";
import { useTrack } from "react-use-current";
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
  const track = useTrack();
  const { request: requestCheckToken } = useCheckToken();
  const { request: requestResetToken } = useResetToken();

  useEffect(() => {
    context.lastCardCode = getCardId();
  }, []);
  useEffect(() => {
    if (context.lastCardCode !== undefined) {
      if (context.lastCardCode !== null) {
        setCardId(context.lastCardCode);
      } else {
        removeCardId();
      }
    }
  }, [track(context.lastCardCode)]);
  useEffect(() => {
    console.log('context', context.openLastCode);
  }, [track(context.openLastCode)]);
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
