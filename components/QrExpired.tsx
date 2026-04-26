import useTranslate from "@/hooks/useTranslate";

export default function QrExpired({
  onClickTryAgain,
}: {
  onClickTryAgain: () => void;
}) {
  const t = useTranslate();
  return (
    <div className="w-full flex flex-col items-center text-center gap-y-5">
      <div className="w-full flex flex-col items-center gap-y-2.75">
        <span className="text-lg">{t('qr code expired')}</span>
        <span className="text-sm text-five">
          {t('click try again')}
        </span>
      </div>
      <button
        title={t('generate new qr')}
        className="border rounded-xl py-1 px-8 tran-bg-back"
        onClick={onClickTryAgain}>
        {t('try again')}
      </button>
    </div>
  );
}
