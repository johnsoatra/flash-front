'use client'
import { useEffect, useMemo, useState } from "react";
import { useMainContext } from "@/context/mainContext";
import ButtonGetTopUp from "@/components/ButtonGetTopUp";
import PopupScanQR from "@/components/Popups/PopupScanQR";
import PopupQrExpired from "@/components/Popups/PopupQrExpired";
import useAvailableCardAmount from "@/service/useAvailableCardAmount";
import useIsAllowed from "@/service/useIsAllowed";
import useAddLock from "@/service/useAddLock";
import useRemoveLock from "@/service/useRemoveLock";
import { SaveOrderResponse } from "@/dto/saveOrder";

export default function Home() {
  const context = useMainContext();
  const [openScanQR, setOpenScanQR] = useState(false);
  const [openQrExpired, setOpenQrExpired] = useState(false);
  const [boughtNew, setBoughtNew] = useState(false);
  const { data: lock, request: requestAddLock } = useAddLock();
  const { request: requestRemoveLock } = useRemoveLock();
  const {
    data: availableAmount,
    request: requestAvailableAmount,
  } = useAvailableCardAmount();
  const {
    data: allowedOrder,
    request: requestAllowedOrder,
  } = useIsAllowed();

  const cardWord = useMemo(() => {
    if (availableAmount) {
      if (availableAmount.amount > 1) {
        return 'cards';
      }
      return 'card';
    }
  }, [availableAmount]);

  function openQr() {
    context.openProcessing = true;
    requestAddLock()
      .then(() => {
        setOpenScanQR(true);
      })
      .finally(() => {
        context.openProcessing = false;
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
        lockId: lock.lock_id,
      }, {
        alertSomethingWrong: false,
      });
    }
  }, [openScanQR, lock]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-168.5 flex flex-col items-center gap-y-16 mt-12 mb-5">
        <h1 className="text-5xl text-center">
          Flash provides you one<br />
          <b>Smart $1 Top Up Card</b> every month for only <b>៛{context.config?.card_price}</b>
        </h1>
        {allowedOrder && ((allowedOrder.allowed && !boughtNew) ?
          (availableAmount && (availableAmount.amount === 0 ?
            <p>There are no card left.</p> :
            <>
              <ButtonGetTopUp onClick={handleClickGetTopUp} />
              <p className="text-center text-4xl">
                There are only <span className="text-[4rem]">{availableAmount.amount}</span> {cardWord} left.
              </p>
            </>
          )) :
          <div className="text-center">
            <p>You've already made an order for this month.</p>
            <p>Please check again on next month.</p>
          </div>
        )}
      </div>
      {lock && <PopupScanQR
        open={openScanQR}
        lock={lock}
        onClose={handleCloseScanQR}
        onClickMask={handleCloseScanQR}
        onCompletedOrder={handleCompletedOrder}
        onExpired={handleExpiredQr}
      />}
      <PopupQrExpired
        open={openQrExpired}
        onClose={handleCloseQrExpired}
        onClickMask={handleCloseQrExpired}
        handleClickTryAgain={handleClickTryAgain}
      />
    </div>
  )
}
