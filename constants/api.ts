const Api = {
  GenerateToken: 'generate-token',
  IsAllowed: 'is-allowed',
  AvailableCardAmount: 'available-card-amount',
  AddLock: 'add-lock',
  RemoveLock: 'remove-lock',
  GenerateQr: 'generate-qr',
  CheckTransaction: 'check-transaction',
  SaveOrder: 'save-order',
} as const;

export default Api;
