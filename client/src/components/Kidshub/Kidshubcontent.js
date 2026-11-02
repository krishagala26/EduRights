// Content for the Kids Knowledge Hub (ages 8-12). Pure data, no logic.
// Written in simple words with Ollie the owl as the guide.
//
// REVIEW BEFORE LAUNCH: a teacher or school counsellor should read this
// once. Facts used: RTE Act 2009 (free and compulsory education for ages
// 6 to 14), Childline 1098 (free, 24 hours), 112 (emergency number).

export const sections = [
  { id: 'stories', emoji: '📖', label: 'Stories' },
  { id: 'words', emoji: '🔤', label: 'Big Words' },
  { id: 'questions', emoji: '❓', label: 'Questions' },
  { id: 'help', emoji: '🆘', label: 'Who can help' },
];

/* ---------------- Ollie's tip of the day ---------------- */
export const tips = [
  'Your password is a secret. Only you and a grown-up you trust should know it.',
  'If something feels wrong, tell a trusted adult. You never have to handle it alone.',
  'Every child has the right to go to school and the right to play.',
  'Being kind online is just as important as being kind in person.',
  'You can say “No, stop!” when something makes you feel scared or uncomfortable.',
  'Childline 1098 is free and open all day and night. Remember it!',
  'Before you share a photo online, ask a grown-up first.',
  '112 is for real emergencies only. Never call it for fun.',
];

/* ---------------- Stories ---------------- */
export const stories = [
  {
    id: 'aarav',
    emoji: '📚',
    tone: 'sun',
    title: 'Aarav and the Golden Book',
    minutes: 1,
    body: [
      'Aarav loved school more than anything. But one morning the big school gate was shut tight, and Aarav felt sad.',
      'Then a golden book floated down from the sky. On the cover it said: THE RIGHT TO EDUCATION. “Every child between 6 and 14 gets to go to school,” said the book, “and school must be free!”',
      'Click! The golden book unlocked the gate. Aarav ran inside, and all his friends cheered.',
    ],
    lesson: 'Every child has the right to learn. School is for you!',
  },
  {
    id: 'maya',
    emoji: '⚽',
    tone: 'mint',
    title: 'Maya and the Playground',
    minutes: 1,
    body: [
      'Every day, Maya walked past a big grey building. It looked sad and grumpy.',
      '“Children should be learning and playing,” said her teacher, “not working in big grey buildings.” So Maya walked the other way, to school.',
      'And the more she walked, the greener the ground became. At the end there was a bright playground with a slide, just for her and her friends.',
    ],
    lesson:
      'A child’s job is to learn and play. If you see a child who has to work instead of going to school, tell a trusted adult.',
  },
  {
    id: 'zee',
    emoji: '💻',
    tone: 'sky',
    title: 'Zee and the Digital Shield',
    minutes: 1,
    body: [
      'Zee loved playing games online. One day, a mean message popped up on the screen.',
      'Zee did not reply. Zee took a deep breath, pressed Block, and went to tell Dad. A glowing shield appeared around Zee and the mean message bounced away.',
      'Zee also remembered to keep a locked box around important things: passwords, home address and photos.',
    ],
    lesson:
      'If someone is mean online: do not reply, block them and tell a trusted adult. Keep your passwords secret.',
  },
  {
    id: 'riya',
    emoji: '📞',
    tone: 'coral',
    title: 'Riya and the Magic Number',
    minutes: 1,
    body: [
      'One afternoon, Riya saw her neighbour fall down and not get up. Riya felt her heart go thump-thump.',
      'But she remembered the Magic Number: 1-1-2. Riya stayed calm, moved to a safe place and ran to get her mum. Her mum called 112, and helpers came quickly.',
      'The helpers said, “You did exactly the right thing, Riya!”',
    ],
    lesson:
      '112 is the number for real emergencies. Stay calm, stay safe and get a trusted adult to help.',
  },
  {
    id: 'asha',
    emoji: '📮',
    tone: 'grape',
    title: 'Asha’s Worry',
    minutes: 1,
    body: [
      'Asha had a big worry that felt heavy, like a stone in her backpack. She was afraid to tell anyone.',
      'One day her teacher said, “If something worries you, you can always tell me. There are special helpers for children too.”',
      'Asha took a deep breath and told her teacher. The teacher listened, smiled and helped. Suddenly the stone felt much lighter.',
    ],
    lesson: 'Telling someone is brave. You never have to carry a big worry alone.',
  },
];

