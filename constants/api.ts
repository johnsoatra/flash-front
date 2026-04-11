const Api = {
  CheckToken: 'check-token',
  ResetToken: 'reset-token',
  IsAllowed: 'is-allowed',
  AvailableCardAmount: 'available-card-amount',
  AddLock: 'add-lock',
  RemoveLock: 'remove-lock',
  GenerateQr: 'generate-qr',
  CheckTransaction: 'check-transaction',
  SaveOrder: 'save-order',
  GetCard: 'get-card/:id',
} as const;

export default Api;
