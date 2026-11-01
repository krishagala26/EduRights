import JuvenileJusticeScene from "./JuvenileJusticeScene.js";

const juvenileJustice = {
  slug: "juvenile-justice",
  number: 3,
  emoji: "⚖️",
  tone: "sky",

  title: "Voices, Not Verdicts",
  topic: "Juvenile Justice Rights",

  coreTheme:
    "Juvenile Justice (Care and Protection of Children) Act, 2015",

  minutes: "8-10",

  scene: JuvenileJusticeScene,

  hook: {
  label: "Picture this",
  text:
    "A video of a student being taken to a police station starts circulating online. Within hours, hundreds of comments call him a criminal. But does one mistake define a person's entire future?",
    },
 
  note:
  "This module explains fairness, dignity, privacy and second chances. The Juvenile Justice system focuses on helping children learn from mistakes and rebuild their future.",

  scenarios: [
    {
      id: "s1",
      title: "The School Incident",

      context:
        "A window is broken during lunch break. Several students blame Arjun.",

      messages: [
        {
          from: "Student",
          text: "I saw Arjun near the classroom!",
        },
        {
          from: "Teacher",
          text: "Let's not jump to conclusions.",
        },
      ],

      steps: [
        {
          id: "st1",

          prompt:
            "What should happen first?",

          choices: [
            {
              id: "a",
              text: "Punish Arjun immediately",
              rating: "risky",

              feedback:
                "Every child deserves a fair hearing before decisions are made.",
            },

            {
              id: "b",
              text: "Investigate fairly and hear all sides",
              rating: "best",

              feedback:
                "Correct. Juvenile justice focuses on fairness and due process.",
            },

            {
              id: "c",
              text: "Share accusations online",
              rating: "risky",

              feedback:
                "Public shaming harms a child's dignity and reputation.",
            },
          ],
        },
      ],

      remember: [
        "Every child has a right to be heard.",
        "Do not label children permanently for mistakes.",
        "Rehabilitation is a key principle of juvenile justice.",
      ],
    },
  ],

  learn: {
    heading: "Know the facts",

    intro:
      "The Juvenile Justice Act protects children and promotes rehabilitation.",

    cards: [
  {
    id: "jj1",
    emoji: "⚖️",
    title: "Fair Treatment",
    text:
      "Every child has the right to be treated fairly and have their side of the story heard.",
  },
  {
    id: "jj2",
    emoji: "🔒",
    title: "Privacy Matters",
    text:
      "Children involved in legal matters have privacy protections. Their identity should not be publicly shared.",
  },
  {
    id: "jj3",
    emoji: "🌱",
    title: "Rehabilitation",
    text:
      "The goal of juvenile justice is to help children learn, grow and make better choices.",
  },
  {
    id: "jj4",
    emoji: "🤝",
    title: "Care & Protection",
    text:
      "Some children need support, counselling and protection to stay safe and develop positively.",
  },
  {
    id: "jj5",
    emoji: "🎤",
    title: "Right To Be Heard",
    text:
      "Children should be allowed to express their views during decisions affecting them.",
  },
  {
    id: "jj6",
    emoji: "🚀",
    title: "Second Chances",
    text:
      "A mistake should not decide a person's future forever.",
  },
],


    laws: {
     title: "The law in plain words",

  rows: [
    {
      law: "Juvenile Justice Act, 2015",
      plain:
        "Provides care, protection, rehabilitation and social reintegration for children.",
    },

    {
      law: "Child-Friendly Justice",
      plain:
        "Children must be treated with dignity, sensitivity and fairness throughout legal processes.",
    },

    {
      law: "Privacy Protection",
      plain:
        "The identity of children involved in legal matters should not be publicly disclosed.",
    },

    {
      law: "Rehabilitation",
      plain:
        "The focus is on helping children become responsible members of society instead of permanent punishment.",
    },
  ],
},
    
    bonus: {
  title: "Level up: bonus facts",

  items: [
    {
      id: "b1",
      emoji: "💡",
      title: "Second Chances Matter",
      text:
        "Many successful adults made mistakes when they were young. Growth is always possible.",
    },
    {
      id: "b2",
      emoji: "🧠",
      title: "Teen Brains Are Still Developing",
      text:
        "Decision-making and self-control continue developing through the teenage years.",
    },
    {
      id: "b3",
      emoji: "📵",
      title: "Think Before Sharing",
      text:
        "Forwarding rumours or videos can hurt someone long after the incident ends.",
    },
    {
      id: "b4",
      emoji: "🤝",
      title: "Support Beats Shame",
      text:
        "Positive guidance helps children improve more than public humiliation.",
    },
    {
      id: "b5",
      emoji: "🎯",
      title: "Actions Have Consequences",
      text:
        "Being accountable is important, but accountability should also involve learning and improvement.",
    },
    {
      id: "b6",
      emoji: "🌱",
      title: "People Can Change",
      text:
        "The justice system recognises that children have the ability to learn from mistakes.",
    },
  ],
},

    helplines: [
      {
        label: "CHILDLINE",
        value: "1098",
        note: "24/7 child support service.",
      },
    ],

    links: [
      {
        label: "Child Rights Information",
        href: "https://ncpcr.gov.in",
      },
    ],

    disclaimer:
      "This is educational material and not legal advice.",
  },

quiz: {
  title: "Voices, Not Verdicts Quiz",

  questions: [
    {
      id: "q1",
      prompt: "What is the main purpose of the Juvenile Justice system?",

      options: [
        { id: "a", text: "Rehabilitation and reintegration" },
        { id: "b", text: "Public punishment" },
        { id: "c", text: "Social media exposure" },
        { id: "d", text: "Permanent labeling" },
      ],

      correctOptionId: "a",

      explanation:
        "The system focuses on helping children learn, improve and rejoin society positively.",

      xp: 20,
    },

    {
      id: "q2",
      prompt: "Why should videos involving children in legal matters not be shared?",

      options: [
        { id: "a", text: "To protect privacy and dignity" },
        { id: "b", text: "To make the internet faster" },
        { id: "c", text: "To protect phone battery life" },
        { id: "d", text: "There is no reason" },
      ],

      correctOptionId: "a",

      explanation:
        "Children have privacy rights and should not be publicly exposed.",

      xp: 15,
    },

    {
      id: "q3",
      prompt: "What is a key principle of juvenile justice?",

      options: [
        { id: "a", text: "Public shaming" },
        { id: "b", text: "Fair treatment" },
        { id: "c", text: "Online rumours" },
        { id: "d", text: "Exclusion" },
      ],

      correctOptionId: "b",

      explanation:
        "Every child deserves fair treatment and an opportunity to be heard.",

      xp: 15,
    },

    {
      id: "q4",
      prompt: "Before making decisions about a child, what should happen?",

      options: [
        { id: "a", text: "Listen to all sides" },
        { id: "b", text: "Believe rumours" },
        { id: "c", text: "Punish first" },
        { id: "d", text: "Post on social media" },
      ],

      correctOptionId: "a",

      explanation:
        "Fair investigations require hearing all perspectives.",

      xp: 15,
    },

    {
      id: "q5",
      prompt: "How should a child returning after legal trouble be treated?",

      options: [
        { id: "a", text: "Ignored forever" },
        { id: "b", text: "Mocked by others" },
        { id: "c", text: "Supported respectfully" },
        { id: "d", text: "Continually reminded of mistakes" },
      ],

      correctOptionId: "c",

      explanation:
        "Respect and support encourage positive change.",

      xp: 20,
    },

    {
      id: "q6",
      prompt: "What does rehabilitation mean?",

      options: [
        { id: "a", text: "Helping children learn and improve" },
        { id: "b", text: "Permanent punishment" },
        { id: "c", text: "Public embarrassment" },
        { id: "d", text: "Exclusion from society" },
      ],

      correctOptionId: "a",

      explanation:
        "Rehabilitation focuses on growth, learning and responsible behaviour.",

      xp: 15,
    },
  ],
},


  action: {
    title: "Respect & Fairness Checklist",

    intro:
      "Practice these actions this week.",

    items: [
      "Listen before judging.",
      "Respect everyone's dignity.",
      "Speak up against unfair treatment.",
      "Support rehabilitation over labels.",
    ],
  },

  credential: {
    emoji: "⚖️",

    name: "Rights Advocate",

    text:
      "You understand juvenile justice and children's rights.",
  },
};

export default juvenileJustice;