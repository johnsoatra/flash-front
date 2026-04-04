import { NextRequest } from "next/server";
import { Column, Field, Message } from "@/constants/configs";
import { forbidden, okay } from "@/utils/backend/response";
import { alreadyIpAddress, getIpAddress } from "@/utils/backend/utils";

export async function GET(request: NextRequest) {
  const ipAddress = getIpAddress(request);
  if (ipAddress) {
    try {
      const found = await alreadyIpAddress(ipAddress);
      return okay({
        [Field.IsAllowed]: !found,
      });
    } catch {
      return forbidden(Message.Cannot_Access_Database);
    }
  }
  return forbidden(Message.Cannot_Get_IP_Address);
}
