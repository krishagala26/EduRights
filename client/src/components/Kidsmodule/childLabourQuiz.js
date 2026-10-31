// Quiz data for Module 3 — "Playgrounds, Not Factories" (Anti-Child Labour).
// Pure data, no logic — rendered by the reusable ModuleQuiz.jsx component.

const childLabourQuiz = {
  title: 'Playgrounds, Not Factories',
  questions: [
    {
      id: 'q1',
      prompt: 'Where should Maya be going instead of the factory?',
      options: [
        { id: 'a', text: 'To school' },
        { id: 'b', text: 'To the market' },
        { id: 'c', text: 'Back to sleep' },
      ],
      correctOptionId: 'a',
      explanation: 'Every child has the right to go to school and learn!',
      xp: 20,
    },
    {
      id: 'q2',
      prompt: 'What does every child have the right to do?',
      options: [
        { id: 'a', text: 'Work in a factory' },
        { id: 'b', text: 'Play, learn and grow' },
        { id: 'c', text: 'Stay home alone all day' },
      ],
      correctOptionId: 'b',
      explanation:
        "The Child Labour Prohibition Act protects every child's right to play, learn and grow safely.",
      xp: 20,
    },
    {
      id: 'q3',
      prompt: "If you see a child working instead of going to school, what's a good first step?",
      options: [
        { id: 'a', text: "Ignore it, it's not my business" },
        { id: 'b', text: 'Tell a trusted adult, like a teacher or parent' },
        { id: 'c', text: 'Try to fix it yourself' },
      ],
      correctOptionId: 'b',
      explanation: 'Telling a trusted adult helps get the right help for that child.',
      xp: 20,
    },
    {
      id: 'q4',
      prompt: 'What happened to the ground as Maya walked toward school?',
      options: [
        { id: 'a', text: 'It turned from grey to green' },
        { id: 'b', text: 'It disappeared' },
        { id: 'c', text: 'It stayed the same' },
      ],
      correctOptionId: 'a',
      explanation: 'The world gets brighter and greener when every child gets to learn and play!',
      xp: 10,
    },
  ],
};

export default childLabourQuiz;