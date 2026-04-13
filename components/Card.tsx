import Image from "next/image";
import { toast } from "sonner";
import { ProviderCode } from "@/constants";
import Message from "@/constants/message";
import { GetCardData } from "@/dto/getCard";
import Dollar1 from "@/assets/svg/Dollar1";
import { localDate } from "@/utils/date.";
import { fullCardCode } from "@/utils/card";

export default function Card({
  card,
}: {
  card: GetCardData;
}) {
  function handleClickCard() {
    navigator.clipboard
    .writeText(fullCardCode(card))
    .then(() => {
      toast.success(Message.Copied_To_Clipboard, { position: 'top-right' });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <div
      className="w-67.75 h-19 group flex items-center bg-smart rounded-2xl cursor-default"
      onClick={handleClickCard}>
      <div className="flex-1 text-white flex flex-col items-center justify-center gap-y-1.25">
        <p className="text-xs leading-none!">{ProviderCode[card.provider]}</p>
        <p className="w-9 h-9 flex items-center justify-center bg-white/25">
          <Dollar1 />
        </p>
      </div>
      <div className="w-54.75 relative self-stretch flex items-center justify-center px-2 bg-white border-t border-r border-b border-smart rounded-tr-2xl group-hover:bg-light-gray group-active:bg-dark-gray">
        <span className="absolute top-0 left-2 text-smart font-semibold capitalize">{card.provider}</span>
        <div className="flex items-center justify-between gap-x-2.25">
          <span>{card.code}#</span>
          <Image
            alt='qr-code'
            src='/qr-code.png'
            width={38}
            height={38}
          />
        </div>
        <span className="absolute bottom-0 right-2 text-[0.5rem] text-five">expired date: {localDate(card.expired_date)}</span>
        <div className="absolute left-0 bottom-0">
          <div className="w-6 h-6 border-b-[1.5rem] border-r-[1.5rem] border-b-smart border-r-transparent"/>
        </div>
      </div>
    </div>
  );
}
