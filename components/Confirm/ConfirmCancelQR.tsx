import Confirm from "../Confirm";

export default function ConfirmCancelQR({
  open,
  onClickNo,
  onClickYes,
}: {
  open: boolean;
  onClickNo: () => void;
  onClickYes: () => void;
}) {
  return (
    <Confirm
      open={open}
      title='Cancel Scanning!'
      description={
        <span>
          Are you sure to close this qr code scanning?<br />
          Since you haven’t <span className="font-medium">verified transaction</span> yet.
        </span>
      }
      danger={true}
      onClickNo={onClickNo}
      onClickYes={onClickYes}
    />
  );
}
