import { NextRequest } from "next/server";
import { Column } from "@/constants/configs";
import table from "@/lib/table";
import { monthStamp } from "../utils";

export function getIpAddress(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||   // Cloudflare
    request.headers.get("x-vercel-forwarded-for") // Vercel edge
  );
}
export async function alreadyIpAddress(ipAddress: string) {
  const record = await table.order
    .where('buyer_ip_address', ipAddress)
    .where(Column.MonthStamp, monthStamp())
    .first();
  return !!record;
}
export async function alreadyAccountId(accountId: string) {
  const record = await table.order
    .where('buyer_account_id', accountId)
    .where('month_stamp', monthStamp())
    .first();
  return !!record;
}
