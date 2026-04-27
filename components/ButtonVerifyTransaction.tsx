import useTranslate from "@/hooks/useTranslate";

export default function ButtonVerifyTransaction({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  const t = useTranslate();
  return (
    <button
      title={t('tell your payment')}
      disabled={disabled}
      className="rounded-xl py-1.5 px-8 text-back tran-bg-front"
      onClick={onClick}>
      {t('verify transaction')}
    </button>
  );
}
