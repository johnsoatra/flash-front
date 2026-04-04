export default function Badge({
  amount,
}: {
  amount: number;
}) {
  return (
    <span className="w-4 h-4 absolute -top-3 -right-1 flex justify-center items-center bg-danger rounded-full">
      <span className="text-xs font-medium text-white">{amount}</span>
    </span>
  );
}
