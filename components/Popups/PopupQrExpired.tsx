import Popup, { PopupProps } from "../Popup";
import QrExpired from "../QrExpired";
import CenterCol from "../Center/CenterCol";

export default function PopupQrExpired({
  handleClickTryAgain,
  ...props
}: Omit<PopupProps, 'children'> & {
  handleClickTryAgain: () => void;
}) {
  return (
    <Popup {...props}>
      <div className="w-full min-h-67 flex flex-col items-center gap-y-6.5 pt-7 pb-7.5">
        <CenterCol>
          <QrExpired onClickTryAgain={handleClickTryAgain} />
        </CenterCol>
      </div>
    </Popup>
  );
}
