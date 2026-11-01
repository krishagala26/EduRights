import AdolescentLabourScene from "./AdolescentLabourScene.js";

const adolescentLabour = {
  slug: "adolescent-labour",
  number: 4,
  emoji: "⚙️",
  tone: "sun",

  title: "Work Smart, Stay Safe",

  topic: "Adolescent Labour Laws",

  coreTheme:
    "Child & Adolescent Labour (Prohibition and Regulation) Act, 1986 (amended 2016)",

  minutes: "8-10",

  scene: AdolescentLabourScene,

  hook: {
  label: "Picture this",
  text:
    "A 15-year-old student is offered a job after school that promises quick money. The pay sounds good, but nobody talks about safety, working hours or education. What should happen next?",
},

note:
  "Learning skills and helping families can be positive, but every child and adolescent has the right to safety, education and a healthy future.",
 scenarios: [
{
  id: "s1",
  title: "The Factory Job Offer",

  context:
    "A local factory offers a 15-year-old student weekend work operating machinery.",

  messages: [
    {
      from: "Employer",
      text: "You can start tomorrow. No training needed."
    },

    {
      from: "Friend",
      text: "The pay is really good!"
    }
  ],

  steps: [
    {
      id: "st1",

      prompt: "What should the student do first?",

      choices: [
        {
          id: "a",
          text: "Accept immediately",

          rating: "risky",

          feedback:
            "Dangerous work should never be accepted without understanding the safety risks."
        },

        {
          id: "b",
          text: "Check whether the work is safe and legal",

          rating: "best",

          feedback:
            "Correct. Safety and legality should always come first."
        },

        {
          id: "c",
          text: "Quit school for the job",

          rating: "risky",

          feedback:
            "Education is essential and should not be sacrificed."
        }
      ]
    }
  ],

  remember: [
    "Safety always comes before money.",
    "Hazardous work can put young people at risk.",
    "Education is important for future opportunities."
  ]
},

{
  id:"s2",

  title:"Helping In A Family Business",

  context:
    "A teenager helps in a family shop after school.",

  messages:[
    {
      from:"Parent",
      text:"Can you help for two hours this evening?"
    }
  ],

  steps:[
    {
      id:"st1",

      prompt:
        "Which choice is the healthiest balance?",

      choices:[
        {
          id:"a",
          text:"Help after school while continuing studies",

          rating:"best",

          feedback:
            "A balanced routine supports both learning and responsibility."
        },

        {
          id:"b",
          text:"Skip school regularly",

          rating:"risky",

          feedback:
            "Missing education can negatively affect future opportunities."
        },

        {
          id:"c",
          text:"Operate dangerous equipment",

          rating:"risky",

          feedback:
            "Young people should not perform hazardous tasks."
        }
      ]
    }
  ],

  remember:[
    "Family responsibilities should not stop education.",
    "Safety rules matter everywhere.",
    "Healthy balance is important."
  ]
},

{
  id:"s3",

  title:"Unsafe Working Conditions",

  context:
    "A teenager notices unsafe conditions at a workplace.",

  messages:[
    {
      from:"Co-worker",
      text:"Nobody uses safety equipment here."
    },

    {
      from:"Supervisor",
      text:"Don't complain if you want to keep working."
    }
  ],

  steps:[
    {
      id:"st1",

      prompt:
        "What is the safest action?",

      choices:[
        {
          id:"a",
          text:"Ignore the risks",

          rating:"risky",

          feedback:
            "Unsafe conditions can lead to serious injuries."
        },

        {
          id:"b",
          text:"Report concerns to a trusted adult or authority",

          rating:"best",

          feedback:
            "Speaking up helps protect everyone."
        },

        {
          id:"c",
          text:"Encourage others to take more risks",

          rating:"risky",

          feedback:
            "Unsafe behaviour increases danger."
        }
      ]
    }
  ],

  remember:[
    "Unsafe work should be reported.",
    "Every worker deserves protection.",
    "Speaking up can prevent accidents."
  ]
}
 ],

learn: {
  heading: "Know the facts",

  intro:
    "Understanding labour laws helps adolescents stay safe, continue education and make informed choices.",

  cards: [
  {
    id:"c1",
    emoji:"👦",
    title:"Who Is A Child?",
    text:
      "Under the law, a child is a person below 14 years of age."
  },

  {
    id:"c2",
    emoji:"🧑",
    title:"Who Is An Adolescent?",
    text:
      "An adolescent is a person aged 14 to 18 years."
  },

  {
    id:"c3",
    emoji:"⚠️",
    title:"Hazardous Work",
    text:
      "Some jobs involve dangerous machinery, chemicals or environments that can harm health and safety."
  },

  {
    id:"c4",
    emoji:"📚",
    title:"Education First",
    text:
      "Work should never prevent a young person from receiving education."
  },

  {
    id:"c5",
    emoji:"🦺",
    title:"Workplace Safety",
    text:
      "Safe workplaces provide proper training and protective equipment."
  },

  {
    id:"c6",
    emoji:"🤝",
    title:"Know Your Rights",
    text:
      "Young workers deserve respect, safety and fair treatment."
  }
],

  laws: {
    title: "The law in plain words",

    rows: [
      {
        law: "Child & Adolescent Labour Act",
        plain:
          "Children below 14 years cannot be employed in any occupation, except specific family and entertainment exemptions under the law.",
      },

      {
        law: "Adolescents (14-18)",
        plain:
          "Adolescents cannot be employed in hazardous occupations or hazardous processes.",
      },

      {
        law: "Education Rights",
        plain:
          "Work should never interfere with a child's or adolescent's education.",
      },
    ],
  },

  bonus: {
    title: "Level up: bonus facts",

    items: [
      {
        id: "b1",
        emoji: "📚",
        title: "Education Opens Doors",
        text:
          "Education creates opportunities that often provide better long-term outcomes than early employment.",
      },

      {
        id: "b2",
        emoji: "🦺",
        title: "Safety First",
        text:
          "Protective equipment and training help reduce workplace injuries.",
      },
    ],
  },

  helplines: [
    {
      label: "CHILDLINE",
      value: "1098",
      note: "24-hour child assistance.",
    },

    {
      label: "National Emergency",
      value: "112",
      note: "Emergency help.",
    },
  ],

  links: [
    {
      label: "Ministry of Labour & Employment",
      href: "https://labour.gov.in",
    },

    {
      label: "National Commission for Protection of Child Rights",
      href: "https://ncpcr.gov.in",
    },
  ],

  disclaimer:
    "This is educational material and not legal advice.",
},

quiz: {
  title: "Work Smart, Stay Safe Quiz",

  questions: [
    {
      id: "q1",

      prompt:
        "Who is considered an adolescent under the Child & Adolescent Labour law?",

      options: [
        {
          id: "a",
          text: "Below 14 years",
        },
        {
          id: "b",
          text: "14 to 18 years",
        },
        {
          id: "c",
          text: "18 to 21 years",
        },
        {
          id: "d",
          text: "Above 21 years",
        },
      ],

      correctOptionId: "b",

      explanation:
        "An adolescent is a person aged 14 years and above but below 18 years.",

      xp: 15,
    },

    {
      id: "q2",

      prompt:
        "Before accepting any job, what should a young person check first?",

      options: [
        {
          id: "a",
          text: "Whether friends are doing it",
        },
        {
          id: "b",
          text: "How quickly they will get paid",
        },
        {
          id: "c",
          text: "Safety and legality of the work",
        },
        {
          id: "d",
          text: "Whether it is close to home",
        },
      ],

      correctOptionId: "c",

      explanation:
        "Work should be legal, safe and should not put a young person's health or future at risk.",

      xp: 15,
    },

    {
      id: "q3",

      prompt:
        "Why is continuing education important for adolescents?",

      options: [
        {
          id: "a",
          text: "It helps create future opportunities and skills",
        },
        {
          id: "b",
          text: "It is less tiring than work",
        },
        {
          id: "c",
          text: "It guarantees a job immediately",
        },
        {
          id: "d",
          text: "It is only important until age 15",
        },
      ],

      correctOptionId: "a",

      explanation:
        "Education develops knowledge, skills and opportunities for future careers and personal growth.",

      xp: 15,
    },

    {
      id: "q4",

      prompt:
        "What should you do if you notice unsafe conditions at a workplace?",

      options: [
        {
          id: "a",
          text: "Ignore it",
        },
        {
          id: "b",
          text: "Encourage others to take risks",
        },
        {
          id: "c",
          text: "Report concerns to a trusted adult or authority",
        },
        {
          id: "d",
          text: "Keep working without safety gear",
        },
      ],

      correctOptionId: "c",

      explanation:
        "Unsafe workplaces should be reported so that injuries and accidents can be prevented.",

      xp: 20,
    },

    {
      id: "q5",

      prompt:
        "Which of the following is considered a hazardous activity for adolescents?",

      options: [
        {
          id: "a",
          text: "Helping customers in a family shop",
        },
        {
          id: "b",
          text: "Organising books in a library",
        },
        {
          id: "c",
          text: "Operating dangerous industrial machinery",
        },
        {
          id: "d",
          text: "Helping with school projects",
        },
      ],

      correctOptionId: "c",

      explanation:
        "Hazardous work involving dangerous machinery, chemicals or unsafe environments can seriously harm health and safety.",

      xp: 20,
    },

    {
      id: "q6",

      prompt:
        "What is the main goal of adolescent labour laws?",

      options: [
        {
          id: "a",
          text: "Increase factory production",
        },
        {
          id: "b",
          text: "Ensure adolescents work longer hours",
        },
        {
          id: "c",
          text: "Protect health, safety and education",
        },
        {
          id: "d",
          text: "Reduce school attendance",
        },
      ],

      correctOptionId: "c",

      explanation:
        "The law aims to protect adolescents from dangerous work and ensure their education, health and development are not harmed.",

      xp: 15,
    },
  ],
},

action: {
  title: "Workplace Safety Checklist",

  intro:
    "Try these actions this week.",

  items: [
    "Learn the difference between safe and unsafe workplaces.",
    "Talk with a trusted adult before accepting any work.",
    "Prioritise education and skill development.",
    "Know emergency numbers such as 1098 and 112.",
    "Speak up if you see unsafe working conditions.",
  ],
},

credential: {
  emoji: "⚙️",

  name: "Workplace Safety Champion",

  text:
    "You understand adolescent labour rights, workplace safety and the importance of education.",
},
};

export default adolescentLabour;