import useTranslate from "@/hooks/useTranslate";
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
  const t = useTranslate();
  return (
    <Confirm
      open={open}
      danger={true}
      title={t('delete card')}
      description={
        <span>
          {t('click yes delete')}
        </span>
      }
      onClickNo={onClickNo}
      onClickYes={onClickYes}
    />
  );
}
