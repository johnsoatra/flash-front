import React from "react";
import Popup from "./Popup";
import useTranslate from "@/hooks/useTranslate";

export default function Confirm({
  open,
  title,
  description,
  danger,
  onClickYes,
  onClickNo,
}: {
  open: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
  danger?: boolean;
  onClickYes: () => void;
  onClickNo: () => void;
}) {
  const t = useTranslate();
  return (
    <Popup
      open={open}
      noCloseButton={true}
      className="max-w-116!"
      onClose={() => { }}
      onClickMask={() => { }}>
      <div className="w-full flex flex-col items-start pt-0.5 pb-1 px-4">
        <h3 className="font-medium text-2xl">{title}</h3>
        <div className="flex-1 mt-6 mb-11.5 text-start">{description}</div>
        <div className="w-full flex items-center justify-end gap-x-2.5">
          <button
            title={t('proceed action')}
            className={`
              rounded-xl py-1.5 px-8 text-back
              ${danger ? 'tran-bg-danger' : 'bg-primary-600'}
            `}
            onClick={onClickYes}>
            {t('yes')}
          </button>
          <button
            title={t('cancel action')}
            className="border rounded-xl py-1.5 px-8 tran-bg-back"
            onClick={onClickNo}>
            {t('no')}
          </button>
        </div>
      </div>
    </Popup>
  );
}
