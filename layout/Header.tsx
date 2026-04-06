'use client';
import { useState } from "react";
import { useMainContext } from "@/context/mainContext";
import Badge from "@/components/Badge";
import PopupLastCode from "@/components/Popups/PopupLastCode";
import Product from "@/assets/svg/product";

export default function Header() {
  const context = useMainContext();
  const [openLastQRCode, setOpenLastQRCode] = useState(false);

  function handleClickBadge() {
    setOpenLastQRCode(true);
  }
  function handleCloseScanQR() {
    setOpenLastQRCode(false);
  }
  function handleClickClear() {
    context.lastCardCode = null;
    setOpenLastQRCode(false);
  }

  return (<>
    <header
      className="w-full min-h-18 flex items-center justify-center bg-back border-b px-4">
      <div className="w-full max-w-114 relative flex items-center justify-center gap-x-1.5">
        <h2 className="font-bold text-[2rem] tracking-[25%]">FLASH</h2>
        {context.lastCardCode && <button
          className="absolute top-1/2 right-0 -translate-y-1/2"
          onClick={handleClickBadge}>
          <Product />
          <Badge amount={1}/>
        </button>}
      </div>
    </header>
    <PopupLastCode
      open={openLastQRCode}
      onClose={handleCloseScanQR}
      onClickMask={handleCloseScanQR}
      onClickClear={handleClickClear}
    />
  </>);
}
