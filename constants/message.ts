import km from "@/lang/km";

const Message = {
  Clear_Your_Card: 'delete card for token',
  Something_Wrong: 'something went wrong',
  Order_Success: 'orders successful',
  Ordering_Card: 'ordering processing',
  Copied_To_Clipboard: 'copy successful',
  No_Transaction_Found: 'no transaction',
  Cannot_Get_Config: 'cannot get config',
} as const satisfies {
  [key: string]: keyof typeof km;
};

export default Message;
