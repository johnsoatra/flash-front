import React from "react";

export type PopupProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: (evt: React.MouseEvent) => void;
  onClickMask: (evt: React.MouseEvent) => void;
};

export default function Popup({
  open,
  children,
  onClose,
  onClickMask
}: PopupProps) {
  return (open &&
    <div className={'fixed inset-0 flex justify-center items-start z-50 p-4'}>
      <div
        className="absolute inset-0 bg-black/30 z-[-1]"
        onClick={onClickMask} />
      <div
        className="w-full max-w-131 relative mt-28 bg-back rounded-xl border p-4"
        onClick={evt => evt.preventDefault()}>
        <button
          className="w-7 h-7 absolute top-4 right-4 flex justify-center items-center font-bold rounded-full border border-front opacity-75"
          onClick={onClose}>
          <span>X</span>
        </button>
        {children}
      </div>
    </div>
  );
}
