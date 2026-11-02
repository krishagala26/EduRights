// Content for the Teen Knowledge Hub (ages 13-16). Pure data, no logic.
//
// REVIEW BEFORE LAUNCH: this is learning material about real laws. A
// teacher, counsellor or lawyer should check every fact against the
// official sources, especially:
//  - IT Rules takedown time for intimate/morphed images (2 hours since the
//    February 2026 amendment; it was 24 hours before)
//  - DPDP Act 2023 / DPDP Rules 2025 (being phased in)
//  - RTE Act points (sections 12, 13 and 14)
//  - Phone numbers and web addresses (1098, 112, 1930, 1915, 15100, 14416)

export const sections = [
  { id: 'explainers', label: 'Law explainers' },
  { id: 'case', label: 'Case of the day' },
  { id: 'rights', label: 'Know your rights' },
  { id: 'help', label: 'Get help' },
];

export const topics = ['All', 'Privacy', 'Safety', 'Justice', 'Work', 'Money', 'Education'];

/* ---------------- Law explainers ---------------- */
export const explainers = [
  {
    id: 'it-act',
    topic: 'Privacy',
    title: 'Information Technology Act, 2000',
    year: '2000',
    short: 'India’s main cyber law: what counts as a crime online.',
    plain:
      'The IT Act decides what is a crime when it happens through computers, phones and the internet. It covers pretending to be someone else, cheating online, violating someone’s privacy with images, and child sexual abuse material.',
    points: [
      'Pretending to be someone else online, or cheating by impersonation, can be an offence (sections 66C and 66D).',
      'Capturing or sharing private images of someone’s body without consent violates privacy (section 66E).',
      'Sexual material involving anyone under 18 is treated as child sexual abuse material (section 67B). Creating, keeping or sending it can be a crime, even between teens.',
      'You can report cyber crimes at cybercrime.gov.in or by calling 1930.',
    ],
    link: { label: 'Ministry of Electronics & IT (MeitY)', href: 'https://www.meity.gov.in' },
  },
  {
    id: 'it-rules',
    topic: 'Privacy',
    title: 'IT Rules, 2021 (amended 2026)',
    year: '2021 / 2026',
    short: 'Rules that make apps and platforms responsible for what happens on them.',
    plain:
      'These rules sit under the IT Act. They tell social media platforms and apps what they must do when users complain, especially about harmful content.',
    points: [
      'Platforms must have a grievance officer you can complain to.',
      'For complaints about intimate or morphed images, including deepfakes, platforms must act within 2 hours since the February 2026 amendment (it used to be 24 hours).',
      'Always keep the report or complaint reference number so you can follow up.',
    ],
    link: { label: 'Ministry of Electronics & IT (MeitY)', href: 'https://www.meity.gov.in' },
  },
  {
    id: 'dpdp',
    topic: 'Privacy',
    title: 'Digital Personal Data Protection Act, 2023',
    year: '2023 / Rules 2025',
    short: 'India’s privacy law about how companies can use your data.',
    plain:
      'The DPDP Act sets rules for companies and apps that collect personal data. Its rules were notified in 2025 and are being phased in step by step.',
    points: [
      'Anyone under 18 counts as a child, so companies need a parent’s or guardian’s verifiable consent before using their data.',
      'Companies should not track a child’s behaviour or show them targeted ads (with some exceptions, such as for schools and safety).',
      'You have rights over your data: to know what is collected, to ask for corrections or deletion, and to complain.',
    ],
    link: { label: 'Ministry of Electronics & IT (MeitY)', href: 'https://www.meity.gov.in' },
  },
  {
    id: 'pocso',
    topic: 'Safety',
    title: 'POCSO Act, 2012',
    year: '2012',
    short: 'Protects everyone under 18 from sexual offences.',
    plain:
      'POCSO stands for Protection of Children from Sexual Offences. It protects children from abuse and sets out child-friendly ways for the police and courts to deal with cases.',
    points: [
      'Anyone under 18 is a child, and 18 is the age of consent for sexual activity. The law exists to protect young people, not to punish them for being targeted.',
      'A person who knows or suspects that a child has been sexually abused must report it. This includes teachers and school staff.',
      'Procedures are child-friendly: for example, a child’s statement should be recorded where they feel comfortable, and their identity is kept private.',
      'It is never the child’s fault.',
    ],
    link: { label: 'POCSO e-Box (NCPCR)', href: 'https://ncpcr.gov.in/pocso/' },
  },
  {
    id: 'jj-act',
    topic: 'Justice',
    title: 'Juvenile Justice Act, 2015',
    year: '2015',
    short: 'How the law treats children under 18 who are in trouble or in need of care.',
    plain:
      'Under this law a person under 18 is a child. It has two tracks: children alleged to have broken the law, and children who need care and protection.',
    points: [
      'The Juvenile Justice Board (JJB) deals with children in conflict with the law. The Child Welfare Committee (CWC) deals with children who need care and protection.',
      'If police apprehend a child, the child should be placed with the Special Juvenile Police Unit or a child welfare police officer. Parents or guardians must be informed.',
      'The child must be produced before the JJB within 24 hours (not counting travel time), and must never be put in a police lock-up or jail.',
      'In rare cases of very serious (heinous) offences, the JJB may assess a 16 to 18 year old to decide whether the case goes to the Children’s Court.',
    ],
    link: { label: 'Ministry of Women & Child Development', href: 'https://wcd.gov.in' },
  },
  {
    id: 'labour',
    topic: 'Work',
    title: 'Child and Adolescent Labour Act, 1986',
    year: '1986 / 2016',
    short: 'Rules about work for children under 14 and adolescents aged 14 to 17.',
    plain:
      'The law separates a child (under 14) from an adolescent (14 to under 18). What work is allowed depends on which group you are in. It was strengthened in 2016.',
    points: [
      'Children under 14 cannot be employed in any job. The exceptions are helping their own family or family enterprise (not hazardous work) after school hours or in holidays, and working as a child artist with safeguards.',
      'Adolescents aged 14 to 17 can do non-hazardous work, but are banned from hazardous jobs and processes, such as mines and dangerous chemical work.',
      'Employers who break the law can be punished.',
      'Anyone can report child labour on the PENCIL portal or by calling Childline 1098.',
    ],
    link: { label: 'PENCIL Portal (Ministry of Labour)', href: 'https://pencil.gov.in' },
  },
  {
    id: 'consumer',
    topic: 'Money',
    title: 'Consumer Protection Act, 2019',
    year: '2019',
    short: 'Your rights when you buy things or services, including online.',
    plain:
      'This law protects people who buy goods and services. It also covers online shopping and apps, and it tackles misleading ads and unfair trade practices.',
    points: [
      'Consumers have six rights: safety, information, choice, to be heard, to seek redress, and consumer education.',
      'Misleading advertisements and unfair trade practices can be reported. A body called the CCPA can act against them.',
      'E-commerce companies must have a grievance officer.',
      'You can complain through the National Consumer Helpline (1915 or consumerhelpline.gov.in). A parent or guardian can help you.',
    ],
    link: { label: 'National Consumer Helpline', href: 'https://consumerhelpline.gov.in' },
  },
  {
    id: 'rte',
    topic: 'Education',
    title: 'Right to Education Act, 2009',
    year: '2009',
    short: 'Free and compulsory education for every child aged 6 to 14.',
    plain:
      'The RTE Act makes elementary education a right. Every child from 6 to 14 can go to a neighbourhood school free of cost.',
    points: [
      'No child can be refused admission only because they cannot show age proof.',
      'Schools cannot take capitation fees or put children through a screening test for admission to elementary classes.',
      'Private unaided schools must keep 25% of their entry-level seats for children from disadvantaged groups.',
      'If a school refuses, a parent can complain in writing to the school head and then to the education officer. Childline 1098 can also help.',
    ],
    link: { label: 'Ministry of Education', href: 'https://www.education.gov.in' },
  },
];

