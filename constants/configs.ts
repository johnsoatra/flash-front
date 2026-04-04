export const Status = {
  Forbidden: 403,
  NotFound: 404,
} as const;

export const Message = {
  Cannot_Get_IP_Address: 'Could not get IP address from the requests',
  Cannot_Access_Database: 'Could not access database',
  You_Already_Ordered: 'You already ordered once for this month',
} as const;

export const Column = {
  BuyerIpAddress: 'buyer_ip_address',
  OrderId: 'order_id',
  MonthStamp: 'month_stamp',
}

export const Field = {
  IsAllowed: 'is_allowed',
  AvailableAmount: 'available_amount',
}

export const TableName = {
  Card: 'card',
  Order: 'order'
}

export const Label = {
  LastCardCode: 'last-card-code',
} as const;

export const Amount = {
  Allow_Amount: 4,
  Price_Khmer: 2000,
}
