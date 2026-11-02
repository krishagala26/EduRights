// Content for Teen Module 5: "The Consumer Teen" (Scams & E-Commerce).
// Pure data, no logic. Matches the structure of Modules 1 and 2.
//
// REVIEW BEFORE LAUNCH:
//  - Check Consumer Protection Act, 2019 & E-Commerce Rules, 2020 wording
//  - Guidelines for Prevention and Regulation of Dark Patterns, 2023 (CCPA)
//  - National Consumer Helpline (1915) and Cyber Crime Helpline (1930)

const consumerRights = {
  slug: 'consumer-rights',
  number: 5,
  emoji: '🛒',
  tone: 'grape',
  title: 'The Consumer Teen',
  topic: 'Digital Consumer Rights',
  coreTheme: 'Consumer Protection Act, 2019 · E-Commerce Rules, 2020 · Spotting scams & dark patterns',
  minutes: '8-10',
  sensitive: false,
  scene: null,

  hook: {
    label: 'Picture this',
    text: 'You order limited-edition sneakers from an Instagram store for ₹999 using UPI. The page vanishes, the tracking link is fake, and a message pops up asking you to scan a QR code for a “instant refund”. What is your next move?',
  },
  note: null,

  /* ---------------- Scenarios ---------------- */
  scenarios: [
    {
      id: 's1',
      title: 'The “too good to be true” sneaker drop',
      context: 'You see a flashy ad on social media: “80% OFF branded sneakers — today only! DM to order, no Cash on Delivery.”',
      messages: [
        { from: 'SneakerDrop_India', side: 'them', text: 'Bro last 1 pair left in your size 🔥 Pay ₹999 on UPI right now to lock it!' },
        { from: 'SneakerDrop_India', side: 'them', text: 'Sorry your payment is stuck in server. Scan this QR code and enter your UPI PIN to receive your ₹999 refund.' },
        { side: 'system', text: 'You are being asked to scan a QR code and enter a UPI PIN to “receive” money.' },
      ],
      steps: [
        {
          id: 'st1',
          prompt: 'The seller asks you to scan a QR code and type your UPI PIN to get a refund. What do you do?',
          choices: [
            {
              id: 'a',
              text: 'Scan it quickly before the refund link expires.',
              rating: 'risky',
              feedback:
                'Never! You NEVER need to scan a QR code or enter a UPI PIN to receive money. Entering your PIN always sends money out of the account.',
            },
            {
              id: 'b',
              text: 'Refuse to scan, take screenshots of the chat and UPI transaction ID, and tell a parent immediately.',
              rating: 'best',
              feedback:
                'Spot on. Recognizing the QR refund trap saves you from losing even more money, and keeping the transaction ID is essential for reporting.',
            },
            {
              id: 'c',
              text: 'Send them another ₹100 to “verify” the bank account like they asked.',
              rating: 'risky',
              feedback:
                'Scammers often ask for a “verification fee” or “release charge” after stealing the first payment. Never send more money to recover lost money.',
            },
          ],
        },
        {
          id: 'st2',
          prompt: 'The page blocks you after taking the initial ₹999. What is the strongest way to act?',
          choices: [
            {
              id: 'a',
              text: 'Report the UPI fraud immediately on 1930 or cybercrime.gov.in and flag the transaction in the UPI app with a parent.',
              rating: 'best',
              feedback:
                'Yes! Reporting financial cyber fraud quickly on 1930 gives banks the best chance to freeze the scammer’s account before the money is withdrawn.',
            },
            {
              id: 'b',
              text: 'Search comments on Instagram for “hackers” who promise to recover stolen money for a fee.',
              rating: 'risky',
              feedback:
                '“Recovery agents” in comment sections are almost always a second wave of scammers targeting people who are already panicked.',
            },
            {
              id: 'c',
              text: 'Do nothing because ₹999 is too small to report.',
              rating: 'okay',
              feedback:
                'It feels easier to let it go, but scammers steal small amounts from thousands of teens. Reporting helps shut down the mule account.',
            },
          ],
        },
      ],
      remember: [
        'You NEVER need to enter a UPI PIN or scan a QR code to receive money or a refund.',
        'Check for a real company name, customer care details and return policy before buying online.',
        'Report payment scams immediately to 1930 or cybercrime.gov.in with a parent.',
      ],
    },
    {
      id: 's2',
      title: 'The fake parcel & defective gadget',
      context: 'You ordered wireless earbuds from a known shopping site, but the box arrives with a cheap plastic toy inside. The app says “No Returns”.',
      messages: [
        { from: 'Support Bot', side: 'them', text: 'This item is marked non-returnable. Ticket closed.' },
        { from: 'Unknown SMS', side: 'them', text: 'IndiaPost Alert: Your replacement parcel is held at warehouse. Click bit.ly/ind-post-kyc to update address in 10 mins.' },
      ],
      steps: [
        {
          id: 'st1',
          prompt: 'First, look at that SMS link (`bit.ly/ind-post-kyc`). What should you do with it?',
          choices: [
            {
              id: 'a',
              text: 'Click it and fill in my address and card details so the parcel arrives.',
              rating: 'risky',
              feedback:
                'That SMS is a classic “smishing” (SMS phishing) trap! Delivery companies do not use random shortened links or ask for card details to fix an address.',
            },
            {
              id: 'b',
              text: 'Do not click the link. Check order status only inside the official shopping app.',
              rating: 'best',
              feedback:
                'Exactly. Always verify delivery updates directly inside the official app or website, never through urgent SMS links.',
            },
            {
              id: 'c',
              text: 'Reply “STOP” to the SMS number.',
              rating: 'okay',
              feedback:
                'Replying confirms to scammers that your number is active. It is safer to ignore, block and report the message.',
            },
          ],
        },
        {
          id: 'st2',
          prompt: 'What about the shopping app saying “No Returns” even though they sent a fake/defective item?',
          choices: [
            {
              id: 'a',
              text: 'Use the unboxing video/photos to escalate to the platform’s Grievance Officer, and if unresolved, file a complaint on the National Consumer Helpline (1915).',
              rating: 'best',
              feedback:
                'Under the Consumer Protection Act, 2019, a “No Return” tag cannot protect a seller who sends a counterfeit, wrong or defective product!',
            },
            {
              id: 'b',
              text: 'Accept it because the page wrote “No Returns” in small print.',
              rating: 'risky',
              feedback:
                'A seller cannot legally refuse a refund or replacement if the product delivered is defective, fake or completely different from what was advertised.',
            },
            {
              id: 'c',
              text: 'Write an angry review and forget about the money.',
              rating: 'okay',
              feedback:
                'A review warns others, but using the Grievance Officer and National Consumer Helpline (1915) actually helps get your refund.',
            },
          ],
        },
      ],
      remember: [
        '“No returns” does NOT apply if the item delivered is fake, damaged or different from the description.',
        'Always record a quick unboxing video when opening expensive online orders.',
        'Every e-commerce platform in India must display a Grievance Officer’s contact details.',
      ],
    },
  ],

  /* ---------------- Facts, cards and bonus ---------------- */
  learn: {
    heading: 'Know the facts',
    intro: 'Online shopping and digital payments are convenient, but the law gives you strong shields against fraud and unfair tricks.',
    cards: [
      {
        id: 'rights',
        emoji: '🛡️',
        title: 'Your 6 Consumer Rights',
        text: 'Under the Consumer Protection Act, 2019, you have the Right to Safety, Right to be Informed, Right to Choose, Right to be Heard, Right to Seek Redressal, and Right to Consumer Awareness.',
      },
      {
        id: 'phishing',
        emoji: '🎣',
        title: 'Phishing & Smishing',
        text: 'Fake emails, DMs or SMS messages pretending to be banks, delivery couriers or game servers. They create fake urgency (“account blocked in 10 mins!”) to steal passwords or OTPs.',
      },
      {
        id: 'upi-trap',
        emoji: '📲',
        title: 'UPI & QR Code Scams',
        text: 'Scanning a QR code or entering a UPI PIN is ONLY for sending money. If someone sends a “collect request” or QR code claiming it will credit a prize or refund, it is a scam.',
      },
      {
        id: 'dark-patterns',
        emoji: '🕸️',
        title: 'Dark Patterns',
        text: 'Sneaky app designs that trick you: fake countdown timers (“Only 1 left!”), hidden extra fees added at the last step (“drip pricing”), or making a subscription easy to join but hard to cancel.',
      },
      {
        id: 'influencers',
        emoji: '📢',
        title: 'Influencer Ads & Fake Reviews',
        text: 'Paid promotions must be clearly labelled as #Ad or #Sponsored. Hiding paid promotions or posting fake 5-star reviews to mislead buyers violates consumer guidelines.',
      },
      {
        id: 'redressal',
        emoji: '🧾',
        title: 'Right to Refund & Redressal',
        text: 'Even if a website says “No Refund”, they are legally required to take back defective, counterfeit or wrong items. Keep invoices, screenshots and unboxing videos as proof.',
      },
    ],
    laws: {
      title: 'The law in plain words',
      rows: [
        {
          law: 'Consumer Protection Act, 2019',
          plain:
            'Protects buyers shopping offline and online. It covers unfair trade practices, misleading advertisements, and defective goods, and set up the Central Consumer Protection Authority (CCPA).',
        },
        {
          law: 'E-Commerce Rules, 2020',
          plain:
            'Requires online shopping platforms to show clear seller details, return/refund rules, country of origin, and the name and contact of a Grievance Officer who must acknowledge complaints within 48 hours.',
        },
        {
          law: 'Dark Patterns Guidelines, 2023',
          plain:
            'Issued under the Consumer Protection Act, these rules ban deceptive UI tricks like false urgency, basket sneaking (adding items without consent), subscription traps, and forced action.',
        },
        {
          law: 'IT Act, 2000 (Section 66D)',
          plain:
            'Makes cheating by personation using a computer or phone (such as fake shopping websites, phishing links and impersonating bank officials) a punishable cyber offence.',
        },
      ],
    },
    bonus: {
      title: 'Level up: bonus facts',
      items: [
        {
          id: 'unboxing',
          emoji: '📦',
          title: 'The Unboxing Video Rule',
          text: 'Before opening an online parcel, take a continuous video showing the shipping label and seal clearly. It is the strongest proof if the box is empty or has the wrong item.',
        },
        {
          id: 'https',
          emoji: '🔒',
          title: 'Myth or fact: “A padlock icon means a website is 100% honest”',
          text: 'Myth. The padlock (HTTPS) only means the connection is encrypted—scammers can buy a padlock for a fake website too! Always check the exact spelling of the web address.',
        },
        {
          id: 'otp-delivery',
          emoji: '🔢',
          title: 'Delivery Cancellation OTPs',
          text: 'Scammers pretend to be delivery agents and ask for an OTP to “cancel or reschedule” an order you never placed. That OTP actually gives them access to your account or wallet.',
        },
        {
          id: 'lootbox',
          emoji: '🎮',
          title: 'In-Game Purchases & Subscriptions',
          text: 'Many “free trial” apps auto-renew into paid monthly plans. Always check active subscriptions in your app store and never save a parent’s card without permission.',
        },
        {
          id: 'nch',
          emoji: '🏛️',
          title: 'How the 1915 Helpline Works',
          text: 'With a parent or guardian, you can log a complaint on the National Consumer Helpline (1915 or consumerhelpline.gov.in) for free before ever needing to go to consumer court.',
        },
        {
          id: 'grievance-time',
          emoji: '⏳',
          title: 'The 48-Hour Rule',
          text: 'Under India’s E-Commerce Rules, an online shopping site’s Grievance Officer must acknowledge your complaint within 48 hours and resolve it within 1 month.',
        },
      ],
    },
    helplines: [
      { label: 'National Consumer Helpline', value: '1915', note: 'Call or use the NCH app for disputes with online stores, refunds and defective goods.' },
      { label: 'Cyber Crime Helpline', value: '1930', note: 'Call immediately for UPI scams, phishing fraud or unauthorised money transfers.' },
      { label: 'Emergency', value: '112', note: 'If someone is in immediate physical danger.' },
    ],
    links: [
      {
        label: 'National Consumer Helpline Portal',
        href: 'https://consumerhelpline.gov.in',
        note: 'Official government portal to register consumer grievances online.',
      },
      {
        label: 'National Cyber Crime Reporting Portal',
        href: 'https://cybercrime.gov.in',
        note: 'Official portal to report online financial fraud and phishing.',
      },
    ],
    disclaimer:
      'This is learning material, not legal or financial advice. Always involve a parent or guardian when making digital payments or filing official consumer complaints.',
  },

  /* ---------------- Quiz ---------------- */
  quiz: {
    title: 'The Consumer Teen: quiz',
    questions: [
      {
        id: 'q1',
        prompt: 'A seller sends you a QR code and asks you to enter your UPI PIN to receive a ₹500 refund. What is happening?',
        options: [
          { id: 'a', text: 'It is a fast way to get a refund' },
          { id: 'b', text: 'It is a scam: entering a UPI PIN always deducts money from your account' },
          { id: 'c', text: 'It works only on weekends' },
          { id: 'd', text: 'It is required by the RBI for refunds' },
        ],
        correctOptionId: 'b',
        explanation: 'You never need to scan a QR code or type your UPI PIN to receive money. Entering your PIN authorizes money to leave your account.',
        xp: 20,
      },
      {
        id: 'q2',
        prompt: 'What is a “dark pattern” on a shopping app or website?',
        options: [
          { id: 'a', text: 'Turning on dark mode to save battery' },
          { id: 'b', text: 'A sneaky design trick that manipulates users into buying things or sharing data they did not intend to' },
          { id: 'c', text: 'A discount coupon for night-time shopping' },
          { id: 'd', text: 'An encrypted payment gateway' },
        ],
        correctOptionId: 'b',
        explanation: 'Dark patterns include fake countdown timers, hidden extra fees at checkout, and making subscriptions nearly impossible to cancel.',
        xp: 15,
      },
      {
        id: 'q3',
        prompt: 'You receive a damaged or fake item from an online store, but the page says “No Returns”. Do you still have a right to a refund?',
        options: [
          { id: 'a', text: 'No, “No Returns” overrides every law' },
          { id: 'b', text: 'Yes, under the Consumer Protection Act, 2019, sellers cannot refuse a remedy for defective or counterfeit goods' },
          { id: 'c', text: 'Only if the item costs more than ₹10,000' },
          { id: 'd', text: 'Only if you know the seller personally' },
        ],
        correctOptionId: 'b',
        explanation: 'A “No Return” policy only applies to change-of-mind returns—not when the seller delivers a defective, damaged or fake product.',
        xp: 15,
      },
      {
        id: 'q4',
        prompt: 'Under India’s E-Commerce Rules, 2020, how quickly must a platform’s Grievance Officer acknowledge your complaint?',
        options: [
          { id: 'a', text: 'Within 48 hours' },
          { id: 'b', text: 'Within 6 months' },
          { id: 'c', text: 'Within 1 year' },
          { id: 'd', text: 'They do not have to reply' },
        ],
        correctOptionId: 'a',
        explanation: 'Every e-commerce platform must appoint a Grievance Officer who must acknowledge consumer complaints within 48 hours and resolve them within 1 month.',
        xp: 15,
      },
      {
        id: 'q5',
        prompt: 'Which two helpline numbers should you remember for (1) online UPI/payment fraud and (2) defective e-commerce orders?',
        options: [
          { id: 'a', text: '1930 for cyber payment fraud, and 1915 for the National Consumer Helpline' },
          { id: 'b', text: '101 and 102' },
          { id: 'c', text: '139 and 108' },
          { id: 'd', text: '1800 and 1900' },
        ],
        correctOptionId: 'a',
        explanation: '1930 is the National Cyber Crime Helpline for financial fraud, and 1915 is the National Consumer Helpline for consumer disputes.',
        xp: 20,
      },
      {
        id: 'q6',
        prompt: 'Myth or fact: If a website URL starts with “https://” and shows a padlock icon, the store cannot be a scam.',
        options: [
          { id: 'a', text: 'Fact' },
          { id: 'b', text: 'Myth: scammers can set up HTTPS on fake websites too' },
        ],
        correctOptionId: 'b',
        explanation: 'HTTPS only means the connection between your browser and the site is encrypted; it does not prove the business itself is legitimate.',
        xp: 10,
      },
    ],
  },

  /* ---------------- After the quiz ---------------- */
  action: {
    title: 'Smart shopper checklist',
    intro: 'Build habits that keep your wallet and accounts safe. Tick them off as you go.',
    items: [
      'Save 1915 (National Consumer Helpline) and 1930 (Cyber Crime Helpline) in your phone.',
      'Check your app store and UPI app for any forgotten auto-renewing subscriptions or autopay mandates.',
      'Make it a rule to record an unboxing video whenever a prepaid parcel arrives.',
      'Never click shortened delivery or bank links sent via SMS or WhatsApp.',
      'Show a family member how to spot the “QR code refund” scam.',
    ],
  },
  credential: {
    emoji: '🛒',
    name: 'Smart Consumer',
    text: 'You know your rights under the Consumer Protection Act and can spot online scams and dark patterns.',
  },
};

export default consumerRights;