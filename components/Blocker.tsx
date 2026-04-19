import HalfCircle from "@/assets/svg/HalfCircle";

export default function Blocker({
  className,
}: {
  className?: string,
}) {
  return (
    <div className={"absolute inset-0 flex justify-center items-center bg-white/30 " + (className ?? '')}>
      <HalfCircle className="animate-spin"/>
    </div>
  );
}
