import React from "react";

export default function ButtonGetTopUp({
  onClick,
}: {
  onClick: (evt: React.MouseEvent) => void;
}) {
  return (
    <button
      className="border border-good rounded-xl py-1 px-8 bg-back"
      onClick={onClick}>
      <span className="font-medium text-xl uppercase text-good text-center">Get 1$ Top Up</span>
    </button>
  );
}
