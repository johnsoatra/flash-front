import km from "./km";

const en: typeof km = {
  "page not found": "404 - Page Not Found",
  "flash hero title": (cardPrice: number) => <>
    Flash provides you one<br />
    <b>Smart $1 Top Up Card</b> every month for only <b>៛{cardPrice}</b>
  </>,
  "no card left": "There are no cards left.",
  "card only left": (cardAmount: number) => {
    const cardWord = cardAmount > 1 ? 'cards' : 'card';
    return (
      <>
        There are only <span className="text-[4rem]">{cardAmount}</span> {cardWord} left.
      </>
    );
  },
  "already ordered": "You've already made an order for this month.",
  "check next month": "Please check again next month.",
  "delete card for token": "Delete all your cards before renewing the token!",
  "something went wrong": "Something went wrong!",
  "orders successful": "Congratulations! Your order was successful!",
  "ordering processing": "Your order is being processed...",
  "copy successful": "Card\'s code was copied successfully!",
  "no transaction": "No transaction found for this QR code",
  "cannot get config": "Could not get config",
  "footer notation description": (allowAmount: number) => `
    This website temporarily sells top up cards at a discounted price.
    It provides only ${allowAmount} cards per month and each person can only get 1 card.
  `,
  "notation": "Note",
  "contacts": "Contacts",
  "email": "Email: flashcontact10@gmail.com",
  "sure close scan": <>
    Are you sure you want to close this QR code scanning?<br />
    Since you haven’t <span className="font-medium">verified transaction</span> yet.
  </>,
  "cancel scanning": "Cancel Scanning!",
  "delete card": "Delete Cards!",
  "click yes delete": <>
    Once you click <span className="font-medium uppercase">yes</span> all your cards' information will be deleted.
  </>,
  "getting cards": "Getting cards...",
  "fail get cards": "Failed to get cards!",
  "no card found": "No card found!",
  'delete all': (cardLength: number) => `delete ${cardLength > 1 ? 'all' : ''}`,
  "delete your cards": "Delete your card(s)",
  "qr code expired": "QR Code Expired!",
  "generating qr code": "Generating QR code...",
  "fail generate qr code": "Failed to generate QR code!",
  "click try again": <>
    Click <span className="font-medium uppercase">Try Again</span> to generate new QR code
  </>,
  "try again": "Try Again",
  "khqr payment": "KHQR Payment",
  "click verify transaction": <>
    Scan with any banking app that supports KHQR,<br />
    then click <span className=" font-bold uppercase">Verify Transaction</span> to verify your payment.
  </>,
  "verify transaction": "Verify Transaction",
  "buy card": "Buy 1 Card",
  "expired date": 'Expired Date:',
  "yes": "Yes",
  "no": "No",
  "tell your payment": "Let us know about your payment",
  "proceed action": "Proceed this action",
  "cancel action": "Cancel this action",
  "close popup": "Close popup",
  "generate new qr": "Generate a new QR code",
  "show cards": "Show your card(s)",
  "show qr": "Show QR code to scan",
  "how to use": "How to use this application",
  "step": (numberOrder: number) => `Step ${numberOrder}:`,
  "click buy button": "Click on this button to open the QR code",
  "scan khqr code": "Scan this QR code with your banking app, then confirm payment",
  "after paid click": "After paying, click on this button",
  "after verified get card": "After verification, you will get a $1 top up card",
  "download qr": "Download QR code",
};

export default en;
