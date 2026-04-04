import { Amount, Column, Message } from "@/constants/configs";
import table from "@/lib/table";
import { monthStamp } from "@/utils/utils";
import { forbidden, okay } from "@/utils/backend/response";

export async function GET() {
  try {
    const orderedCount = await table.order
      .where('month_stamp', monthStamp())
      .limit(Amount.Allow_Amount);
    return okay({
      data: orderedCount,
    });
  } catch {
    return forbidden(Message.Cannot_Access_Database);
  }
}
