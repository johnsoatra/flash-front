const kh = {
  "page not found": "មិនអាចស្វែងរកទំព័រឃើញ",
  "flash hero title": (cardPrice: number) => <>
    <span className="font-poppins">Flash</span> ផ្ដល់ជូនលោកអ្នកនូវ<br />
    <b>កាតបញ្ចូលទូរស័ព្ទស្មាត<span className="font-poppins">$1</span></b>ជារៀងរាល់ខែក្នុងតម្លៃត្រឹមតែ<b>៛{cardPrice}</b>ប៉ុណ្ណោះ
  </>,
  "no card left": "មិនមានកាតនៅសល់ទេ។",
  "card only left": (amount: number) => {
    return (
      <>
        ចំនួនកាតនៅសល់តែ<span className="text-[4rem]">{amount}</span>សន្លឹកទៀតប៉ុណ្ណោះ។
      </>
    );
  },
  "already ordered": "លោកអ្នកបានធ្វើការជាវរួចរាល់ហើយសម្រាប់ខែនេះ។",
  "check next month": "សូមធ្វើការពិនិត្យម្ដងទៀតនៅខែក្រោយ។",
  "delete card for token": "សូមធ្វើការលុបកាតចាស់ៗរបស់អ្នកសិនមុនពេលបង្កើត token ថ្មី!",
  "something went wrong": "មានអ្វីមួយខុសប្រក្រតី!",
  "orders successful": "អបអរសាទរ! ការជាវរបស់អ្នកទទួលបានជោគជ័យ!",
  "ordering processing": "កំពុងដំណើរការការជាវ...",
  "copy successful": "លេខកូដរបស់កាតត្រូវបានចម្លង!",
  "no transaction": "មិនទាន់មានការទូទាត់សម្រាប់ qr code នេះនៅឡើយ",
  "cannot get config": "មិនអាចទាញយក config បាន",
  "footer notation description": (allowAmount: number) => `
    គេហទំព័រនេះមិនមែនជាអ្នកចែកចាយកាតស្មាតជាផ្លូវការនោះទេ។ គេហទំព័រនេះគ្រាន់តែធ្វើការលក់ជាបណ្ដោះអាសន្ន ដោយផ្ដល់ជូនលោកអ្នកនូវ កាតបញ្ចូលទូរស័ព្ទជាមួយនឹងការបញ្ចុះតម្លៃមួយ។
    យើងផ្ដល់ជូនអ្នកត្រឹមតែ${allowAmount}កាតប៉ុណ្ណោះក្នុងរយៈពេលមួយខែ ហើយមនុស្សម្នាក់អាចធ្វើការជាវបានតែម្ដងប៉ុណ្ណោះ។
  `,
  "notation": "កំណត់សម្គាល់",
  "contacts": "ទំនាក់ទំនង",
  "email": "អ៊ីម៉ែល: flashcontact10@gmail.com",
  "sure close scan": () => <>
    តើអ្នកពិតជាចង់បិទការស្កែននេះមែនទេ?<br />
    អ្នកមិនទាន់បានចុច<span className="font-medium">ផ្ទៀងផ្ទាត់ការទូទាត់</span>នៅឡើយ។
  </>,
  "cancel scanning": "បិទការស្កែន!",
  "delete card": "លុបកាត!",
  "click yes delete": "ពេលដែលអ្នកចុចយក\"ព្រម\"នោះព័ត៌មានកាតរបស់អ្នកនឹងត្រូវបានលុបចោល។",
  "getting cards": "កំពុងទាញយកកាត...",
  "fail get cards": "មិនអាចទាញយកព័ត៌មានកាតបាន!",
  "no card found": "ស្វែងរកមិនឃើញកាត!",
  'delete all': (cardLength: number) => `លុបចោល${cardLength > 1 ? 'ទាំងអស់' : ''}`,
  "delete your cards": "លុបចោលកាតរបស់អ្នក",
  "qr code expired": "ផុតកំណត់ QR Code!",
  "generating qr code": "កំពុងទាញយក qr code...",
  "fail generate qr code": "មិនអាចទាញយក qr code បាន!",
  "click try again": () => <>
    ចុច<span className="font-medium uppercase">ព្យាយាមម្ដងទៀត</span>ដើម្បីទាញយក qr code ថ្មី
  </>,
  "try again": "ព្យាយាមម្ដងទៀត",
  "khqr payment": "ការបង់ប្រាក់តាម KHQR",
  "click verify transaction": () => <>
    ស្កែនជាមួយកម្មវិធីធនាគារដែលគាំទ្រ KHQR<br />
    បន្ទាប់មកសូមចុច<span className=" font-bold uppercase">ផ្ទៀងផ្ទាត់ការទូទាត់</span>ដើម្បីផ្ទៀងផ្ទាត់ការបង់ប្រាក់របស់អ្នក។
  </>,
  'verify transaction': 'ផ្ទៀងផ្ទាត់ការទូទាត់',
  'buy card': 'ទិញកាតមួយ',
  'expired date': 'ថ្ងៃខែផុតកំណត់:',
  'yes': 'ព្រម',
  'no': 'ទេ',
  "tell your payment": "ឆែកការបង់ប្រាក់របស់អ្នក",
  "proceed action": "ធ្វើប្រតិបត្តិការ",
  "cancel action": "បោះបង់ប្រតិបត្តិការ",
  "close popup": "បិទ popup",
  "generate new qr": "បង្កើត qr code ថ្មី",
  "show cards": "បង្ហាញកាតរបស់អ្នក",
  "show qr": "បើក qr code",
};

export default kh;