/* ---------------- Cases ("What would you do?") ---------------- */
export const cases = [
  {
    id: 'photo',
    topic: 'Privacy',
    title: 'The group-chat photo',
    situation:
      'A private photo of a classmate is being forwarded in your class group chat. Everyone is reacting, and the phone is in your hand.',
    question: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Forward it to one friend to check if it is real.',
        correct: false,
        why: 'Forwarding spreads it further, even to “just one person”. If the photo is intimate and the person is under 18, sharing it can be a serious crime.',
      },
      {
        id: 'b',
        text: 'Do not forward or save it. Tell a trusted adult and help report it on the app and at cybercrime.gov.in or 1930.',
        correct: true,
        why: 'Not spreading it is the first step, and official reports are what get it removed. Platforms must act on these complaints within hours.',
      },
      {
        id: 'c',
        text: 'Post publicly to shame everyone who shared it.',
        correct: false,
        why: 'A public post draws more attention to the photo and can hurt the person in it. Use official channels instead.',
      },
    ],
    takeaway: 'It is never the fault of the person in the photo. Report, do not share.',
    related: ['IT Act', 'IT Rules 2026', 'POCSO'],
  },
  {
    id: 'job',
    topic: 'Work',
    title: 'The job with chemicals',
    situation:
      'You are 15. A relative’s friend offers you a paid job at a workshop that handles dangerous chemicals and machines. He says it is fine because “everyone starts young”.',
    question: 'What is the right move?',
    options: [
      {
        id: 'a',
        text: 'Take it. The pay is good and it is only for a few months.',
        correct: false,
        why: 'The law bans adolescents from hazardous jobs, however good the pay is. Your safety and your education come first.',
      },
      {
        id: 'b',
        text: 'Say no, tell your parents or a teacher, and report it to PENCIL or Childline 1098 if the employer keeps pushing.',
        correct: true,
        why: 'Right. Adolescents aged 14 to 17 can do non-hazardous work only, and employers who break the rule can be punished.',
      },
      {
        id: 'c',
        text: 'Take it, but only for part-time hours.',
        correct: false,
        why: 'Fewer hours do not make a hazardous job legal. The danger is the same.',
      },
    ],
    takeaway: 'Under 14: no work except helping family after school. 14 to 17: only non-hazardous work.',
    related: ['Child and Adolescent Labour Act', 'PENCIL', 'Childline 1098'],
  },
  {
    id: 'police',
    topic: 'Justice',
    title: 'The police at the door',
    situation:
      'You are 16. Police come to your home after a theft in the neighbourhood and say you must come to the station now to answer a few questions.',
    question: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Run away or hide until they leave.',
        correct: false,
        why: 'Running makes things worse. Staying calm and following the right steps protects you.',
      },
      {
        id: 'b',
        text: 'Stay calm, say your age, and ask them to inform your parent or guardian and to deal with you through the child welfare police officer.',
        correct: true,
        why: 'The Juvenile Justice Act says a child must be placed with the Special Juvenile Police Unit or child welfare police officer, with parents informed, and produced before the Board within 24 hours.',
      },
      {
        id: 'c',
        text: 'Sign a statement quickly to get it over with.',
        correct: false,
        why: 'Never sign something you have not read or do not understand. You can ask for a lawyer, and free legal aid is available for children (15100).',
      },
    ],
    takeaway: 'You are a child under the law. Calm, honest, and with a parent and lawyer beside you is safest.',
    related: ['Juvenile Justice Act', 'NALSA legal aid 15100'],
  },
  {
    id: 'game',
    topic: 'Money',
    title: 'The game that charged ₹2,000',
    situation:
      'In a game you opened a “mystery box” using your parent’s saved card. It charged ₹2,000, and the pop-up said “limited offer, buy now!”.',
    question: 'What is the best next step?',
    options: [
      {
        id: 'a',
        text: 'Hide it and hope nobody notices.',
        correct: false,
        why: 'The sooner it is reported, the better the chance of getting money back. Hiding it costs you time.',
      },
      {
        id: 'b',
        text: 'Tell your parent right away, take screenshots of the offer and receipt, and contact the app’s support and the bank. If the app refuses, try the National Consumer Helpline 1915.',
        correct: true,
        why: 'Quick action and evidence help. If someone tricked you into paying, report it as fraud on 1930 as well.',
      },
      {
        id: 'c',
        text: 'Buy more boxes to try to win it back.',
        correct: false,
        why: 'Random boxes are designed to make you keep spending. Stop and tell an adult.',
      },
    ],
    takeaway: 'Tell an adult fast, save the evidence, and use the right helpline.',
    related: ['Consumer Protection Act', '1915', '1930'],
  },
  {
    id: 'online-friend',
    topic: 'Safety',
    title: 'The online friend who wants photos',
    situation:
      'Someone older you met in a game keeps praising you, asks you to move to a private app, and says “prove you trust me, send a photo”.',
    question: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Send one photo so they stay friendly.',
        correct: false,
        why: 'Once a photo is sent you lose control of it, and the pressure usually grows. (If this already happened, it is not your fault. Talk to a trusted adult.)',
      },
      {
        id: 'b',
        text: 'Say no, stop replying, block them, keep the chat, and tell a trusted adult or call Childline 1098.',
        correct: true,
        why: 'This is a grooming pattern: praise, secrecy and pressure. Keep the messages, because they can help adults act.',
      },
      {
        id: 'c',
        text: 'Ask them to send a photo first to prove they are real.',
        correct: false,
        why: 'Staying in the chat keeps the pressure going. Stopping the conversation is safer than testing them.',
      },
    ],
    takeaway: 'You never owe anyone a photo, a reply or a secret.',
    related: ['POCSO', 'Childline 1098', 'POCSO e-Box'],
  },
];

