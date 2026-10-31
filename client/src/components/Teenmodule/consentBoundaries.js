// Content for Teen Module 2: "Consent & Boundaries" (Youth Protection).
// Pure data, no logic. No animation: this topic is handled with calm
// cards, short chat-style scenarios and clear help information.
//
// REVIEW BEFORE LAUNCH (this module is sensitive):
//  - A school counsellor, teacher or child-protection professional should
//    read every line before it goes live.
//  - Check the POCSO Act, 2012 wording (child = under 18; age of consent
//    18; reporting duty under section 19).
//  - Keep it non-graphic: no descriptions of abuse acts, and keep the
//    "it is never your fault" messages.

const consentBoundaries = {
  slug: 'consent-boundaries',
  number: 2,
  emoji: '🛡️',
  tone: 'coral',
  title: 'Consent & Boundaries',
  topic: 'Personal Safety & POCSO',
  coreTheme: 'POCSO Act, 2012 · Bodily autonomy · Recognising pressure and grooming',
  minutes: '8-10',
  sensitive: true,
  scene: null,

  hook: {
    label: 'Think about this',
    text: 'Some things are yours to decide: your body, your phone, your time, your secrets. Respecting those limits, yours and other people’s, is what consent is all about.',
  },
  note:
    'This module talks about respect, pressure and staying safe, including online grooming. It is gentle and does not describe abuse. You can take a break at any time, and free help is always available: Childline 1098 (24 hours).',

  /* ---------------- Scenarios ---------------- */
  scenarios: [
    {
      id: 's1',
      title: 'The new online friend',
      context: 'You have been chatting with someone on a gaming app for three weeks. They say they are “just a bit older”.',
      messages: [
        { from: 'New friend', side: 'them', text: 'you are so mature for your age 😊' },
        { from: 'New friend', side: 'them', text: 'let’s move to a private app so nobody is watching our chats, ok?' },
        { from: 'New friend', side: 'them', text: 'and don’t tell your parents, they won’t understand us' },
      ],
      steps: [
        {
          id: 'st1',
          prompt: 'How would you describe these messages?',
          choices: [
            {
              id: 'a',
              text: 'Nice compliments, a good sign of friendship.',
              rating: 'risky',
              feedback:
                'Flattery, secrecy and moving to private chats together are a well-known pattern called grooming. A real friend does not ask you to hide things from your family.',
            },
            {
              id: 'b',
              text: 'Warning signs: flattery, a push to move to private chats, and a request for secrecy.',
              rating: 'best',
              feedback:
                'Yes. Trust your instincts. Flattery plus secrecy plus pressure to go private is a red-flag combination, whoever the person is.',
            },
            {
              id: 'c',
              text: 'Probably nothing. I will wait and see.',
              rating: 'risky',
              feedback:
                'It is natural to hope it is nothing, but you do not need to wait for proof. Seeing the pattern early is what keeps you safe.',
            },
          ],
        },
        {
          id: 'st2',
          prompt: 'They write: “If you trust me, prove it. Send me a photo.” What do you do?',
          choices: [
            {
              id: 'a',
              text: 'Say no firmly, stop replying, block them and tell a trusted adult.',
              rating: 'best',
              feedback:
                'You never owe anyone a photo, a reply or a secret. Saying no, blocking and telling an adult is exactly right.',
            },
            {
              id: 'b',
              text: 'Send a normal-looking photo to keep them happy.',
              rating: 'risky',
              feedback:
                'Once a photo is sent, you lose control of it, and pressure usually grows. If you have already sent something, it is not your fault. Talk to a trusted adult or call Childline 1098.',
            },
            {
              id: 'c',
              text: 'Ask them to prove they are real first.',
              rating: 'okay',
              feedback:
                'It feels smart, but staying in the conversation keeps the pressure going. Stopping the chat is safer than testing them.',
            },
          ],
        },
        {
          id: 'st3',
          prompt: 'You blocked them, but you feel embarrassed and worry people will overreact. What now?',
          choices: [
            {
              id: 'a',
              text: 'Tell a trusted adult (parent, teacher or counsellor) or call Childline 1098. You did the right thing.',
              rating: 'best',
              feedback:
                'Telling someone is brave, and it helps protect you and other young people. You will not be in trouble for being targeted.',
            },
            {
              id: 'b',
              text: 'Keep it to myself so nobody makes a fuss.',
              rating: 'okay',
              feedback:
                'The worry makes sense, but carrying it alone is heavy, and the person could target someone else. A trusted adult can help.',
            },
            {
              id: 'c',
              text: 'Delete the whole chat so there is no trace.',
              rating: 'risky',
              feedback:
                'Messages can help adults and the police act. Do not delete them. Show them to a trusted adult.',
            },
          ],
        },
      ],
      remember: [
        'Flattery, secrecy and pressure are warning signs. Notice the pattern early.',
        'You can say no at any point. You never owe anyone a photo, a reply or a secret.',
        'Do not delete the chat. Show it to a trusted adult. It is never your fault, even if you replied.',
      ],
    },
    {
      id: 's2',
      title: 'When “no” is not heard',
      context: 'You are 15. A classmate you like keeps pushing in small ways.',
      messages: [
        { from: 'Classmate', side: 'them', text: 'if you really liked me you would give me your password' },
        { from: 'Classmate', side: 'them', text: 'why are you texting Sam?? delete him' },
      ],
      steps: [
        {
          id: 'st1',
          prompt: 'Is this a healthy way to treat someone?',
          choices: [
            {
              id: 'a',
              text: 'Yes, it just shows they care a lot.',
              rating: 'risky',
              feedback:
                'Caring does not mean controlling. Demanding passwords or deciding who you can talk to is not love or friendship.',
            },
            {
              id: 'b',
              text: 'No. Controlling who you talk to and demanding passwords is a red flag.',
              rating: 'best',
              feedback:
                'Right. Boundaries apply between people of the same age too. Healthy relationships respect your privacy and your friendships.',
            },
            {
              id: 'c',
              text: 'Maybe. It depends on how much I like them.',
              rating: 'okay',
              feedback:
                'Feelings can make this confusing. The behaviour is still a red flag, however much you like the person.',
            },
          ],
        },
        {
          id: 'st2',
          prompt: 'You say, “I am not comfortable with that.” They sulk: “You are ruining everything.” What do you do?',
          choices: [
            {
              id: 'a',
              text: 'Give in so the mood gets better.',
              rating: 'risky',
              feedback:
                'Giving in teaches the pattern that pressure works. Your boundary stays yours even if someone is upset.',
            },
            {
              id: 'b',
              text: 'Stay calm, repeat my boundary, and talk to a friend or trusted adult if it continues.',
              rating: 'best',
              feedback:
                'Calm and clear is powerful. If the pressure continues or you feel uneasy, sharing it with someone you trust is a smart step.',
            },
            {
              id: 'c',
              text: 'Ignore them completely without saying anything.',
              rating: 'okay',
              feedback:
                'Taking space is fine, but saying your limit out loud once gives them a clear message and gives you confidence.',
            },
          ],
        },
      ],
      remember: [
        'Boundaries apply between peers too. Respect goes both ways.',
        'Real care respects a “no”.',
        'Passwords and private information are yours to keep. If pressure grows, tell a trusted adult.',
      ],
    },
    {
      id: 's3',
      title: 'A friend confides in you',
      context: 'Your close friend pulls you aside after school.',
      messages: [
        { from: 'Friend', side: 'them', text: 'someone has been making me really uncomfortable' },
        { from: 'Friend', side: 'them', text: 'promise you won’t tell anyone??' },
      ],
      steps: [
        {
          id: 'st1',
          prompt: 'How do you respond?',
          choices: [
            {
              id: 'a',
              text: 'Promise to keep it a secret no matter what.',
              rating: 'risky',
              feedback:
                'It is kind, but a promise of total secrecy can leave your friend unsafe. It is better to be honest about wanting to help.',
            },
            {
              id: 'b',
              text: 'Listen calmly, say “it is not your fault”, thank them for trusting you, and say you want to help them get support from a trusted adult.',
              rating: 'best',
              feedback:
                'Perfect. Believing them and saying it is not their fault matters hugely. You are promising support, not secrecy.',
            },
            {
              id: 'c',
              text: 'Confront the person yourself.',
              rating: 'risky',
              feedback:
                'It comes from loyalty, but it could put you both at risk and make things harder for your friend. Adults are better placed to deal with it.',
            },
          ],
        },
        {
          id: 'st2',
          prompt: 'Your friend is scared about telling an adult. How can you help?',
          choices: [
            {
              id: 'a',
              text: 'Offer to go with them to a teacher, counsellor or parent, or call Childline 1098 together.',
              rating: 'best',
              feedback:
                'Having someone beside them makes it much easier. Childline 1098 is free and open 24 hours.',
            },
            {
              id: 'b',
              text: 'Tell the whole class so people can watch out.',
              rating: 'risky',
              feedback:
                'This takes control away from your friend and can cause more hurt. Their story is theirs to share.',
            },
            {
              id: 'c',
              text: 'Wait and see if it goes away.',
              rating: 'okay',
              feedback:
                'Waiting is understandable, but problems like this usually do not fix themselves. Gentle support to reach an adult helps.',
            },
          ],
        },
      ],
      remember: [
        'You do not have to solve it alone. Trusted adults and Childline are there for this.',
        'Say “it is not your fault”. Do not promise total secrecy, promise support.',
        'Adults who learn about abuse are required by law to report it, so the child can be protected.',
      ],
    },
  ],

  /* ---------------- Facts, cards and bonus ---------------- */
  learn: {
    heading: 'Know the facts',
    intro: 'Here is what the stories were really about. Read the cards, then open the bonus facts.',
    cards: [
      {
        id: 'boundaries',
        emoji: '🧱',
        title: 'Boundaries',
        text: 'The limits you set about your body, space, time, belongings and information. You can set them with anyone: friends, partners, family or teachers. You do not need to explain or apologise.',
      },
      {
        id: 'consent',
        emoji: '✅',
        title: 'Consent',
        text: 'A free, clear “yes” that can be taken back at any time. Pressure, threats, guilt or secrets mean it is not real consent.',
      },
      {
        id: 'grooming',
        emoji: '🕸️',
        title: 'Grooming',
        text: 'When someone builds trust to manipulate a young person, often with flattery, gifts, secrecy and isolation. Anyone can do it, online or offline, and it is never the young person’s fault.',
      },
      {
        id: 'pressure',
        emoji: '😬',
        title: 'Coercion and peer pressure',
        text: 'Using guilt, threats, bribes or “everyone does it” to make someone do something. It can come from a friend or partner your own age.',
      },
      {
        id: 'healthy',
        emoji: '⚖️',
        title: 'Healthy or unhealthy?',
        text: 'Healthy: respects your “no”, trusts you, supports your friendships. Unhealthy: controls who you see, checks your phone, uses jealousy as “proof of love”, mocks your limits.',
      },
      {
        id: 'help',
        emoji: '🤝',
        title: 'Who can help',
        text: 'Trusted adults (parents, teachers, counsellors), Childline 1098, and the police or NCPCR for serious cases. You never have to be sure it is “bad enough” before you ask for help.',
      },
    ],
    laws: {
      title: 'The law in plain words',
      rows: [
        {
          law: 'POCSO Act, 2012',
          plain:
            'Protects everyone under 18 from sexual offences. Under this law anyone under 18 is a child, and 18 is the age of consent for sexual activity. The law exists to protect young people, not to punish them for being targeted.',
        },
        {
          law: 'Reporting duty',
          plain:
            'Under POCSO, a person who knows or suspects that a child has been sexually abused must report it to the police or the special juvenile police unit. This includes teachers and school staff, so an adult you confide in may have to pass it on to protect you.',
        },
        {
          law: 'Intimate images of under-18s',
          plain:
            'A sexual image of someone under 18 is treated as child sexual abuse material. Making, keeping or sending it can be a crime, even between teens. If you receive one, do not forward it and tell a trusted adult.',
        },
        {
          law: 'Child protection system',
          plain:
            'Child Welfare Committees and Childline help children who need care and protection. Reports through the POCSO e-Box go to NCPCR, the National Commission for Protection of Child Rights.',
        },
      ],
    },
    bonus: {
      title: 'Level up: bonus facts',
      items: [
        {
          id: 'phrases',
          emoji: '🗣️',
          title: 'Boundary phrases you can use',
          text: '“I am not comfortable with that.” “I said no, please stop.” “I need some space.” “I will decide that myself.” You do not have to explain.',
        },
        {
          id: 'myth-photo',
          emoji: '❌',
          title: 'Myth or fact: “if you sent a photo, it is your fault”',
          text: 'Myth. Responsibility lies with the person who pressured, shared or misused it. If something like this happened to you, you can still get help, and you will not be blamed.',
        },
        {
          id: 'myth-strangers',
          emoji: '🧩',
          title: 'Myth or fact: “it is always a stranger”',
          text: 'Myth. Often the person is someone the child already knows. That is why it is better to trust your feelings than to trust a label.',
        },
        {
          id: 'gut',
          emoji: '🧭',
          title: 'Trust your gut',
          text: 'If something feels “off” or secretive, that feeling is information. You do not need proof to ask for help.',
        },
        {
          id: 'plan',
          emoji: '📱',
          title: 'Make a safety plan',
          text: 'Choose three trusted adults you could tell. Save 1098 in your phone. Agree a code word with a friend or parent that means “I need help”.',
        },
        {
          id: 'support',
          emoji: '💛',
          title: 'Supporting a friend',
          text: 'Listen, believe them, say “it is not your fault”, do not push for details, and help them reach a trusted adult.',
        },
      ],
    },
    helplines: [
      { label: 'Childline', value: '1098', note: 'Free, 24 hours, for any child who needs care or protection.' },
      { label: 'Emergency', value: '112', note: 'If someone is in immediate danger.' },
      { label: 'Tele-MANAS', value: '14416', note: 'Free mental health support helpline.' },
    ],
    links: [
      {
        label: 'POCSO e-Box (NCPCR)',
        href: 'https://ncpcr.gov.in/pocso/',
        note: 'Official page to report sexual offences against children. Best opened with a trusted adult.',
      },
      {
        label: 'National Commission for Protection of Child Rights (NCPCR)',
        href: 'https://ncpcr.gov.in',
        note: 'Official site about child rights and protection.',
      },
    ],
    disclaimer:
      'This is learning material, not legal or medical advice. If you or someone you know is in danger, call 112. For support, call Childline 1098. Please do not type your own story or personal details into EduRights.',
  },

  /* ---------------- Quiz ---------------- */
  quiz: {
    title: 'Consent & Boundaries: quiz',
    questions: [
      {
        id: 'q1',
        prompt: 'Which of these is a warning sign of grooming?',
        options: [
          { id: 'a', text: 'A classmate asks to borrow a pen' },
          { id: 'b', text: 'A new online friend gives lots of praise and asks you to keep the chats secret' },
          { id: 'c', text: 'A teacher gives homework' },
          { id: 'd', text: 'A cousin invites you to a birthday' },
        ],
        correctOptionId: 'b',
        explanation: 'Flattery plus secrecy is a classic grooming pattern. A real friend never needs you to hide things from your family.',
        xp: 15,
      },
      {
        id: 'q2',
        prompt: 'Myth or fact: if someone sends a private photo because they were pressured, it is their fault.',
        options: [
          { id: 'a', text: 'Fact' },
          { id: 'b', text: 'Myth: the person who pressures or misuses it is responsible' },
        ],
        correctOptionId: 'b',
        explanation: 'It is never the fault of the person who was pressured. They can still get help without being blamed.',
        xp: 15,
      },
      {
        id: 'q3',
        prompt: 'Which behaviour is a red flag between two people of the same age?',
        options: [
          { id: 'a', text: 'Asking before borrowing your phone' },
          { id: 'b', text: 'Respecting that you want time with other friends' },
          { id: 'c', text: 'Demanding your password and deciding who you can talk to' },
          { id: 'd', text: 'Listening when you say “no”' },
        ],
        correctOptionId: 'c',
        explanation: 'Controlling behaviour is a red flag whatever the age. Healthy relationships respect your privacy and friendships.',
        xp: 15,
      },
      {
        id: 'q4',
        prompt: 'Under the POCSO Act, who counts as a child?',
        options: [
          { id: 'a', text: 'Anyone under 12' },
          { id: 'b', text: 'Anyone under 16' },
          { id: 'c', text: 'Anyone under 18' },
          { id: 'd', text: 'Anyone under 21' },
        ],
        correctOptionId: 'c',
        explanation: 'The POCSO Act, 2012 protects everyone under 18.',
        xp: 10,
      },
      {
        id: 'q5',
        prompt: 'A friend tells you someone has made them uncomfortable and asks for secrecy. What is the best response?',
        options: [
          { id: 'a', text: 'Promise total secrecy and never mention it again' },
          { id: 'b', text: 'Confront the person yourself' },
          { id: 'c', text: 'Listen, say “it is not your fault”, and help them reach a trusted adult' },
          { id: 'd', text: 'Tell everyone in the class' },
        ],
        correctOptionId: 'c',
        explanation: 'Believing them and helping them reach a trusted adult keeps your friend safe without taking their story out of their hands.',
        xp: 20,
      },
      {
        id: 'q6',
        prompt: 'Which number is India’s free, 24-hour helpline for children who need care and protection?',
        options: [
          { id: 'a', text: '1098' },
          { id: 'b', text: '108' },
          { id: 'c', text: '1930' },
          { id: 'd', text: '101' },
        ],
        correctOptionId: 'a',
        explanation: 'Childline 1098 is free and open 24 hours. (108 is for ambulances, 1930 is the cyber crime helpline and 101 is for fire.)',
        xp: 10,
      },
    ],
  },

  /* ---------------- After the quiz ---------------- */
  action: {
    title: 'Boundary toolkit',
    intro: 'Small steps that make it easier to ask for help. Tick them off as you go.',
    items: [
      'Write down three trusted adults you could talk to.',
      'Save Childline 1098 in your phone.',
      'Practise one boundary phrase out loud.',
      'Agree a code word with a friend or parent that means “I need help”.',
      'Check who is allowed to message you on your apps.',
    ],
  },
  credential: {
    emoji: '🤝',
    name: 'Safe Circle',
    text: 'You can spot pressure, set boundaries and help others reach support.',
  },
};

export default consentBoundaries;
