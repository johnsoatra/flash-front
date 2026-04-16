const Api = {
  CheckToken: 'check-token',
  ResetToken: 'reset-token',
  GetConfig: 'get-config',
  IsAllowed: 'is-allowed',
  AvailableCardAmount: 'available-card-amount',
  AddLock: 'add-lock',
  RemoveLock: 'remove-lock',
  GenerateQr: 'generate-qr',
  VerifyTransaction: 'verify-transaction',
  SaveOrder: 'save-order',
  GetCards: 'get-cards',
  GetBakongToken: 'get-bakong-token',
  CheckTransaction: 'v1/check_transaction_by_md5',
} as const;

export default Api;
