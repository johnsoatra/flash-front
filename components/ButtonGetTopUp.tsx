import React from "react";
import useTranslate from "@/hooks/useTranslate";

export default function ButtonGetTopUp({
  onClick,
}: {
  onClick: (evt: React.MouseEvent) => void;
}) {
  const t = useTranslate();
  return (
    <button
      title={t('show qr')}
      className="border border-good rounded-xl py-1 px-8 tran-bg-back text-xl text-good text-center"
      onClick={onClick}>
      {t('buy card')}
    </button>
  );
}
