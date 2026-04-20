import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Message from "@/constants/message";
import Popup from "../Popup";
import KhQr from "../KhQr";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import ConfirmCancelQR from "../Confirm/ConfirmCancelQR";
import Blocker from "../Blocker";
import useGenerateQr from "@/service/useGenerateQr";
import useSaveOrder from "@/service/useSaveOrder";
import useCheckTransaction from "@/service/useCheckTransaction";
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
    pending: checkingTransaction,
    request: requestCheckTransaction,
  } = useCheckTransaction();
  const {
    pending: savingOrder,
    request: requestSaveOrder,
  } = useSaveOrder();

  const processing = useMemo(() => {
    return !!checkingTransaction || !!savingOrder;
  }, [checkingTransaction, savingOrder]);

  async function checkTransaction() {
    return requestCheckTransaction({
      qrId: qrCode?.id ?? '',
    })
      .then(res => {
        if (res.verified) {
          saveOrder(res.transaction_id);
          return true;
        }
        toast.error(Message.No_Transaction_Found);
        return false;
      });
  }
  function saveOrder(transactionId: string) {
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
  function handleQrCodeExpired() {
    checkTransaction()
      .then(success => {
        if (!success) {
          onExpired();
        }
      })
      .catch(error => {
        console.log(error);
        onExpired();
      });
  }
  function handleClickVerify() {
    checkTransaction();
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
  function resetStates() {
    setOpenConfirmCancel(false);
  }

  useLayoutEffect(() => {
    if (open) {
      resetStates();
    }
  }, [open]);
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
      <div className="w-full min-h-67 flex flex-col items-center pt-7 pb-7.5">
        {pendingGenerateQr !== false ?
          <CenterCol><StatusText>Generating QR Code...</StatusText></CenterCol> :
          !qrCode ?
            <CenterCol><StatusText>Fail to generate QR Code!</StatusText></CenterCol> :
            <div className="w-full flex flex-col items-center">
              <span className="font-medium text-xl text-center">KHQR Payment</span>
              <div className="w-full flex justify-center mt-6.5">
                <KhQr
                  qrCode={qrCode}
                  onExpired={handleQrCodeExpired}
                />
              </div>
              <span className="text-five text-center text-sm mt-4">
                Scan with any banking app that supports KHQR,<br />
                then click <span className="font-medium uppercase">Verify Transaction</span> to verify your payment.
              </span>
              <button
                title="Let us know your transaction"
                disabled={!!checkingTransaction}
                className="rounded-xl py-1.5 px-8 mt-6 text-back tran-bg-front"
                onClick={handleClickVerify}>
                Verify Transaction
              </button>
            </div>
        }
      </div>
      <ConfirmCancelQR
        open={openConfirmCancel}
        onClickNo={handleConfirmNo}
        onClickYes={handleConfirmYes}
      />
      {processing && <Blocker className="rounded-xl" />}
    </Popup>
  );
}