/* ---------------- Know your rights (fact sheets) ---------------- */
export const rights = [
  {
    id: 'police',
    topic: 'Justice',
    emoji: '🚔',
    title: 'If police want to question you',
    when: 'You are under 18 and police ask you to come with them or answer questions.',
    steps: [
      'Stay calm and say your age clearly.',
      'Ask them to inform your parent or guardian. The law says they must.',
      'You should be dealt with by the Special Juvenile Police Unit or a child welfare police officer. You must never be kept in a police lock-up or jail.',
      'You must be produced before the Juvenile Justice Board within 24 hours, not counting travel time.',
      'Police should not handcuff a child or use force.',
      'You can ask for a lawyer. Free legal aid is available for children.',
      'Do not sign anything you have not read or do not understand.',
    ],
    remember: 'Staying calm and polite is safest. It does not mean you are guilty.',
    contacts: [
      { label: 'Free legal aid (NALSA)', value: '15100' },
      { label: 'Childline', value: '1098' },
    ],
  },
  {
    id: 'photo',
    topic: 'Privacy',
    emoji: '🖼️',
    title: 'If your private photo or video is shared',
    when: 'Someone has shared or threatened to share an image of you without your consent.',
    steps: [
      'It is not your fault.',
      'Do not reply to the person, and do not forward the image.',
      'Tell a trusted adult.',
      'Report it on the app (use the report option for intimate images or impersonation) and note the reference number.',
      'Report it at cybercrime.gov.in or call 1930.',
      'Platforms must act on complaints about intimate or morphed images within 2 hours.',
    ],
    remember: 'You are the victim here, not the one who did something wrong.',
    contacts: [
      { label: 'Cyber crime helpline', value: '1930' },
      { label: 'Childline', value: '1098' },
    ],
  },
  {
    id: 'pressure',
    topic: 'Safety',
    emoji: '🚫',
    title: 'If someone is pressuring you or making you uncomfortable',
    when: 'Someone online or offline keeps pushing, asks for secrets or photos, or makes you feel unsafe.',
    steps: [
      'Say no clearly. You owe nobody a photo, a reply or a secret.',
      'Stop the conversation and block them.',
      'Do not delete the messages. They can help adults act.',
      'Tell a trusted adult or call Childline 1098.',
      'Serious cases can be reported through the POCSO e-Box (NCPCR) with an adult’s help.',
    ],
    remember: 'It is never your fault, even if you replied or sent something.',
    contacts: [
      { label: 'Childline', value: '1098' },
      { label: 'Emergency', value: '112' },
    ],
  },
  {
    id: 'job',
    topic: 'Work',
    emoji: '💼',
    title: 'If you want a part-time job',
    when: 'You are thinking about earning money while you are still in school.',
    steps: [
      'Under 14: no jobs, except helping your own family after school or in holidays, in non-hazardous work.',
      'Aged 14 to 17: allowed in non-hazardous work only. Never in hazardous jobs such as mines or dangerous chemical work.',
      'Ask: what is the work, where, how many hours, and who is responsible for my safety?',
      'Tell a parent or guardian, and keep school first.',
      'Never pay money to get a job. That is a common scam.',
      'Report unsafe or exploitative work to the PENCIL portal or Childline 1098.',
    ],
    remember: 'A good job never asks you to hide it from your family.',
    contacts: [
      { label: 'Childline', value: '1098' },
      { label: 'PENCIL portal', value: 'pencil.gov.in' },
    ],
  },
  {
    id: 'scam',
    topic: 'Money',
    emoji: '💸',
    title: 'If you are scammed or overcharged online',
    when: 'Money was taken, a product was not as advertised, or an app charged you unfairly.',
    steps: [
      'Tell a parent or trusted adult straight away.',
      'Take screenshots of the offer, the chat and the payment.',
      'If you were tricked into paying (fraud), call 1930 as soon as possible and report at cybercrime.gov.in. Speed helps.',
      'If the problem is with a shop or app (wrong product, unfair charge, misleading ad), contact its grievance officer first, then the National Consumer Helpline.',
      'Never share an OTP, PIN or password with anyone.',
    ],
    remember: 'Reporting quickly gives you the best chance of fixing it.',
    contacts: [
      { label: 'Cyber crime helpline', value: '1930' },
      { label: 'Consumer helpline', value: '1915' },
    ],
  },
  {
    id: 'school',
    topic: 'Education',
    emoji: '🏫',
    title: 'If a school turns you away',
    when: 'A school refuses admission or asks for something it should not.',
    steps: [
      'Every child aged 6 to 14 has the right to free and compulsory elementary education.',
      'A school cannot refuse admission just because you do not have age proof.',
      'Schools cannot take capitation fees or test children for admission to elementary classes.',
      'Ask a parent to complain in writing to the school head, then to the education officer.',
      'Childline 1098 or the State or National Commission for Protection of Child Rights can also help.',
    ],
    remember: 'Keep copies of every letter and note the date and the name of the person you spoke to.',
    contacts: [{ label: 'Childline', value: '1098' }],
  },
];

