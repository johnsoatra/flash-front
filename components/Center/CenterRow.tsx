import React from "react";

export default function CenterRow(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={"self-center flex-1 flex justify-center items-center " + (props.className ?? '')}
    />
  );
}
