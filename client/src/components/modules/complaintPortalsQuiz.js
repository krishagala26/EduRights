// Quiz data for Module 5 — "Digital Complaint Boxes" (NCPCR Portals).
// Pure data, no logic — rendered by the reusable ModuleQuiz.jsx component.

const complaintPortalsQuiz = {
  title: 'Digital Complaint Boxes',
  questions: [
    {
      id: 'q1',
      prompt: 'Asha is worried that a friend may not be safe. What does she do first?',
      options: [
        { id: 'a', text: 'Tries to solve it all alone' },
        { id: 'b', text: 'Tells a trusted adult, like her teacher' },
        { id: 'c', text: 'Keeps it a secret' },
      ],
      correctOptionId: 'b',
      explanation:
        'Telling a trusted adult is a brave and smart step. You never have to handle big worries alone.',
      xp: 20,
    },
    {
      id: 'q2',
      prompt: 'Which one is an official online channel run by NCPCR for concerns about sexual abuse of children?',
      options: [
        { id: 'a', text: 'A game chat room' },
        { id: 'b', text: 'A shopping website' },
        { id: 'c', text: 'POCSO e-Box' },
      ],
      correctOptionId: 'c',
      explanation:
        'POCSO e-Box is an official, child-focused channel. A trusted adult can help you understand how it works.',
      xp: 10,
    },
    {
      id: 'q3',
      prompt: 'What is e-Baal Nidan?',
      options: [
        { id: 'a', text: "NCPCR's online system for child-rights complaints" },
        { id: 'b', text: 'A video game' },
        { id: 'c', text: 'Exactly the same thing as POCSO e-Box' },
      ],
      correctOptionId: 'a',
      explanation:
        'e-Baal Nidan is for child-rights concerns. It is a different service from POCSO e-Box, and each has its own purpose.',
      xp: 20,
    },
    {
      id: 'q4',
      prompt: 'In the story, who helped Asha understand which official channel to use?',
      options: [
        { id: 'a', text: 'A stranger online' },
        { id: 'b', text: 'A trusted adult' },
        { id: 'c', text: 'Nobody' },
      ],
      correctOptionId: 'b',
      explanation:
        'Teachers, parents and other trusted adults can help children find the right place to ask for help.',
      xp: 10,
    },
    {
      id: 'q5',
      prompt: 'If someone is not safe, what should a child remember?',
      options: [
        { id: 'a', text: 'Investigate it alone' },
        { id: 'b', text: 'Wait and hope it goes away' },
        { id: 'c', text: 'Getting help from a trusted adult is the right thing to do' },
      ],
      correctOptionId: 'c',
      explanation:
        'Asking for help is a good thing. Grown-ups and official helpers are there so children do not have to solve serious problems alone.',
      xp: 20,
    },
  ],
};

export default complaintPortalsQuiz;
