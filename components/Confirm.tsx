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
      className="max-w-116!"
      onClose={() => { }}
      onClickMask={() => { }}>
      <div className="w-full flex flex-col items-start pt-0.5 pb-1 px-4">
        <h3 className="font-medium text-2xl">{title}</h3>
        <div className="flex-1 mt-6 mb-11.5 text-start">{description}</div>
        <div className="w-full flex items-center justify-end gap-x-2">
          <button
            className={`
              border rounded-xl py-1 px-8 text-back
              ${danger ? 'border-danger-600 bg-danger-600' : 'border-primary-600 bg-primary-600'}
            `}
            onClick={onClickYes}>
            Yes
          </button>
          <button
            className="border rounded-xl py-1 px-8 transition-bg-white"
            onClick={onClickNo}>
            No
          </button>
        </div>
      </div>
    </Popup>
  );
}
