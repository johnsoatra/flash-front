import { useEffect } from "react";
import Image from "next/image";
import useCountdown from "@/hooks/useCountdown";
import { secondToTime } from "@/utils/utils";
import KhQrLogo from "@/assets/svg/KhQrLogo";
import CurrencyRiel from "@/assets/svg/CurrencyRiel";
import Dash from "@/assets/svg/Dash";
import useQrCode from "@/hooks/useQrCode";

function commaSeparator(amount: number) {
  return amount.toLocaleString('en-US');
}

export default function KhQr() {
  const { value: countdown, start: startCountdown } = useCountdown();
  const { value: qrCodeUrl, generate: generateQrCode } = useQrCode();

  useEffect(() => {
    startCountdown(60 * 2.5);
  }, []);
  useEffect(() => {
    generateQrCode('00020101021230510016abaakhppxxx@abaa01151210919202623870208ABA Bank520457325303116540420005802KH5911JOHN');
  }, []);

  return (
    <div className="w-80 aspect-20/29 font-nunito bg-white rounded-2xl overflow-hidden shadow-[0px_0px_16px_0px_rgb(0,0,0,0.1)]">
      <div className="w-full">
        <div className="w-full h-13.75 bg-bk-red flex justify-center items-center">
          <KhQrLogo />
        </div>
        <div className="w-full flex justify-end">
          <div className="w-6.25 aspect-square border-t-25 border-l-25 border-t-bk-red border-l-transparent" />
        </div>
      </div>
      <div className="w-full px-11.5 pb-7">
        <span className="text-xs">FLASH</span>
        <div className="w-full flex items-center justify-between gap-x-1">
          <div className="w-full flex items-center gap-x-1.25">
            <span className="font-bold text-xl">{commaSeparator(1000)}</span>
            <span className="text-xs">KHR</span>
          </div>
          {<span className="font-semibold text-bk-red text-sm">{secondToTime(countdown ?? 0)}</span>}
        </div>
      </div>
      <Dash />
      <div className="w-full relative px-11.5 py-9.25 flex justify-center items-center">
        <div className="w-57 h-57 bg-border">
          {qrCodeUrl && <>
            <Image
              alt="qr-code"
              src={qrCodeUrl}
              width={228}
              height={228}
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CurrencyRiel />
            </span>
          </>}
        </div>
      </div>
    </div>
  );
}
