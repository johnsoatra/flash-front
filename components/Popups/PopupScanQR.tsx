import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Message from "@/constants/message";
import Popup from "../Popup";
import KhQr from "../KhQr";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import ButtonVerifyTransaction from "../ButtonVerifyTransaction";
import ConfirmCancelQR from "../Confirm/ConfirmCancelQR";
import Blocker from "../Blocker";
import useGenerateQr from "@/service/useGenerateQr";
import useSaveOrder from "@/service/useSaveOrder";
import useCheckTransaction from "@/service/useCheckTransaction";
import { SaveOrderResponse } from "@/dto/saveOrder";
import { AddLockResponse } from "@/dto/addLock";
import useTranslate from "@/hooks/useTranslate";

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
  const t = useTranslate();
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
        toast.error(t(Message.No_Transaction_Found));
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
      loading: t(Message.Ordering_Card),
      success: t(Message.Order_Success),
      error: t(Message.Something_Wrong),
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
    if (qrCode) {
      setOpenConfirmCancel(true);
    } else {
      onClose();
    }
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
          <CenterCol><StatusText>{t('generating qr code')}</StatusText></CenterCol> :
          !qrCode ?
            <CenterCol><StatusText>{t('fail generate qr code')}</StatusText></CenterCol> :
            <div className="w-full flex flex-col items-center">
              <span className="font-medium text-xl text-center">{t('khqr payment')}</span>
              <div className="w-full flex justify-center mt-6.5">
                <KhQr
                  qrCode={qrCode}
                  onExpired={handleQrCodeExpired}
                />
              </div>
              <span className="text-five text-center text-sm mt-4">
                {t('click verify transaction')}
              </span>
              <div className="mt-6">
                <ButtonVerifyTransaction
                  disabled={!!checkingTransaction}
                  onClick={handleClickVerify}
                />
              </div>
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
