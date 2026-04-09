'use client'
import { useState } from "react";
import { Amount } from "@/constants/configs";
import ButtonGetTopUp from "@/components/ButtonGetTopUp";
import PopupScanQR from "@/components/Popups/PopupScanQR";

export default function Home() {
  const [openScanQR, setOpenScanQR] = useState(false);

  function handleClickGetTopUp() {
    setOpenScanQR(true);
  }
  function handleCloseScanQR() {
    setOpenScanQR(false);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-168.5 flex flex-col items-center gap-y-16 mt-12">
        <h1 className="text-5xl text-center">
          Flash provides you one<br />
          <b>Smart 1$ top up card</b> every month for only <b>{Amount.PriceKhmer}៛</b>
        </h1>
        <ButtonGetTopUp onClick={handleClickGetTopUp} />
      </div>
      <PopupScanQR
        open={openScanQR}
        onClose={handleCloseScanQR}
        onClickMask={handleCloseScanQR}
      />
    </div>
  )
}
