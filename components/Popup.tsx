import React from "react";
import XMark from "@/assets/svg/XMark";

export type PopupProps = {
  open: boolean;
  noCloseButton?: boolean;
  children: React.ReactNode;
  className?: string;
  onClose: (evt: React.MouseEvent) => void;
  onClickMask: (evt: React.MouseEvent) => void;
};

export default function Popup({
  open,
  noCloseButton,
  children,
  className,
  onClose,
  onClickMask,
}: PopupProps) {
  return (open &&
    <div className={'fixed inset-0 flex justify-center items-center z-50 p-4'}>
      <div
        className="absolute inset-0 bg-front/30 z-[-1] backdrop-blur-[2px]"
        onClick={onClickMask} />
      <div
        className={"w-full max-w-131 max-h-[calc(100%-7rem)] relative bg-back rounded-xl border p-4 overflow-auto " + (className ?? '')}
        onClick={evt => evt.preventDefault()}>
        {!noCloseButton && <button
          title="Close this popup"
          className="absolute top-4 right-4 flex justify-center items-center rounded-full text-five p-1 hover:text-front hover:bg-light-gray active:bg-dark-gray"
          onClick={onClose}>
          <div className="w-6 h-6">
            <XMark />
          </div>
        </button>}
        {children}
      </div>
    </div>
  );
}
