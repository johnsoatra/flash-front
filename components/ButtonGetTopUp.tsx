import React from "react";

export default function ButtonGetTopUp({
  onClick,
}: {
  onClick: (evt: React.MouseEvent) => void;
}) {
  return (
    <button
      title="Show qr code to scan"
      className="border border-good rounded-xl py-1 px-8 tran-bg-back text-xl text-good text-center"
      onClick={onClick}>
      Get 1$ Top Up
    </button>
  );
}
