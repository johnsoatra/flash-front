import Image from "next/image";
import SampleQRCode from '@/assets/images/sample-qr-code.png';
import Popup, { PopupProps } from "../Popup";

export default function PopupLastCode({
  onClickClear,
  ...props
}: Omit<PopupProps, 'children'> & {
  onClickClear: () => void;
}) {
  return (
    <Popup {...props}>
      <div className="w-full flex flex-col items-center gap-y-6 pt-6 text-center">
        <h3 className="text-xl underline underline-offset-4">Your Last Top up Card</h3>
        <div className="w-full flex flex-col items-center gap-y-5">
          <div className="flex flex-col items-center gap-y-1">
            <span className="text-xl">Enter Code</span>
            <span className="text-lg">*1234*1212198348234#</span>
          </div>
          <hr className="w-full max-w-83" />
          <div className="flex flex-col items-center gap-y-1">
            <span className="text-xl">Scan QR code</span>
            <Image
              alt="code-qr-code"
              src={SampleQRCode}
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
      </div>
    </Popup>
  )
}
