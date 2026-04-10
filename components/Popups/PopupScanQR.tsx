import { useEffect, useState } from "react";
import Popup, { PopupProps } from "../Popup";
import KhQr from "../KhQr";
import QrExpired from "../QrExpired";
import StatusText from "../StatusText";
import useGenerateQr from "@/service/useGenerateQr";
import useSaveOrder from "@/service/useSaveOrder";
import { SaveOrderResponse } from "@/dto/saveOrder";

export default function PopupScanQR(props: Omit<PopupProps, 'children'> & {
  onCompletedOrder: (res: SaveOrderResponse) => void;
}) {
  const [showExpired, setShowExpired] = useState(false);
  const {
    data: qrCode,
    pending: pendingGenerateQr,
    request: requestGenerateQr,
  } = useGenerateQr();
  const {
    pending: pendingSaveOrder,
    request: requestSaveOrder,
  } = useSaveOrder();

  function handleClickTryAgain() {
    requestGenerateQr();
    setShowExpired(false);
  }
  function handleQrCodeExpired() {
    setShowExpired(true);
  }
  function handleSuccessTransaction(transactionId: number) {
    requestSaveOrder({
      transactionId,
    }).then(res => {
      props.onCompletedOrder(res);
    });
  }

  useEffect(() => {
    if (props.open) {
      requestGenerateQr();
    }
  }, [props.open]);

  return (
    <Popup {...props}>
      <div className="w-full min-h-50 flex flex-col items-center gap-y-6.5 pt-7 pb-10.5">
        {showExpired ?
          <QrExpired
            disabled={!!pendingGenerateQr}
            onClickTryAgain={handleClickTryAgain} /> :
          pendingGenerateQr !== false ?
            <StatusText>Generating QR Code...</StatusText> :
            !qrCode ?
              <StatusText>Fail to generate QR Code!</StatusText> :
              <>
                <span className="font-medium text-xl text-center">KHQR Payment</span>
                <div className="w-full flex flex-col items-center gap-y-6.5">
                  <KhQr
                    qrCode={qrCode}
                    onExpired={handleQrCodeExpired}
                    onSuccess={handleSuccessTransaction}
                  />
                  <span className="text-five text-center">Scan with any banking app that supports KHQR</span>
                </div>
              </>
        }
      </div>
    </Popup>
  );
}
