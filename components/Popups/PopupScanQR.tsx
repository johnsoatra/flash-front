import { useEffect, useState } from "react";
import { toast } from "sonner";
import Message from "@/constants/message";
import Popup from "../Popup";
import KhQr from "../KhQr";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import ConfirmCancelQR from "../Confirm/ConfirmCancelQR";
import useGenerateQr from "@/service/useGenerateQr";
import useSaveOrder from "@/service/useSaveOrder";
import { SaveOrderResponse } from "@/dto/saveOrder";
import { AddLockResponse } from "@/dto/addLock";

export default function PopupScanQR({
  open,
  lock,
  onCompletedOrder,
  onExpired,
  onClose,
}: {
  open: boolean;
  lock: AddLockResponse;
  onCompletedOrder: (res: SaveOrderResponse) => void;
  onExpired: () => void;
  onClose: () => void;
}) {
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
  const {
    response: qrCode,
    pending: pendingGenerateQr,
    request: requestGenerateQr,
  } = useGenerateQr();
  const {
    request: requestSaveOrder,
  } = useSaveOrder();

  function handleQrCodeExpired() {
    onExpired();
  }
  function handleSuccessTransaction(transactionId: string) {
    const process = requestSaveOrder({
      transactionId,
    }, {
      alertSomethingWrong: false,
    })
      .then(res => {
        onCompletedOrder(res);
      });
    toast.promise(process, {
      loading: Message.Ordering_Card,
      success: Message.Order_Success,
      error: Message.Something_Wrong,
    });
  }
  function handleClickClose() {
    setOpenConfirmCancel(true);
  }
  function handleConfirmNo() {
    setOpenConfirmCancel(false);
  }
  function handleConfirmYes() {
    setOpenConfirmCancel(false);
    onClose();
  }

  useEffect(() => {
    if (open) {
      requestGenerateQr({
        lockId: lock.id,
      });
    }
  }, [open, lock]);

  return (
    <Popup
      open={open}
      onClickMask={() => { }}
      onClose={handleClickClose}>
      <div className="w-full min-h-67 flex flex-col items-center gap-y-6.5 pt-7 pb-7.5">
        {pendingGenerateQr !== false ?
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
                <span className="text-five text-center text-sm">Scan with any banking app that supports KHQR</span>
              </div>
            </>
        }
      </div>
      <ConfirmCancelQR
        open={openConfirmCancel}
        onClickNo={handleConfirmNo}
        onClickYes={handleConfirmYes}
      />
    </Popup>
  );
}
