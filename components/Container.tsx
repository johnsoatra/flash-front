'use client';
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useTrack } from "react-use-current";
import { toast } from "sonner";
import { useMainContext } from "@/context/mainContext";
import Message from "@/constants/message";
import useGenerateToken from "@/service/useGenerateToken";
import { setCards } from "@/utils/localStorage/cards";
import { setToken } from "@/utils/localStorage/token";
import { setChecked } from "@/utils/localStorage/checked";
import { setLang } from "@/utils/cookie/lang";
import useTranslate from "@/hooks/useTranslate";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useMainContext();
  const track = useTrack();
  const router = useRouter();
  const t = useTranslate();
  const prevLang = useRef(context.lang);
  const { request: requestGenerateToken } = useGenerateToken();

  useEffect(() => {
    if (prevLang.current !== context.lang) {
      prevLang.current = context.lang;
      setLang(context.lang);
      router.reload();
    }
  }, [context.lang]);
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
        toast.error(t(Message.Cannot_Get_Config));
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

  return children;
}
