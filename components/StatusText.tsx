import React from "react";

export default function StatusText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full text-center">{children}</div>
  );
}
