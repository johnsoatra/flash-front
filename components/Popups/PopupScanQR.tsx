import Image from "next/image";
import SampleScanQR from '@/assets/images/sample-scan-qr.png';
import Popup, { PopupProps } from "../Popup";

export default function PopupScanQR(props: Omit<PopupProps, 'children'>) {
  return (
    <Popup {...props}>
      <div className="w-full flex flex-col items-center gap-y-5 pt-13 pb-10.5">
        <KhQr />
        <span className="text-center">
          Please scan this QR code to get the card top up code
        </span>
      </div>
    </Popup>
  )
}
