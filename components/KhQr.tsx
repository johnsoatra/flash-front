import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMainContext } from "@/context/mainContext";
import Config from "@/constants/config";
import KhQrLogo from "@/assets/svg/KhQrLogo";
import CurrencyRiel from "@/assets/svg/CurrencyRiel";
import Dash from "@/assets/svg/Dash";
import useCountdown from "@/hooks/useCountdown";
import useQrCode from "@/hooks/useQrCode";
import useTimeout from "@/hooks/useTimeout";
import useSignal from "@/hooks/useSignal";
import useUnmounted from "@/hooks/useUnmounted";
import { GenerateQrResponse } from "@/dto/generateQr";
import { commaSeparator, secondToTime } from "@/utils/utils";
import useCheckTransaction from "@/service/useCheckTransaction";

export default function KhQr({
  qrCode,
  onExpired,
  onSuccess,
}: {
  qrCode: GenerateQrResponse;
  onExpired: () => void;
  onSuccess: (transactionId: string) => void;
}) {
  const context = useMainContext();
  const timeout = useTimeout(['checkTransaction']);
  const signal = useSignal();
  const unmounted = useUnmounted();
  const { value: countdown, start: startCountdown } = useCountdown();
  const { value: qrCodeUrl, generate: generateQrCode } = useQrCode();
  const { request: requestCheckTransaction } = useCheckTransaction();
  const expired = useRef<boolean>(undefined);

  async function checkTransaction() {
    return requestCheckTransaction({
      qrId: qrCode.id,
    }, {
      signal: signal.value,
    })
      .then(res => {
        if (res.verified) {
          onSuccess(res.transaction_id);
          return true;
        }
      });
  }

  useEffect(() => {
    expired.current = undefined;
    generateQrCode(qrCode.data.data.qr)
      .then(() => {
        const duration = Math.floor((qrCode.expired_at - Date.now()) / 1000);
        startCountdown(duration);
      });
  }, [qrCode]);
  useEffect(() => {
    if (countdown !== undefined) {
      expired.current = countdown === 0;
    }
  }, [countdown]);
  useEffect(() => {
    if (qrCodeUrl) {
      function job() {
        timeout.checkTransaction = setTimeout(() => {
          checkTransaction()
            .then(success => {
              if (!success) {
                if (!expired.current && !unmounted.value) {
                  job();
                } else {
                  checkTransaction().finally(onExpired);
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }, Config.DelayCheckTransaction);
      }
      job();
      return () => {
        clearTimeout(timeout.checkTransaction);
        signal.renew();
      }
    }
  }, [qrCodeUrl]);

  return (
    <div className="w-full max-w-80 font-nunito bg-white rounded-2xl border border-border/50 overflow-hidden shadow-[0px_0px_16px_0px_rgb(0,0,0,0.1)]">
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
            <span className="font-bold text-xl">{commaSeparator(context.config?.card_price ?? 0)}</span>
            <span className="text-xs">KHR</span>
          </div>
          {<span className="font-semibold text-bk-red text-sm">{secondToTime(countdown ?? 0)}</span>}
        </div>
      </div>
      <Dash />
      <div className="w-full relative px-11.5 py-9.25 flex justify-center items-center">
        <div className="w-50 h-50 bg-border">
          {qrCodeUrl && <>
            <Image
              alt="qr-code"
              src={qrCodeUrl}
              width={200}
              height={200}
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
