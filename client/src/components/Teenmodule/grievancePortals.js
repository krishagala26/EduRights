import GrievancePortalsScene from "./GrievancePortalsScene.js";

const grievancePortals = {
  slug: "grievance-portals",
  number: 6,
  emoji: "📞",
  tone: "emerald",

  title: "Direct Line to Help",

  topic: "Emergency Action & Portals",

  coreTheme:
    "Using e-BaalNidan and 1098 for confidential grievance redressal.",

  minutes: "8-10",

  scene: GrievancePortalsScene,

  hook: {
    label: "Picture this",
    text:
      "A 15-year-old faces a serious problem at school and online threats at the same time. They want to ask for official help, but they are unsure which helpline or portal to use and worry whether their privacy will be protected. What should happen next?",
  },

  note:
    "Knowing your rights is the first step. Knowing which helpline or official portal to reach out to—along with a trusted adult—turns knowledge into real protection.",

  scenarios: [
    {
      id: "s1",
      title: "School Rights Violation",

      context:
        "A school refuses to issue a student's transfer certificate and subjects students to harsh punishment despite parents raising concerns.",

      messages: [
        {
          from: "Parent",
          text: "The school administration is ignoring our written requests.",
        },
        {
          from: "Student",
          text: "Is there an official child-rights portal where we can complain for free?",
        },
      ],

      steps: [
        {
          id: "st1",

          prompt: "Which official portal should the family use to report a child-rights violation?",

          choices: [
            {
              id: "a",
              text: "File a complaint on the NCPCR e-BaalNidan portal with a parent or trusted adult",

              rating: "best",

              feedback:
                "Correct. e-BaalNidan is NCPCR's free online grievance portal dedicated to resolving child-rights violations.",
            },

            {
              id: "b",
              text: "Post angry rumors on anonymous social media pages",

              rating: "risky",

              feedback:
                "Social media pages cannot enforce the law and may expose personal details.",
            },

            {
              id: "c",
              text: "Give up because legal help is too expensive",

              rating: "risky",

              feedback:
                "Filing a complaint on e-BaalNidan or calling 1098 is completely free and does not require a lawyer.",
            },
          ],
        },
      ],

      remember: [
        "e-BaalNidan (ebaalnidan.nic.in) is a free official portal for child-rights complaints.",
        "Include clear facts, dates and documents when filing a grievance.",
        "Always save the complaint tracking number for follow-up.",
      ],
    },

    {
      id: "s2",

      title: "Confidential Help In Distress",

      context:
        "A teenager is in distress and needs urgent guidance, but worries that calling a helpline will make their name public at school.",

      messages: [
        {
          from: "Friend",
          text: "I need help right now, but what if 1098 tells everyone at school?",
        },
      ],

      steps: [
        {
          id: "st1",

          prompt: "What is the most accurate and helpful advice?",

          choices: [
            {
              id: "a",
              text: "Call Childline 1098 or tell a trusted adult—calls are free, 24/7 and strictly confidential",

              rating: "best",

              feedback:
                "Correct. Indian child-protection laws strictly protect the privacy and identity of anyone under 18 seeking help.",
            },

            {
              id: "b",
              text: "Keep the problem hidden forever",

              rating: "risky",

              feedback:
                "Staying silent keeps the person unsafe when free, confidential support is available.",
            },

            {
              id: "c",
              text: "Share personal details with strangers online for advice",

              rating: "risky",

              feedback:
                "Sharing private problems with unverified strangers online can increase risk.",
            },
          ],
        },
      ],

      remember: [
        "Childline 1098 is toll-free, confidential and available 24 hours a day.",
        "Indian law prohibits disclosing the identity of a child in need of care and protection.",
        "Trusted adults and official helplines work to keep young people safe.",
      ],
    },

    {
      id: "s3",

      title: "Choosing The Right Emergency Number",

      context:
        "A classmate is facing online blackmail and threats on a messaging app.",

      messages: [
        {
          from: "Classmate",
          text: "They are threatening to post fake photos unless I pay money.",
        },

        {
          from: "Sibling",
          text: "Don't delete the messages! Let's report it to the official cyber helpline right now.",
        },
      ],

      steps: [
        {
          id: "st1",

          prompt: "What is the safest action to take?",

          choices: [
            {
              id: "a",
              text: "Delete the account and pay the blackmailer",

              rating: "risky",

              feedback:
                "Paying blackmailers never stops the demands, and deleting messages destroys evidence.",
            },

            {
              id: "b",
              text: "Save unedited screenshots, inform a trusted adult, and report via 1930, cybercrime.gov.in or POCSO e-Box",

              rating: "best",

              feedback:
                "Correct. Preserving evidence and reporting through official channels stops the offender.",
            },

            {
              id: "c",
              text: "Threaten the blackmailer back in private messages",

              rating: "risky",

              feedback:
                "Engaging with the offender can escalate danger.",
            },
          ],
        },
      ],

      remember: [
        "Never delete evidence—save screenshots showing usernames, links and dates.",
        "Use 1930 or cybercrime.gov.in for cyber crimes and POCSO e-Box for offences against minors.",
        "Dial 112 immediately if anyone is in physical danger.",
      ],
    },
  ],

  learn: {
    heading: "Know the facts",

    intro:
      "Understanding official helplines and grievance portals ensures that young people and families can get timely, confidential support.",

    cards: [
      {
        id: "c1",
        emoji: "📞",
        title: "Childline 1098",
        text:
          "India's 24-hour, toll-free national helpline for any child or adolescent under 18 who needs care, protection or emergency assistance.",
      },

      {
        id: "c2",
        emoji: "💻",
        title: "e-BaalNidan Portal",
        text:
          "An online portal by NCPCR (ebaalnidan.nic.in) where anyone can file and track complaints about violations of child rights for free.",
      },

      {
        id: "c3",
        emoji: "🛡️",
        title: "POCSO e-Box",
        text:
          "A confidential online reporting tool on the NCPCR website for reporting sexual offences or harassment against children under 18.",
      },

      {
        id: "c4",
        emoji: "🌐",
        title: "Cyber Helpline 1930",
        text:
          "The national helpline and portal (cybercrime.gov.in) to report online financial fraud, cyberbullying, blackmail and image abuse.",
      },

      {
        id: "c5",
        emoji: "🚨",
        title: "Emergency 112",
        text:
          "India's unified emergency response number connecting immediately to police, fire and ambulance services.",
      },

      {
        id: "c6",
        emoji: "💚",
        title: "Tele-MANAS 14416",
        text:
          "A free, 24/7 government helpline offering confidential mental-health support and counselling.",
      },
    ],

    laws: {
      title: "The law in plain words",

      rows: [
        {
          law: "CPCR Act, 2005",
          plain:
            "Establishes the National and State Commissions for Protection of Child Rights (NCPCR / SCPCR) to investigate complaints and safeguard children's rights.",
        },

        {
          law: "Right to Confidentiality (JJ Act & POCSO Act)",
          plain:
            "Strictly prohibits disclosing the name, address, school or photograph of a child victim or witness in any media or public forum.",
        },

        {
          law: "Free Legal Aid",
          plain:
            "Under the Legal Services Authorities Act, every child under 18 has the right to free legal aid and representation.",
        },
      ],
    },

    bonus: {
      title: "Level up: bonus facts",

      items: [
        {
          id: "b1",
          emoji: "📸",
          title: "Preserving Evidence",
          text:
            "Keep unedited screenshots with dates, times and profile links so authorities can investigate effectively.",
        },

        {
          id: "b2",
          emoji: "🔒",
          title: "Confidential Reporting",
          text:
            "Official portals like e-BaalNidan and POCSO e-Box handle complaints sensitively and protect your identity by law.",
        },
      ],
    },

    helplines: [
      {
        label: "CHILDLINE",
        value: "1098",
        note: "24-hour toll-free child protection and assistance.",
      },

      {
        label: "National Emergency",
        value: "112",
        note: "Immediate police, medical or fire emergency help.",
      },

      {
        label: "Cyber Crime Helpline",
        value: "1930",
        note: "Report cyber fraud, online harassment and blackmail.",
      },

      {
        label: "Tele-MANAS",
        value: "14416",
        note: "Free 24/7 mental health support.",
      },
    ],

    links: [
      {
        label: "e-BaalNidan Portal (NCPCR)",
        href: "https://ebaalnidan.nic.in",
      },

      {
        label: "National Commission for Protection of Child Rights",
        href: "https://ncpcr.gov.in",
      },

      {
        label: "National Cyber Crime Reporting Portal",
        href: "https://cybercrime.gov.in",
      },
    ],

    disclaimer:
      "This is educational material and not legal advice. In an emergency, dial 112 or 1098 immediately.",
  },

  quiz: {
    title: "Direct Line to Help Quiz",

    questions: [
      {
        id: "q1",

        prompt:
          "What is the main purpose of the e-BaalNidan portal?",

        options: [
          {
            id: "a",
            text: "Playing online school games",
          },
          {
            id: "b",
            text: "Reporting and tracking violations of child rights to NCPCR",
          },
          {
            id: "c",
            text: "Booking train tickets",
          },
          {
            id: "d",
            text: "Shopping for school books",
          },
        ],

        correctOptionId: "b",

        explanation:
          "e-BaalNidan is NCPCR's dedicated online grievance redressal system for reporting violations of child rights.",

        xp: 15,
      },

      {
        id: "q2",

        prompt:
          "Which toll-free 24-hour helpline is dedicated to children under 18 in distress?",

        options: [
          {
            id: "a",
            text: "1098",
          },
          {
            id: "b",
            text: "139",
          },
          {
            id: "c",
            text: "1915",
          },
          {
            id: "d",
            text: "101",
          },
        ],

        correctOptionId: "a",

        explanation:
          "Childline 1098 is India's 24-hour, toll-free emergency phone service for children in need of care and protection.",

        xp: 15,
      },

      {
        id: "q3",

        prompt:
          "What should you do with chat messages before reporting online blackmail or harassment?",

        options: [
          {
            id: "a",
            text: "Delete the entire chat immediately",
          },
          {
            id: "b",
            text: "Take unedited screenshots showing the profile link, messages and date",
          },
          {
            id: "c",
            text: "Forward the threats to all your friends",
          },
          {
            id: "d",
            text: "Factory-reset your phone",
          },
        ],

        correctOptionId: "b",

        explanation:
          "Unedited screenshots showing the username, URL and timestamps serve as crucial evidence for cybercrime investigators.",

        xp: 15,
      },

      {
        id: "q4",

        prompt:
          "Does Indian law protect the identity of a child who reports abuse or seeks protection?",

        options: [
          {
            id: "a",
            text: "No, anyone can publish their name",
          },
          {
            id: "b",
            text: "Yes, revealing the identity of a child victim is strictly prohibited by law",
          },
          {
            id: "c",
            text: "Only if they pay a fee",
          },
          {
            id: "d",
            text: "Only in big cities",
          },
        ],

        correctOptionId: "b",

        explanation:
          "Both the Juvenile Justice Act and the POCSO Act strictly forbid publishing the name, school, photo or address of a child victim.",

        xp: 20,
      },

      {
        id: "q5",

        prompt:
          "Which number should you call for immediate police, fire or medical emergency assistance?",

        options: [
          {
            id: "a",
            text: "112",
          },
          {
            id: "b",
            text: "1915",
          },
          {
            id: "c",
            text: "14416",
          },
          {
            id: "d",
            text: "1800",
          },
        ],

        correctOptionId: "a",

        explanation:
          "112 is India's unified national emergency number for immediate police, ambulance or fire response.",

        xp: 20,
      },

      {
        id: "q6",

        prompt:
          "Which helpline provides free 24/7 confidential mental-health counselling in India?",

        options: [
          {
            id: "a",
            text: "1930",
          },
          {
            id: "b",
            text: "14416 (Tele-MANAS)",
          },
          {
            id: "c",
            text: "101",
          },
          {
            id: "d",
            text: "139",
          },
        ],

        correctOptionId: "b",

        explanation:
          "Tele-MANAS (14416) is the government's free 24/7 national tele-mental health service.",

        xp: 15,
      },
    ],
  },

  action: {
    title: "Emergency Readiness Checklist",

    intro:
      "Try these actions this week.",

    items: [
      "Save 1098 (Childline), 112 (Emergency), 1930 (Cyber Crime) and 14416 (Tele-MANAS) in your phone.",
      "Learn how the e-BaalNidan portal (ebaalnidan.nic.in) works with a parent or teacher.",
      "Identify at least two trusted adults you can talk to in an emergency.",
      "Check how the Emergency SOS button works on your mobile phone.",
      "Share these official helpline numbers with a friend.",
    ],
  },

  credential: {
    emoji: "📞",

    name: "Grievance & Action Champion",

    text:
      "You know how to use Childline 1098, e-BaalNidan and emergency portals safely and confidentially.",
  },
};

export default grievancePortals;