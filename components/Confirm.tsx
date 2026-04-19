import React from "react";
import Popup from "./Popup";

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
  return (
    <Popup
      open={open}
      noCloseButton={true}
      onClose={() => { }}
      onClickMask={() => { }}>
      <div className="w-full min-h-67 flex flex-col items-start gap-y-1.5 pt-0.5 pb-1 px-4">
        <h3 className="font-bold text-[1.625rem]">{title}</h3>
        <div className="flex-1 mt-10 text-start">{description}</div>
        <div className="w-full flex items-center justify-end gap-x-2">
          <button
            className={`
              border rounded-xl py-1 px-8 text-back
              ${danger ? 'border-danger-500 bg-danger-500' : 'border-primary-500 bg-primary-500'}
            `}
            onClick={onClickYes}>
            Yes
          </button>
          <button
            className="border rounded-xl py-1 px-8"
            onClick={onClickNo}>
            No
          </button>
        </div>
      </div>
    </Popup>
  );
}
