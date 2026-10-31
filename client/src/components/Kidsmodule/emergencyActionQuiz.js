// Quiz data for Module 6 — "The Magic Number" (Emergency Action).
// Pure data, no logic — rendered by the reusable ModuleQuiz.jsx component.

const emergencyActionQuiz = {
  title: 'The Magic Number',
  questions: [
    {
      id: 'q1',
      prompt: 'Which of these is an emergency?',
      options: [
        { id: 'a', text: 'Spilling some juice' },
        { id: 'b', text: 'A fire in the building' },
        { id: 'c', text: 'Feeling a little bored' },
      ],
      correctOptionId: 'b',
      explanation:
        'An emergency is a situation where someone may be in danger and needs help right away, like a fire.',
      xp: 10,
    },
    {
      id: 'q2',
      prompt: "Which is India's nationwide emergency number?",
      options: [
        { id: 'a', text: '211' },
        { id: 'b', text: '121' },
        { id: 'c', text: '112' },
      ],
      correctOptionId: 'c',
      explanation:
        '112 is the emergency number for the whole country. It can connect people to police, fire and medical help.',
      xp: 10,
    },
    {
      id: 'q3',
      prompt: 'Riya sees a small fire. What does she do first?',
      options: [
        { id: 'a', text: 'Moves to a safe place and tells a trusted adult' },
        { id: 'b', text: 'Runs closer to put it out herself' },
        { id: 'c', text: 'Hides and tells nobody' },
      ],
      correctOptionId: 'a',
      explanation:
        'Safety comes first. Move away, tell a trusted adult, and let the helpers handle the danger.',
      xp: 20,
    },
    {
      id: 'q4',
      prompt: 'What helpful things can you tell the helper on a 112 call?',
      options: [
        { id: 'a', text: 'Your favourite colour' },
        { id: 'b', text: 'Where you are and what happened' },
        { id: 'c', text: 'Your school marks' },
      ],
      correctOptionId: 'b',
      explanation:
        'Saying where you are and what happened helps the right helpers find you faster. Speak slowly and calmly.',
      xp: 20,
    },
    {
      id: 'q5',
      prompt: 'When is it okay to call 112?',
      options: [
        { id: 'a', text: 'As a joke' },
        { id: 'b', text: 'To practise' },
        { id: 'c', text: 'Only in a real emergency' },
      ],
      correctOptionId: 'c',
      explanation:
        'Emergency services are for real emergencies. Prank or practice calls can stop helpers from reaching someone who really needs them.',
      xp: 20,
    },
  ],
};

export default emergencyActionQuiz;
