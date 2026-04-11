import React from "react";

export default function CenterCol(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={"w-full flex-1 flex justify-center items-center " + (props.className ?? '')}
    />
  );
}
