import { useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ProviderCode } from "@/constants";
import Message from "@/constants/message";
import Dollar1 from "@/assets/svg/Dollar1";
import useQrCode from "@/hooks/useQrCode";
import { localDate } from "@/utils/date.";
import { fullCardCode } from "@/utils/card";
import CenterRow from "./Center/CenterRow";
import { type Card } from "@/dto/getCards";

export default function Card({
  card,
}: {
  card: Card;
}) {
  const { value: cardQrCode, generate: generateCardQrCode } = useQrCode();

  function handleClickCard() {
    navigator.clipboard
      .writeText(fullCardCode(card))
      .then(() => {
        toast.message(Message.Copied_To_Clipboard);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    generateCardQrCode(`tel:${encodeURIComponent(fullCardCode(card))}`);
  }, []);

  return (
    <div
      className="w-full min-w-67.75 max-w-104 aspect-[3.57] group flex items-center bg-smart rounded-2xl cursor-default"
      onClick={handleClickCard}>
      <div className="flex-1 text-back flex flex-col items-center justify-center gap-y-1.25">
        <p className="text-xs leading-none! xs:text-base">{ProviderCode[card.provider]}</p>
        <p className="w-9 h-9 flex items-center justify-center bg-back/25 xs:w-11 xs:h-11">
          <Dollar1 />
        </p>
      </div>
      <div className="w-[80%] relative self-stretch flex items-center justify-center px-2 bg-back border-t border-r border-b border-smart rounded-tr-2xl group-hover:bg-light-gray group-active:bg-dark-gray">
        <span className="absolute top-0 left-2 text-smart font-semibold capitalize xs:text-xl">{card.provider}</span>
        <div className="w-full flex items-center justify-between gap-x-2.25">
          <CenterRow className="xs:text-xl">{card.code}#</CenterRow>
          <div className="relative min-w-9.5 min-h-9.5 bg-border xs:w-12.5 xs:h-12.5">
            {cardQrCode && <Image
              alt='qr-code'
              src={cardQrCode}
              fill={true}
            />}
          </div>
        </div>
        <span className="absolute bottom-0 right-2 text-[0.5rem] text-five xs:text-[0.625rem]">expired date: {localDate(card.expired_date)}</span>
        <div className="absolute left-0 bottom-0 -translate-x-px">
          <div className="w-6 h-6 border-b-[1.5rem] border-r-[1.5rem] border-b-smart border-r-transparent" />
        </div>
      </div>
    </div>
  );
}