/* ---------------- Big Words ---------------- */
export const words = [
  { id: 'right', emoji: '🌟', word: 'Right', meaning: 'Something every child is allowed to have or do.', example: 'You have the right to go to school.' },
  { id: 'law', emoji: '📜', word: 'Law', meaning: 'A rule for everyone in the country, made to keep people safe and treated fairly.', example: 'There are laws that protect children.' },
  { id: 'trusted', emoji: '🧑‍🏫', word: 'Trusted adult', meaning: 'A grown-up you feel safe with and can tell anything.', example: 'Mum, Grandpa or your teacher can be trusted adults.' },
  { id: 'privacy', emoji: '🔒', word: 'Privacy', meaning: 'Keeping some things just for you.', example: 'Your address and photos are private.' },
  { id: 'password', emoji: '🔑', word: 'Password', meaning: 'A secret code that keeps your accounts safe.', example: 'Never tell your password to friends.' },
  { id: 'helpline', emoji: '☎️', word: 'Helpline', meaning: 'A phone number you can call to get help.', example: 'Childline 1098 is a helpline for children.' },
  { id: 'emergency', emoji: '🚨', word: 'Emergency', meaning: 'A big, urgent problem where someone needs help right now.', example: 'A fire is an emergency. Call 112.' },
  { id: 'respect', emoji: '🤝', word: 'Respect', meaning: 'Being kind to people and listening when they say no.', example: 'We respect others when we ask before we borrow.' },
  { id: 'bullying', emoji: '🚫', word: 'Bullying', meaning: 'When someone is mean to another person again and again. It is never okay.', example: 'Telling a teacher about bullying helps stop it.' },
  { id: 'complaint', emoji: '📣', word: 'Complaint', meaning: 'Telling the right people that something is wrong, so they can fix it.', example: 'A grown-up can help you make a complaint.' },
];

/* ---------------- Questions kids ask ---------------- */
export const questions = [
  {
    id: 'say-no',
    q: 'Can I say no to an adult?',
    a: 'You can say no if something makes you feel scared, uncomfortable or unsafe, even to a grown-up. Say it loudly, move away and tell a trusted adult. (For everyday things like homework or crossing the road, listen to the adults who care for you.)',
  },
  {
    id: 'mean-online',
    q: 'What if someone is mean to me online?',
    a: 'Do not reply. Press Block, then show a trusted adult. It is never your fault, and a grown-up can help you report it.',
  },
  {
    id: 'unsafe',
    q: 'Who can I tell if I feel unsafe?',
    a: 'Tell a trusted adult right away: a parent, grandparent, teacher or school counsellor. You can also call Childline 1098. It is free and open all day and night.',
  },
  {
    id: 'secrets',
    q: 'Is it okay to keep secrets?',
    a: 'Happy secrets, like a surprise party, are fun! But a secret that makes you feel worried, scared or uncomfortable is not okay to keep. Tell a trusted adult.',
  },
  {
    id: 'school',
    q: 'Do all children have the right to go to school?',
    a: 'Yes! In India, every child between 6 and 14 has the right to free education. This is part of a law called the Right to Education Act, 2009.',
  },
  {
    id: 'work',
    q: 'Can children work instead of going to school?',
    a: 'No. Children should be learning and playing. Helping your family a little at home is fine, but school and play come first. If you see a child who has to work instead of going to school, tell a trusted adult.',
  },
  {
    id: 'lost',
    q: 'What should I do if I get lost or there is an emergency?',
    a: 'Stay calm. Find a safe adult, like a police officer, a shopkeeper or a family with children. Say your name and where you are, and ask them to call 112.',
  },
  {
    id: 'photo',
    q: 'Can I post my photo online?',
    a: 'Always ask a grown-up first. Photos can be copied and shared, so keep your address, school name and passwords out of them.',
  },
];

/* ---------------- Who can help ---------------- */
export const helpCards = [
  {
    id: 'trusted',
    emoji: '🧑‍🤝‍🧑',
    tone: 'sun',
    title: 'Your trusted adults',
    text: 'Parents, grandparents, teachers and the school counsellor. Pick three grown-ups you could tell anything.',
  },
  {
    id: 'childline',
    emoji: '📞',
    tone: 'mint',
    title: 'Childline 1098',
    number: '1098',
    text: 'Free and open all day and night. Call if you feel unsafe, scared or worried. You can call yourself or ask a grown-up to call with you.',
  },
  {
    id: 'emergency',
    emoji: '🚨',
    tone: 'coral',
    title: '112 for emergencies',
    number: '112',
    text: 'For real emergencies, like a fire, a bad accident or when someone is in danger right now. Never call for fun.',
  },
  {
    id: 'school',
    emoji: '🏫',
    tone: 'sky',
    title: 'At school',
    text: 'Tell your class teacher or the school counsellor. It is their job to help you.',
  },
  {
    id: 'friend',
    emoji: '💛',
    tone: 'grape',
    title: 'If a friend is in trouble',
    text: 'Listen, say “it is not your fault”, and help your friend tell a trusted adult.',
  },
];

export const safetySteps = [
  'I know three trusted adults.',
  'I know the emergency number 112.',
  'I know Childline 1098.',
  'I keep my passwords secret.',
  'I tell a grown-up if something feels wrong.',
];

export const helpNote =
  'Practise with a pretend toy phone. Real emergency numbers are only for real emergencies, so helpers stay free for people who need them.';