import React from "react";

export default function ButtonGetTopUp({
  onClick,
}: {
  onClick: (evt: React.MouseEvent) => void;
}) {
  return (
    <button
      className="border border-good rounded-xl py-1 px-8 bg-back font-medium text-xl text-good text-center"
      onClick={onClick}>
      Get 1$ Top Up
    </button>
  );
}
