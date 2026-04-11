import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useMainContext } from "@/context/mainContext";
import Popup, { PopupProps } from "../Popup";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import useGetCard from "@/service/useGetCard";
import { ProviderCode } from "@/constants";
import useQrCode from "@/hooks/useQrCode";
import { localDate } from "@/utils/date.";

export default function PopupLastCode({
  onClickClear,
  ...props
}: Omit<PopupProps, 'children' | 'open'> & {
  onClickClear: () => void;
}) {
  const context = useMainContext();
  const lastId = useRef<string>(undefined);
  const { value: cardQrCode, generate: generateCardQrCode } = useQrCode();
  const {
    data: card,
    pending: gettingCard,
    request: requestCard,
  } = useGetCard();

  const cardCode = useMemo(() => {
    if (card) {
      return `${ProviderCode[card.provider]}${card.code}#`;
    }
  }, [card]);

  useEffect(() => {
    if (
      context.openLastCard &&
      context.lastCardId &&
      lastId.current !== context.lastCardId
    ) {
      const savedId = context.lastCardId;
      requestCard({
        id: context.lastCardId,
      }).then(() => {
        lastId.current = savedId;
      });
    }
  }, [context.openLastCard, context.lastCardId]);
  useEffect(() => {
    if (cardCode) {
      generateCardQrCode(`tel:${encodeURIComponent(cardCode)}`);
    }
  }, [cardCode]);

  return (
    <Popup
      open={context.openLastCard ?? false}
      {...props}>
      <div className="w-full min-h-67 flex flex-col items-center gap-y-6 pt-6 text-center">
        <h3 className="text-xl underline underline-offset-4">Your Last Top up Card</h3>
        {gettingCard !== false ?
          <CenterCol>
            <StatusText>Getting card...</StatusText>
          </CenterCol> :
          !card ?
            <CenterCol>
              <StatusText>Fail to get card!</StatusText>
            </CenterCol> :
            <div className="w-full flex flex-col gap-y-6">
              <div className="w-full flex flex-col gap-y-2.5">
                <div className="w-full flex flex-col items-center gap-y-5">
                  <div className="flex flex-col items-center gap-y-3">
                    <span className="text-xl">Enter Code</span>
                    <span className="text-lg">{cardCode}</span>
                  </div>
                  <hr className="w-full max-w-83" />
                  <div className="flex flex-col items-center gap-y-3">
                    <span className="text-xl">Scan QR Code</span>
                    <div className="w-51 h-51 bg-border">
                      {cardQrCode && <Image
                        alt="card-qr-code"
                        src={cardQrCode}
                        width={204}
                        height={204}
                      />}
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-5">Expired Date: {localDate(card.expired_date)}</p>
              </div>
              <button
                className="self-start border rounded-xl px-4 py-0.5"
                onClick={onClickClear}>
                Clear
              </button>
            </div>
        }
      </div>
    </Popup>
  )
}
