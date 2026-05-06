import Shimmer from "@/components/Shimmer";

function ShimmerButton() {
  return (
    <Shimmer className="w-[67.57%] h-8.5" />
  );
}

export default function ShimmerArticle() {
  return (
    <div className="w-full max-w-lg flex flex-col items-center gap-y-7.5">
      <ShimmerButton />
      <Shimmer className="w-full h-11" />
      <ShimmerButton />
    </div>
  );
}
