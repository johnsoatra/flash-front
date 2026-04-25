'use client';
import { useState } from "react";
import { useMainContext } from "@/context/mainContext";
import Product from "@/assets/svg/Product";
import PopupCards from "@/components/Popups/PopupCards";
import Badge from "@/components/Badge";
import ConfirmClearCards from "@/components/Confirm/ConfirmClearCards";
import useTranslate from "@/hooks/useTranslate";

export default function Header() {
  const context = useMainContext();
  const t = useTranslate();
  const [openClearCards, setOpenClearCards] = useState(false);

  function handleClickBadge() {
    context.openCards = true;
    context.checkedCard = true;
  }
  function handleCloseScanQR() {
    context.openCards = false;
  }
  function handleClickClear() {
    setOpenClearCards(true);
  }
  function handleClickNo() {
    setOpenClearCards(false);
  }
  function handleClickYes() {
    context.cards = [];
    context.openCards = false;
    setOpenClearCards(false);
    window.location.reload();
  }

  return (<>
    <header
      className="w-full min-h-18 flex items-center justify-center bg-back border-b px-4">
      <div className="w-full max-w-114 relative flex items-center justify-center gap-x-1.5">
        <h2 className="font-bold text-[2rem] tracking-[25%] font-poppins">FLASH</h2>
        {context.cards.length > 0 && <button
          title={t('show cards')}
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full tran-bg-back"
          onClick={handleClickBadge}>
          <Product />
          {!context.checkedCard && <Badge />}
        </button>}
      </div>
    </header>
    <PopupCards
      onClose={handleCloseScanQR}
      onClickMask={handleCloseScanQR}
      onClickClear={handleClickClear}
    />
    <ConfirmClearCards
      open={openClearCards}
      onClickNo={handleClickNo}
      onClickYes={handleClickYes}
    />
  </>);
}
