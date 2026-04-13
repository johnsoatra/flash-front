'use client';
import Message from "@/constants/message";
import { useMainContext } from "@/context/mainContext";
import Badge from "@/components/Badge";
import PopupLastCode from "@/components/Popups/PopupLastCode";
import Product from "@/assets/svg/Product";

export default function Header() {
  const context = useMainContext();

  function handleClickBadge() {
    context.openCards = true;
  }
  function handleCloseScanQR() {
    context.openCards = false;
  }
  function handleClickClear() {
    const okay = confirm(Message.Click_Ok_Clear);
    if (okay) {
      context.cards = [];
      context.openCards = false;
      window.location.reload();
    }
  }

  return (<>
    <header
      className="w-full min-h-18 flex items-center justify-center bg-back border-b px-4">
      <div className="w-full max-w-114 relative flex items-center justify-center gap-x-1.5">
        <h2 className="font-bold text-[2rem] tracking-[25%]">FLASH</h2>
        {context.cards && context.cards.length > 0 && <button
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full transition-bg-white"
          onClick={handleClickBadge}>
          <Product />
        </button>}
      </div>
    </header>
    <PopupLastCode
      onClose={handleCloseScanQR}
      onClickMask={handleCloseScanQR}
      onClickClear={handleClickClear}
    />
  </>);
}
