import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useMainContext } from "@/context/mainContext";
import Popup, { PopupProps } from "../Popup";
import useGetCard from "@/service/useGetCard";
import { ProviderCode } from "@/constants";
import useQrCode from "@/hooks/useQrCode";
import StatusText from "../StatusText";

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
      generateCardQrCode(cardCode);
    }
  }, [cardCode]);

  return (
    <Popup
      open={context.openLastCard ?? false}
      {...props}>
      <div className="w-full flex flex-col items-center gap-y-6 pt-6 text-center">
        <h3 className="text-xl underline underline-offset-4">Your Last Top up Card</h3>
        {gettingCard !== false ?
          <StatusText>Getting card...</StatusText> :
          !card ?
            <StatusText>Fail to get card!</StatusText> :
            <>
              <div className="w-full flex flex-col items-center gap-y-5">
                <div className="flex flex-col items-center gap-y-1">
                  <span className="text-xl">Enter Code</span>
                  <span className="text-lg">{cardCode}</span>
                </div>
                <hr className="w-full max-w-83" />
                <div className="flex flex-col items-center gap-y-1">
                  <span className="text-xl">Scan QR code</span>
                  <Image
                    alt="card-qr-code"
                    src={cardQrCode!}
                    sizes="100%"
                    width={204}
                  />
                </div>
              </div>
              <button
                className="self-end uppercase border rounded-xl px-4 py-0.5"
                onClick={onClickClear}>
                Clear
              </button>
            </>
        }
      </div>
    </Popup>
  )
}