/* ---------------- Get help ---------------- */
export const helplines = [
  { id: '1098', value: '1098', label: 'Childline', note: 'Free, open 24 hours, for any child who needs help or protection.' },
  { id: '112', value: '112', label: 'Emergency', note: 'If someone is in immediate danger.' },
  { id: '1930', value: '1930', label: 'Cyber crime helpline', note: 'Report cyber crimes, including image abuse and online fraud.' },
  { id: '1915', value: '1915', label: 'Consumer helpline', note: 'Toll-free help with unfair charges, misleading ads and online shopping problems.' },
  { id: '15100', value: '15100', label: 'Free legal aid', note: 'NALSA helpline. Children are eligible for free legal services.' },
  { id: '14416', value: '14416', label: 'Tele-MANAS', note: 'Free mental health support helpline.' },
];

export const channels = [
  { id: 'c1', situation: 'A private image shared, impersonation or online abuse', where: 'Report on the app, then cybercrime.gov.in or 1930' },
  { id: 'c2', situation: 'Grooming, pressure or sexual abuse', where: 'Childline 1098, POCSO e-Box (NCPCR), or 112 if in danger' },
  { id: 'c3', situation: 'Unsafe or illegal work for a child', where: 'PENCIL portal or Childline 1098' },
  { id: 'c4', situation: 'A child-rights complaint', where: 'e-Baal Nidan (NCPCR) or Childline 1098' },
  { id: 'c5', situation: 'Online shopping, unfair charge or misleading ad', where: 'Grievance officer, then 1915 or consumerhelpline.gov.in' },
  { id: 'c6', situation: 'Money lost to fraud', where: '1930 as fast as possible, and cybercrime.gov.in' },
  { id: 'c7', situation: 'Trouble with the police or the law', where: 'Free legal aid 15100, and the Juvenile Justice Board' },
  { id: 'c8', situation: 'Feeling very low or stressed', where: 'A trusted adult, or Tele-MANAS 14416' },
];

