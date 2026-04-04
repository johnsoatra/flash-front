import { NextRequest } from "next/server";
import { Amount, Column, Message, TableName } from "@/constants/configs";
import { forbidden, okay } from "@/utils/backend/response";
import { getIpAddress } from "@/utils/backend/utils";
import database from "@/lib/database";
import { monthStamp } from "@/utils/utils";

export async function POST(request: NextRequest) {
  const ipAddress = getIpAddress(request);
  if (ipAddress) {
    try {
      const body = await request.json();
      const result = await database.transaction(async (trx) => {
        const card = await trx(TableName.Card).where(Column.OrderId, null).first();
        const order = await trx(TableName.Order).insert({
          card_id: card.id,
          buyer_ip_address: ipAddress,
          buyer_name: body['buyer_name'],
          price: Amount.Price_Khmer,
          month_stamp: monthStamp(),
        }) as any;
        await trx(TableName.Card).update({
          'order_id': order.id
        });
      });
      return okay({
        'success': true
      });
    } catch {
      return forbidden(Message.Cannot_Access_Database);
    }
  }
  return forbidden(Message.Cannot_Get_IP_Address);
}
