import Confirm from "../Confirm";

export default function ConfirmClearCards({
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
      danger={true}
      title='Delete Cards!'
      description={
        <span>
          Once you click "YES" your all cards\'s information will be deleted.
        </span>
      }
      onClickNo={onClickNo}
      onClickYes={onClickYes}
    />
  );
}
