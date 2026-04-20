'use client';
import React, { useEffect } from "react";
import { useTrack } from "react-use-current";
import { toast } from "sonner";
import { useMainContext } from "@/context/mainContext";
import Message from "@/constants/message";
import useGenerateToken from "@/service/useGenerateToken";
import { setCards } from "@/utils/localStorage/cards";
import { setToken } from "@/utils/localStorage/token";
import { setChecked } from "@/utils/localStorage/checked";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useMainContext();
  const track = useTrack();
  const { request: requestGenerateToken } = useGenerateToken();

  useEffect(() => {
    setToken(context.token);
  }, [context.token]);
  useEffect(() => {
    setCards(context.cards);
  }, [track(context.cards)]);
  useEffect(() => {
    setChecked(context.checkedCard);
  }, [context.checkedCard]);
  useEffect(() => {
    if (context.config === undefined) {
      requestAnimationFrame(() => {
        toast.error(Message.Cannot_Get_Config);
      });
    }
  }, [context.config]);
  useEffect(() => {
    if (!context.token) {
      requestGenerateToken()
        .then(res => {
          context.token = res.token;
        });
    }
  }, []);

  return (
    <>{children}</>
  );
}
