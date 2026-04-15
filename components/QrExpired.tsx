export default function QrExpired({
  onClickTryAgain,
}: {
  onClickTryAgain: () => void;
}) {
  return (
    <div className="w-full flex flex-col items-center text-center gap-y-5">
      <div className="w-full flex flex-col items-center gap-y-2.75">
        <span className="text-lg">QR Code Expired</span>
        <span className="text-sm text-five">
          Click <span className="font-medium">Try Again</span> to generate new QR code
        </span>
      </div>
      <button
        className="border rounded-xl py-1 px-8"
        onClick={onClickTryAgain}>
        Try Again
      </button>
    </div>
  );
}
