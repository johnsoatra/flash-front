'use client';
import Popup from "../Popup";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import { useMainContext } from "@/context/mainContext";

export default function PopupProcessing() {
  const context = useMainContext();
  return (
    <Popup
      open={context.openProcessing ?? false}
      noCloseButton={true}
      onClose={() => {}}
      onClickMask={() => {}}>
      <div className="w-full min-h-67 flex flex-col items-center">
        <CenterCol><StatusText>Processing...</StatusText></CenterCol>
      </div>
    </Popup>
  );
}
