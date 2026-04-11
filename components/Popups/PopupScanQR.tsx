import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import Message from "@/constants/message";
import Popup, { PopupProps } from "../Popup";
import KhQr from "../KhQr";
import QrExpired from "../QrExpired";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
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
    reset: resetGenerateQr,
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
  function handleSuccessTransaction(transactionId: string) {
    const process = requestSaveOrder({
      transactionId,
    }).then(res => {
      props.onCompletedOrder(res);
    });
    toast.promise(process, {
      position: 'top-center',
      loading: Message.Ordering_Card,
      success: Message.Order_Success,
      error: Message.Something_Wrong,
    });
  }

  useEffect(() => {
    if (props.open) {
      requestGenerateQr();
    }
  }, [props.open]);
  useLayoutEffect(() => {
    if (props.open) {
      setShowExpired(false);
      resetGenerateQr();
    }
  }, [props.open]);

  return (
    <Popup {...props}>
      <div className="w-full min-h-67 flex flex-col items-center gap-y-6.5 pt-7 pb-10.5">
        {showExpired ?
          <CenterCol>
            <QrExpired
              disabled={!!pendingGenerateQr}
              onClickTryAgain={handleClickTryAgain}
            />
          </CenterCol> :
          pendingGenerateQr !== false ?
            <CenterCol><StatusText>Generating QR Code...</StatusText></CenterCol> :
            !qrCode ?
              <CenterCol><StatusText>Fail to generate QR Code!</StatusText></CenterCol> :
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
