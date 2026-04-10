'use client'
import { useEffect, useMemo, useState } from "react";
import { Amount } from "@/constants";
import ButtonGetTopUp from "@/components/ButtonGetTopUp";
import PopupScanQR from "@/components/Popups/PopupScanQR";
import { useMainContext } from "@/context/mainContext";
import useAvailableCardAmount from "@/service/useAvailableCardAmount";
import useIsAllowed from "@/service/useIsAllowed";

export default function Home() {
  const [openScanQR, setOpenScanQR] = useState(true);
  const context = useMainContext();
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
  }, [availableAmount])

  function handleClickGetTopUp() {
    setOpenScanQR(true);
  }
  function handleCloseScanQR() {
    setOpenScanQR(false);
  }

  // useEffect(() => {
  //   if (context.tokenExisted) {
  //     requestAvailableAmount().then(res => {
  //       if (res.amount > 0) {
  //         requestAllowedOrder();
  //       }
  //     });
  //   }
  // }, [context.tokenExisted]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-168.5 flex flex-col items-center gap-y-16 mt-12">
        <h1 className="text-5xl text-center">
          Flash provides you one<br />
          <b>Smart 1$ top up card</b> every month for only <b>{Amount.PriceKhmer}៛</b>
        </h1>
        {/* {context.tokenExisted && <>
          {allowedOrder?.allowed && <ButtonGetTopUp onClick={handleClickGetTopUp} />}
          {availableAmount?.amount !== undefined &&
            availableAmount.amount === 0 ?
            <p>There are no card left.</p> :
            <p className="text-center text-4xl">
              There are only <span className="text-[4rem]">{availableAmount?.amount}</span> {cardWord} left.
            </p>}
        </>} */}
      </div>
      <PopupScanQR
        open={openScanQR}
        onClose={handleCloseScanQR}
        onClickMask={handleCloseScanQR}
      />
    </div>
  )
}
