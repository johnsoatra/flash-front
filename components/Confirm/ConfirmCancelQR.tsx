import useTranslate from "@/hooks/useTranslate";
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
  const t = useTranslate();
  return (
    <Confirm
      open={open}
      title={t('cancel scanning')}
      description={
        <span>
          {t('sure close scan')}
        </span>
      }
      danger={true}
      onClickNo={onClickNo}
      onClickYes={onClickYes}
    />
  );
}
