export default function Shimmer({
  className,
}: {
  className: string;
}) {
  return (
    <div className={"relative overflow-hidden rounded-xl bg-ec3 " + className}>
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-back/60 to-transparent animate-[shimmer_2s_linear_infinite]" />
    </div>
  );
}
