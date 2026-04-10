import Popup, { PopupProps } from "../Popup";
import KhQr from "../KhQr";

export default function PopupScanQR(props: Omit<PopupProps, 'children'>) {
  return (
    <Popup {...props}>
      <div className="w-full flex flex-col items-center gap-y-6.5 pt-7 pb-10.5">
        <span className="font-medium text-xl text-center">KHQR Payment</span>
        <div className="w-full flex flex-col items-center gap-y-6.5">
          <KhQr />
          <span className="text-five text-center">Scan with any banking app that supports KHQR.</span>
        </div>
      </div>
    </Popup>
  );
}
