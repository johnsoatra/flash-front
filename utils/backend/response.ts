import { Status } from "@/constants/configs";
import { NextResponse } from "next/server";

export function forbidden(message: string) {
  return NextResponse.json({ message }, { status: Status.Forbidden });
}

export function okay(json: Record<any, any>) {
  return NextResponse.json(json);
}
