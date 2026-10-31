// Content for Teen Module 1: "The Digital Fingerprint"
// (Cyber Safety & Data Privacy). Pure data, no logic.
//
// REVIEW BEFORE LAUNCH: this is learning material about real laws. Someone
// should check every fact against the official sources, especially:
//  - IT Rules takedown time for intimate/morphed images (2 hours since the
//    February 2026 amendment; it was 24 hours before)
//  - DPDP Act 2023 / DPDP Rules 2025 wording (rules are being phased in)
//  - IT Act section numbers (66C, 66D, 66E, 67B)

import DigitalFingerprintScene from './DigitalFingerprintScene.js';

const digitalFingerprint = {
  slug: 'digital-fingerprint',
  number: 1,
  emoji: '💻',
  tone: 'mint',
  title: 'The Digital Fingerprint',
  topic: 'Cyber Safety & Data Privacy',
  coreTheme: 'IT Act, 2000 · IT Rules, 2021 (amended 2026) · DPDP Act, 2023',
  minutes: '8-10',
  sensitive: false,
  scene: DigitalFingerprintScene,

  hook: {
    label: 'Picture this',
    text: 'A private photo of a classmate is being forwarded around your class group chat. The phone is in your hand. What happens next depends on you.',
  },
  note: null,

  /* ---------------- Scenarios ---------------- */
  scenarios: [
    {
      id: 's1',
      title: 'The group chat photo',
      context: 'It is 9:40 pm. Your Class 10 group chat (42 people) suddenly gets busy.',
      messages: [
        { from: 'Aditi', side: 'them', text: 'omg has anyone seen what Rohan just posted?? 😳' },
        { from: 'Rohan', side: 'them', text: 'a private pic of Meher from last year. forwarding it to everyone lol' },
        { side: 'system', text: 'A photo Meher never meant to share is now in a chat with 42 people.' },
      ],
      steps: [
        {
          id: 'st1',
          prompt: 'You are in the chat. What do you do first?',
          choices: [
            {
              id: 'a',
              text: 'Forward it to one close friend and ask, “Is this real?”',
              rating: 'risky',
              feedback:
                'Forwarding, even to “just one person”, spreads it further. If a photo is intimate and the person is under 18, sharing it can also be a serious crime under child-protection and IT laws.',
            },
            {
              id: 'b',
              text: 'Do not open, save or forward it. Show the chat to a trusted adult and say you want to report it.',
              rating: 'best',
              feedback:
                'Exactly. Not spreading it is the most important step, and a trusted adult can help report it properly. It is never the fault of the person in the photo.',
            },
            {
              id: 'c',
              text: 'Mute the chat and try to forget about it.',
              rating: 'okay',
              feedback:
                'Muting protects you, but the photo keeps spreading and Meher may not even know. Telling a trusted adult is what helps stop the harm.',
            },
          ],
        },
        {
          id: 'st2',
          prompt: 'A teacher steps in. Meher is upset and asks, “How do I get it taken down?” What helps most?',
          choices: [
            {
              id: 'a',
              text: 'Report it on the app itself, and also at cybercrime.gov.in or by calling 1930.',
              rating: 'best',
              feedback:
                'Yes. Official reports are what trigger removal. Under the IT Rules, platforms must act on complaints about intimate or morphed images within hours (currently 2 hours). Keep the report reference number.',
            },
            {
              id: 'b',
              text: 'Ask everyone in the chat to delete it themselves.',
              rating: 'okay',
              feedback:
                'Asking is kind, but you cannot be sure everyone will delete it. An official report makes the platform remove it.',
            },
            {
              id: 'c',
              text: 'Post publicly to shame everyone who shared it.',
              rating: 'risky',
              feedback:
                'It feels fair, but a public post spreads the story (and sometimes the image) even wider and can hurt Meher more. Use official channels instead.',
            },
          ],
        },
      ],
      remember: [
        'Do not forward, save or comment on a private image, even “just to show someone”.',
        'Tell a trusted adult early, and report on the app and at cybercrime.gov.in or 1930.',
        'It is never the fault of the person in the photo.',
      ],
    },
    {
      id: 's2',
      title: 'The fake account',
      context: 'You are on your way home when a friend messages you.',
      messages: [
        { from: 'Kabir', side: 'them', text: 'bro there is an account with your name AND your photos' },
        { from: 'Kabir', side: 'them', text: 'it is DMing people from our school 😬' },
        { side: 'system', text: 'Someone is pretending to be you online.' },
      ],
      steps: [
        {
          id: 'st1',
          prompt: 'What do you do first?',
          choices: [
            {
              id: 'a',
              text: 'Message the fake account angrily and threaten them.',
              rating: 'risky',
              feedback:
                'Being furious is natural, but it can make things worse and give them more attention. Threats could also get you into trouble.',
            },
            {
              id: 'b',
              text: 'Take screenshots showing the profile link and date, report it as impersonation, and tell a trusted adult.',
              rating: 'best',
              feedback:
                'That is the right toolkit: evidence, a platform report and an adult on your side. Pretending to be someone online can be an offence under the IT Act.',
            },
            {
              id: 'c',
              text: 'Delete all your own accounts so nobody can compare them.',
              rating: 'risky',
              feedback:
                'That does not remove the fake profile, and you would lose your real accounts. Reporting is what gets the fake one removed.',
            },
          ],
        },
        {
          id: 'st2',
          prompt: 'The fake account is removed. You want to make it harder for this to happen again. What helps most?',
          choices: [
            {
              id: 'a',
              text: 'Make your account private, check who can download or tag your photos, remove location tags, and turn on two-step verification.',
              rating: 'best',
              feedback:
                'Privacy settings make your photos harder to copy, and two-step verification protects your real accounts from being taken over.',
            },
            {
              id: 'b',
              text: 'Put a watermark on every photo you post.',
              rating: 'okay',
              feedback:
                'A watermark helps a little, but it does not stop copying. Privacy settings and limiting who sees your photos are stronger.',
            },
            {
              id: 'c',
              text: 'Do nothing. It was just bad luck.',
              rating: 'risky',
              feedback:
                'Some of it is out of your control, but a few settings changes make a big difference.',
            },
          ],
        },
      ],
      remember: [
        'Collect evidence (screenshots with the link and date), report it, and tell a trusted adult.',
        'Do not fight it out in DMs.',
        'Private accounts, strong passwords and less public information make copying harder.',
      ],
    },
  ],

  /* ---------------- Facts, cards and bonus ---------------- */
  learn: {
    heading: 'Know the facts',
    intro: 'Here is what the scenarios were really about. Read the cards, then open the bonus facts.',
    cards: [
      {
        id: 'fingerprint',
        emoji: '👣',
        title: 'Your digital fingerprint',
        text: 'Everything you post, like, search and share leaves data behind: photos, comments, location tags and even how you use apps. Together it builds a picture of you that can last for years.',
      },
      {
        id: 'bullying',
        emoji: '💬',
        title: 'Cyberbullying',
        text: 'Repeated mean, threatening or humiliating behaviour online: nasty comments, fake accounts, group-chat pile-ons or deliberately leaving someone out. It causes real harm and can be reported.',
      },
      {
        id: 'stalking',
        emoji: '🔍',
        title: 'Online stalking',
        text: 'Following someone’s online activity again and again, tracking them, or contacting them after they have said stop. Persistent unwanted contact is a crime.',
      },
      {
        id: 'doxxing',
        emoji: '📍',
        title: 'Doxxing',
        text: 'Sharing someone’s private details, such as their home address, school or phone number, without their consent. It can put that person in danger.',
      },
      {
        id: 'images',
        emoji: '🖼️',
        title: 'Sharing private images',
        text: 'Sharing someone’s private or intimate images without consent, including fake ones made with AI (“deepfakes”), is a serious offence. Platforms must remove it fast once it is reported.',
      },
      {
        id: 'consent',
        emoji: '✅',
        title: 'Digital consent',
        text: 'Ask before you post someone’s photo, tag them or forward their messages. Consent is not a one-time yes: people can change their mind, and the trail you leave can stay for a very long time.',
      },
    ],
    laws: {
      title: 'The law in plain words',
      rows: [
        {
          law: 'IT Act, 2000',
          plain:
            'India’s main cyber law. It covers things like identity theft and cheating by pretending to be someone else (sections 66C and 66D), violating someone’s privacy with images (66E) and child sexual abuse material (67B).',
        },
        {
          law: 'IT Rules, 2021 (amended 2026)',
          plain:
            'Platforms must have a grievance officer and must remove intimate or morphed images quickly after a complaint. Since the 2026 amendment, the deadline is 2 hours.',
        },
        {
          law: 'DPDP Act, 2023 and Rules, 2025',
          plain:
            'A privacy law that is being phased in. Anyone under 18 counts as a child, so companies need a parent’s verifiable consent before using their data, and should not track their behaviour or aim targeted ads at them (with some exceptions, such as for schools and safety).',
        },
        {
          law: 'Criminal law (BNS, 2023)',
          plain: 'Also covers stalking, harassment and threats, online or offline.',
        },
      ],
    },
    bonus: {
      title: 'Level up: bonus facts',
      items: [
        {
          id: 'grandma',
          emoji: '👵',
          title: 'The “grandma test”',
          text: 'Before you post, ask: would I be fine if my grandparent, principal or a future employer saw this? If not, think again.',
        },
        {
          id: 'checkup',
          emoji: '🔎',
          title: 'Check your own fingerprint',
          text: 'Search your name and usernames in quotation marks, find old accounts you forgot about, and use “Download your data” in app settings to see what apps keep about you.',
        },
        {
          id: 'snaps',
          emoji: '👻',
          title: 'Myth or fact: “disappearing messages can’t be saved”',
          text: 'Myth. Anyone can screenshot or screen-record, and some apps keep data longer than you think. Treat every message as permanent.',
        },
        {
          id: 'deepfake',
          emoji: '🤖',
          title: 'Deepfakes',
          text: 'AI tools can make fake images and videos of real people. Making or sharing fake intimate images of someone is harmful and can be a crime. If it happens to you, it is not your fault. Report it.',
        },
        {
          id: 'parents',
          emoji: '👪',
          title: 'Why apps ask for a parent’s consent',
          text: 'Because the law treats everyone under 18 as a child, apps need a parent’s verified consent to use your data. That is about protecting you, not about distrust.',
        },
        {
          id: 'passwords',
          emoji: '🔐',
          title: 'Passwords and OTPs',
          text: 'Use a long, unique password, turn on two-step verification (especially for email), and never share an OTP with anyone.',
        },
      ],
    },
    helplines: [
      { label: 'Cyber crime helpline', value: '1930', note: 'Call to report cyber crimes, including image abuse and fraud.' },
      { label: 'Childline', value: '1098', note: 'Free, 24 hours, for any child who needs help or protection.' },
      { label: 'Emergency', value: '112', note: 'If someone is in immediate danger.' },
    ],
    links: [
      {
        label: 'National Cyber Crime Reporting Portal',
        href: 'https://cybercrime.gov.in',
        note: 'Official portal to report cyber crimes. Best opened with a trusted adult.',
      },
      {
        label: 'Ministry of Electronics & IT (MeitY)',
        href: 'https://www.meity.gov.in',
        note: 'Official source for the IT Act, IT Rules and the data protection law.',
      },
    ],
    disclaimer:
      'This is learning material, not legal advice. Laws and rules can change, so ask a trusted adult or a lawyer about a real situation. Please do not type real complaints or personal details into EduRights.',
  },

  /* ---------------- Quiz ---------------- */
  quiz: {
    title: 'The Digital Fingerprint: quiz',
    questions: [
      {
        id: 'q1',
        prompt: 'A private photo of a classmate is being forwarded in a group chat. What is the best first move?',
        options: [
          { id: 'a', text: 'Forward it to a friend to check if it is real' },
          { id: 'b', text: 'Do not forward or save it, tell a trusted adult and report it' },
          { id: 'c', text: 'Reply with the photo and write “stop sharing this”' },
          { id: 'd', text: 'Ignore it and say nothing' },
        ],
        correctOptionId: 'b',
        explanation:
          'Not spreading the photo is the most important step. A trusted adult can help you report it on the app and at cybercrime.gov.in or 1930.',
        xp: 20,
      },
      {
        id: 'q2',
        prompt: 'Myth or fact: if you delete a post, it is gone for good.',
        options: [
          { id: 'a', text: 'Fact' },
          { id: 'b', text: 'Myth: copies, screenshots and backups can survive' },
        ],
        correctOptionId: 'b',
        explanation: 'Once something is online, others can copy or screenshot it. That is why your digital fingerprint can last for years.',
        xp: 10,
      },
      {
        id: 'q3',
        prompt: 'What is doxxing?',
        options: [
          { id: 'a', text: 'Sharing someone’s private details, like their address or phone number, without consent' },
          { id: 'b', text: 'Hacking into a game account' },
          { id: 'c', text: 'Posting a meme about a celebrity' },
          { id: 'd', text: 'Making your own account private' },
        ],
        correctOptionId: 'a',
        explanation: 'Doxxing means exposing someone’s private information online. It can put them in danger.',
        xp: 10,
      },
      {
        id: 'q4',
        prompt: 'Under the current IT Rules, how quickly must a platform act after a complaint about intimate or morphed images of someone?',
        options: [
          { id: 'a', text: 'Within 2 hours' },
          { id: 'b', text: 'Within 2 weeks' },
          { id: 'c', text: 'Within 2 months' },
          { id: 'd', text: 'Only if the police order it' },
        ],
        correctOptionId: 'a',
        explanation: 'The IT Rules were amended in February 2026. The deadline for these complaints was cut from 24 hours to 2 hours.',
        xp: 15,
      },
      {
        id: 'q5',
        prompt: 'Someone makes a fake profile with your name and photos. Which set of actions is strongest?',
        options: [
          { id: 'a', text: 'Message them angrily and threaten them' },
          { id: 'b', text: 'Delete all your accounts and hide' },
          { id: 'c', text: 'Screenshot the profile link and date, report it as impersonation, and tell a trusted adult' },
          { id: 'd', text: 'Pay them to take it down' },
        ],
        correctOptionId: 'c',
        explanation: 'Evidence, a report and a trusted adult is the winning combination. Threats or payments only make things worse.',
        xp: 20,
      },
      {
        id: 'q6',
        prompt: 'Under India’s data protection law (DPDP), who must give verifiable consent before an app can use the data of a 15-year-old?',
        options: [
          { id: 'a', text: 'Only the teenager' },
          { id: 'b', text: 'A parent or guardian' },
          { id: 'c', text: 'Nobody' },
          { id: 'd', text: 'The school principal' },
        ],
        correctOptionId: 'b',
        explanation: 'Anyone under 18 counts as a child under the law, so a parent or guardian must give verifiable consent (with some exceptions, such as schools and safety).',
        xp: 15,
      },
    ],
  },

  /* ---------------- After the quiz ---------------- */
  action: {
    title: 'Footprint check-up',
    intro: 'Try these this week. Tick them off as you go.',
    items: [
      'Search your name and usernames in quotation marks and see what appears.',
      'Set your accounts to private and check who can see and download your photos.',
      'Turn on two-step verification for your email and main apps.',
      'Remove location tags from old posts.',
      'Save cybercrime.gov.in and 1930 somewhere you can find them.',
      'Tell one friend what you learned today.',
    ],
  },
  credential: {
    emoji: '🛡️',
    name: 'Digital Defender',
    text: 'You know how to protect your digital fingerprint and help others do the same.',
  },
};

export default digitalFingerprint;
