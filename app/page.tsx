'use client';
import { useEffect, useState } from "react";
import { useMainContext } from "@/context/mainContext";
import ButtonGetTopUp from "@/components/ButtonGetTopUp";
import Guideline from "@/components/Section/Guideline";
import PopupScanQR from "@/components/Popups/PopupScanQR";
import PopupQrExpired from "@/components/Popups/PopupQrExpired";
import Blocker from "@/components/Blocker";
import ShimmerArticle from "@/components/Shimmer/ShimmerArticle";
import useAvailableCardAmount from "@/service/useAvailableCardAmount";
import useIsAllowed from "@/service/useIsAllowed";
import useAddLock from "@/service/useAddLock";
import useRemoveLock from "@/service/useRemoveLock";
import { SaveOrderResponse } from "@/dto/saveOrder";
import useTranslate from "@/hooks/useTranslate";

export default function Home() {
  const context = useMainContext();
  const [openScanQR, setOpenScanQR] = useState(false);
  const [openQrExpired, setOpenQrExpired] = useState(false);
  const [boughtNew, setBoughtNew] = useState(false);
  const t = useTranslate();
  const {
    data: lock,
    pending: locking,
    request: requestAddLock,
  } = useAddLock();
  const {
    pending: removingLock,
    request: requestRemoveLock,
  } = useRemoveLock();
  const {
    data: availableAmount,
    request: requestAvailableAmount,
  } = useAvailableCardAmount();
  const {
    data: allowedOrder,
    request: requestAllowedOrder,
  } = useIsAllowed();

  function openQr() {
    requestAddLock()
      .then(() => {
        setOpenScanQR(true);
      });
  }
  function handleClickGetTopUp() {
    openQr();
  }
  function handleCloseScanQR() {
    setOpenScanQR(false);
  }
  function handleCompletedOrder(res: SaveOrderResponse) {
    context.cards.push(res.card.id);
    context.openCards = true;
    context.checkedCard = false;
    setOpenScanQR(false);
    setBoughtNew(true);
  }
  function handleExpiredQr() {
    setOpenScanQR(false);
    setOpenQrExpired(true);
  }
  function handleCloseQrExpired() {
    setOpenQrExpired(false);
  }
  function handleClickTryAgain() {
    setOpenQrExpired(false);
    openQr();
  }

  useEffect(() => {
    if (context.token) {
      requestAllowedOrder()
        .then(res => {
          if (res.allowed) {
            requestAvailableAmount();
          }
        });
    }
  }, [context.token]);
  useEffect(() => {
    if (!openScanQR && lock) {
      requestRemoveLock({
        lockId: lock.id,
      }, {
        alertSomethingWrong: false,
      });
    }
  }, [openScanQR, lock]);

  return (
    <div className="w-full flex flex-col items-center mt-12 mb-15">
      <div className="w-full max-w-168.5 flex flex-col items-center gap-y-12.5">
        <h1 className="text-5xl text-center">
          {t('flash hero title')(context.config?.card_price ?? 0)}
        </h1>
        {allowedOrder ?
          ((allowedOrder.allowed && !boughtNew) ?
            (availableAmount ?
              (availableAmount.amount === 0 ?
                <p>{t('no card left')}</p> :
                <>
                  <ButtonGetTopUp onClick={handleClickGetTopUp} />
                  <p className="text-center text-4xl">
                    {t('card only left')(availableAmount.amount)}
                  </p>
                </>
              ) :
              <ShimmerArticle />
            ) :
            <div className="text-center">
              <p>{t('already ordered')}</p>
              <p>{t('check next month')}</p>
            </div>
          ) :
          <ShimmerArticle />
        }
      </div>
      <hr className="w-full mt-12 mb-11" />
      <Guideline />
      {lock && <PopupScanQR
        open={openScanQR}
        lock={lock}
        onExpired={handleExpiredQr}
        onClose={handleCloseScanQR}
        onCompletedOrder={handleCompletedOrder}
      />}
      <PopupQrExpired
        open={openQrExpired}
        onClose={handleCloseQrExpired}
        onClickMask={handleCloseQrExpired}
        handleClickTryAgain={handleClickTryAgain}
      />
      {!!locking || !!removingLock && <Blocker />}
    </div>
  )
}
