/**
 * educationRightsQuiz.js
 * Module 1: The Shield of Knowledge (Education Rights, RTE Act 2009)
 */

const educationRightsQuiz = {
  title: 'The Shield of Knowledge — Quick Quiz',
  questions: [
    {
      id: 'q1',
      prompt: "In Aarav's story, what came down in a beam of golden light to unlock the heavy school gate?",
      options: [
        { id: 'a', text: 'A giant metal hammer' },
        { id: 'b', text: 'A glowing Golden Book-Key (the Right to Education Act, 2009)' },
        { id: 'c', text: 'A bag of silver coins' },
        { id: 'd', text: 'A magic ladder to climb over the wall' },
      ],
      correctOptionId: 'b',
      explanation:
        'The glowing Golden Book-Key represents the Right to Education (RTE) Act, 2009—which unlocks the school gate for every child!',
      xp: 10,
    },
    {
      id: 'q2',
      prompt: 'Under the Right to Education (RTE) Act, 2009, which children have the right to free and compulsory education?',
      options: [
        { id: 'a', text: 'Every child aged 6 to 14 years' },
        { id: 'b', text: 'Only children aged 3 to 5 years' },
        { id: 'c', text: 'Only teenagers above 16 years' },
        { id: 'd', text: 'Only children whose parents can pay school fees' },
      ],
      correctOptionId: 'a',
      explanation:
        'The RTE Act, 2009 guarantees every child in India aged 6 to 14 the fundamental right to free and compulsory education.',
      xp: 10,
    },
    {
      id: 'q3',
      prompt: "What do the words 'Free and Compulsory' mean in the Right to Education Act?",
      options: [
        { id: 'a', text: 'Only the first day of school is free' },
        {
          id: 'b',
          text: 'Free means no fees can stop you, and Compulsory means the government must make sure a school is there for you',
        },
        { id: 'c', text: 'Children must buy their own school gate keys' },
        { id: 'd', text: 'School is only open on Sundays' },
      ],
      correctOptionId: 'b',
      explanation:
        'Free means no child has to pay fees that could stop them from learning, and Compulsory means the government must ensure every child can attend and complete elementary school!',
      xp: 20,
    },
    {
      id: 'q4',
      prompt: 'When Aarav walked through the open gate into the sunny schoolyard, what happened?',
      options: [
        { id: 'a', text: 'The school closed its doors' },
        { id: 'b', text: 'He had to pay coins at the door' },
        { id: 'c', text: 'Other children welcomed him, colourful books flew in the air, and golden stars shone above the school!' },
        { id: 'd', text: 'It started raining heavily' },
      ],
      correctOptionId: 'c',
      explanation:
        'Every child belongs in school! When the gate opened, Aarav joined his friends with flying books and shining stars.',
      xp: 20,
    },
  ],
};

export default educationRightsQuiz;