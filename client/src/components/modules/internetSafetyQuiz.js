// Quiz data for Module 4 — "The Digital Shield" (Online Safety, Privacy &
// Cyber-Awareness). Pure data, no logic — rendered by the reusable
// ModuleQuiz.jsx component.

const internetSafetyQuiz = {
  title: 'The Digital Shield',
  questions: [
    {
      id: 'q1',
      prompt: 'What should Zee do if a stranger sends a mean or tricky message?',
      options: [
        { id: 'a', text: 'Reply and argue back' },
        { id: 'b', text: 'Block them and tell a trusted adult' },
        { id: 'c', text: 'Share personal details to make them stop' },
      ],
      correctOptionId: 'b',
      explanation: 'Blocking and telling a trusted adult keeps you safe online.',
      xp: 20,
    },
    {
      id: 'q2',
      prompt: 'Which of these should you keep locked and private?',
      options: [
        { id: 'a', text: 'Your favourite color' },
        { id: 'b', text: 'Your home address and passwords' },
        { id: 'c', text: 'Your favourite game' },
      ],
      correctOptionId: 'b',
      explanation: 'Personal information like your address and passwords should always stay private.',
      xp: 20,
    },
    {
      id: 'q3',
      prompt: "What did Zee's digital shield do to the warning messages?",
      options: [
        { id: 'a', text: 'Let them all through' },
        { id: 'b', text: 'Blocked and deflected them' },
        { id: 'c', text: 'Turned them into games' },
      ],
      correctOptionId: 'b',
      explanation:
        'A digital shield — like good safety habits — blocks harmful messages from reaching you.',
      xp: 10,
    },
    {
      id: 'q4',
      prompt: "True or False: It's okay to share your password with an online friend you've never met.",
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' },
      ],
      correctOptionId: 'b',
      explanation: 'Never share passwords, even with online friends — keep them locked and safe!',
      xp: 20,
    },
  ],
};

export default internetSafetyQuiz;