export const portals = [
  { href: 'https://cybercrime.gov.in', label: 'National Cyber Crime Reporting Portal', note: 'Report cyber crimes.' },
  { href: 'https://ncpcr.gov.in/pocso/', label: 'POCSO e-Box (NCPCR)', note: 'Report sexual offences against children.' },
  { href: 'https://ncpcr.gov.in/index_ebaalnidan.php/main/complaint', label: 'e-Baal Nidan (NCPCR)', note: 'Online complaints about child rights.' },
  { href: 'https://pencil.gov.in', label: 'PENCIL Portal', note: 'Report child labour.' },
  { href: 'https://consumerhelpline.gov.in', label: 'National Consumer Helpline', note: 'Consumer complaints.' },
  { href: 'https://nalsa.gov.in', label: 'NALSA (free legal aid)', note: 'Free legal services.' },
];

export const reportSteps = [
  { id: 'r1', title: 'Get safe', text: 'Move away from the situation or stop the conversation. If someone is in danger, call 112.' },
  { id: 'r2', title: 'Tell a trusted adult', text: 'A parent, teacher or counsellor can help you choose the right channel.' },
  { id: 'r3', title: 'Save evidence', text: 'Take screenshots with the date and link. Do not save or forward images of anyone under 18. Show them to an adult instead.' },
  { id: 'r4', title: 'Use the right channel', text: 'Check the table below to see where your situation should be reported.' },
  { id: 'r5', title: 'Keep the reference number', text: 'Write down any complaint or reference number and follow up if you do not hear back.' },
];

export const disclaimer =
  'This is learning material for young people, not legal advice. Laws and rules change, so check the official sites or ask a trusted adult or a lawyer about a real situation. Please do not type real complaints or personal details into EduRights.';