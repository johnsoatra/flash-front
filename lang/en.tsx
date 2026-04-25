import kh from "./kh";

const en: typeof kh = {
  "page not found": "404 - Page Not Found",
  "flash hero title": (cardPrice: number) => <>
    Flash provides you one<br />
    <b>Smart $1 Top Up Card</b> every month for only <b>៛{cardPrice}</b>
  </>,
  "no card left": "There are no card left.",
  "card only left": (cardAmount: number) => {
    const cardWord = cardAmount > 1 ? 'cards' : 'card';
    return (
      <>
        There are only <span className="text-[4rem]">{cardAmount}</span> {cardWord} left.
      </>
    );
  },
  "already ordered": "You've already made an order for this month.",
  "check next month": "Please check again on next month.",
  "delete card for token": "Delete all your cards before renew token!",
  "something went wrong": "Something went wrong!",
  "orders successful": "Congratulation! Your orders is successfully!",
  "ordering processing": "Ordering card is in processing...",
  "copy successful": "Card\'s code was copied successfully!",
  "no transaction": "No transaction found for this qr code",
  "cannot get config": "Could not get config",
  "footer notation description": (allowAmount: number) => `
    This website dose not officially sell smart top up card, this website temporary provides top up card in discount price.
    It provides only ${allowAmount} cards per month and 1 person could get only 1 card.
  `,
  "notation": "Notation",
  "contacts": "Contacts",
  "email": "Email: flashcontact10@gmail.com",
  "sure close scan": () => <>
    Are you sure to close this qr code scanning?<br />
    Since you haven’t <span className="font-medium">verified transaction</span> yet.
  </>,
  "cancel scanning": "Cancel Scanning!",
  "delete card": "Delete Cards!",
  "click yes delete": "Once you click \"YES\" your all cards's information will be deleted.",
  "getting cards": "Getting cards...",
  "fail get cards": "Fail to get cards!",
  "no card found": "No card found!",
  'delete all': (cardLength: number) => `delete ${cardLength > 1 ? 'all' : ''}`,
  "delete your cards": "Delete your card(s)",
  "qr code expired": "QR Code Expired!",
  "generating qr code": "Generating qr code...",
  "fail generate qr code": "Fail to generate qr code!",
  "click try again": () => <>
    Click <span className="font-medium uppercase">Try Again</span> to generate new qr code
  </>,
  "try again": "Try Again",
  "khqr payment": "KHQR Payment",
  "click verify transaction": () => <>
    Scan with any banking app that supports KHQR,<br />
    then click <span className=" font-bold uppercase">Verify Transaction</span> to verify your payment.
  </>,
  "verify transaction": "Verify Transaction",
  "buy card": "Buy 1 Card",
  "expired date": 'expired date:',
  "yes": "Yes",
  "no": "No",
  "tell your payment": "Let us know your payment",
  "proceed action": "Proceed this action",
  "cancel action": "Cancel this action",
  "close popup": "Close this popup",
  "generate new qr": "Generate new qr code",
  "show cards": "Show your card(s)",
  "show qr": "Show qr code to scan",
};

export default en;
