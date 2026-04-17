'use client';
import React, { useEffect } from "react";
import { useTrack } from "react-use-current";
import { useMainContext } from "@/context/mainContext";
import useGetConfig from "@/service/useGetConfig";
import useGenerateToken from "@/service/useGenerateToken";
import { setCards } from "@/utils/localStorage/cards";
import { setToken } from "@/utils/localStorage/token";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useMainContext();
  const track = useTrack();
  const { request: requestGenerateToken } = useGenerateToken();
  const { request: requestConfig } = useGetConfig();

  useEffect(() => {
    setToken(context.token);
  }, [context.token]);
  useEffect(() => {
    setCards(context.cards);
  }, [track(context.cards)]);
  useEffect(() => {
    if (!context.token) {
      requestGenerateToken()
        .then(res => {
          context.token = res.token;
        });
    }
    requestConfig()
      .then(config => {
        context.config = config
      });
  }, []);

  return (
    <>{children}</>
  );
}
