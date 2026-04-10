import { useEffect, useState } from "react";
import Popup, { PopupProps } from "../Popup";
import KhQr from "../KhQr";
import QrExpired from "../QrExpired";
import useGenerateQr from "@/service/useGenerateQr";

function GeneratingQrCode() {
  return (
    <p className="w-full text-center">Generating QR Code...</p>
  );
}
function FailGenerateQrCode() {
  return (
    <p className="w-full text-center">Fail to generate QR Code!</p>
  );
}

export default function PopupScanQR(props: Omit<PopupProps, 'children'>) {
  const [showExpired, setShowExpired] = useState(false);
  const {
    data: qrCode,
    pending: pendingGenerateQr,
    request: requestGenerateQr,
  } = useGenerateQr();

  function handleClickTryAgain() {
    requestGenerateQr();
    setShowExpired(false);
  }
  function handleQrCodeExpired() {
    setShowExpired(true);
  }

  useEffect(() => {
    requestGenerateQr();
  }, [props.open]);

  return (
    <Popup {...props}>
      <div className="w-full min-h-50 flex flex-col items-center gap-y-6.5 pt-7 pb-10.5">
        {showExpired ?
          <QrExpired
            disabled={!!pendingGenerateQr}
            onClickTryAgain={handleClickTryAgain} /> :
          pendingGenerateQr !== false ?
            <GeneratingQrCode /> :
            !qrCode ?
              <FailGenerateQrCode /> :
              <>
                <span className="font-medium text-xl text-center">KHQR Payment</span>
                <div className="w-full flex flex-col items-center gap-y-6.5">
                  <KhQr
                    qrCode={qrCode}
                    onExpired={handleQrCodeExpired}
                  />
                  <span className="text-five text-center">Scan with any banking app that supports KHQR</span>
                </div>
              </>
        }
      </div>
    </Popup>
  );
}
