/**
 * personalSafetyQuiz.js
 * Module 2: The Body Guard Rules (Personal Safety, POCSO Act 2012)
 */

const personalSafetyQuiz = {
  title: 'The Body Guard Rules — Quick Quiz',
  questions: [
    {
      id: 'q1',
      prompt: "In Asha's story, what happened when the grey shape drifted too close and made her Safety Bubble turn amber?",
      options: [
        { id: 'a', text: 'Her Safety Bubble vanished and she stayed quiet' },
        {
          id: 'b',
          text: 'Asha held up her hand, a big orange "NO!" badge appeared, and a bright shockwave pushed the shape far away',
        },
        { id: 'c', text: 'She let the grey shape inside her bubble' },
        { id: 'd', text: 'She gave the shape a golden star' },
      ],
      correctOptionId: 'b',
      explanation:
        'Asha used her Body Guard power! She said a loud "NO!", her Safety Bubble flashed brightly, and she moved to the Safe Circle.',
      xp: 10,
    },
    {
      id: 'q2',
      prompt: 'Which Indian law protects every child under 18 from harm and abuse?',
      options: [
        { id: 'a', text: 'The POCSO Act, 2012' },
        { id: 'b', text: 'The Motor Vehicles Act' },
        { id: 'c', text: 'The Sports Club Rulebook' },
        { id: 'd', text: 'The Park Playtime Act' },
      ],
      correctOptionId: 'a',
      explanation:
        'The POCSO Act, 2012 (Protection of Children from Sexual Offences Act) is a strong law that protects every child under 18.',
      xp: 10,
    },
    {
      id: 'q3',
      prompt: 'If anyone—even someone you know—makes you feel uncomfortable or confused, what should you do?',
      options: [
        { id: 'a', text: 'Keep it a secret forever' },
        { id: 'b', text: 'Blame yourself and hide' },
        {
          id: 'c',
          text: 'Say NO loudly, move away, and tell a trusted adult—keep telling until someone listens!',
        },
        { id: 'd', text: 'Wait until you grow up to tell someone' },
      ],
      correctOptionId: 'c',
      explanation:
        'It is NEVER your fault. Say NO loudly, move away, and go to your Safe Circle of trusted adults (like parents, teachers, or helpers).',
      xp: 20,
    },
    {
      id: 'q4',
      prompt: 'At the end of the animation, which free 24/7 emergency helpline number appeared on the glowing sign?',
      options: [
        { id: 'a', text: '1098 — Childline (Free, Day & Night)' },
        { id: 'b', text: '9999' },
        { id: 'c', text: '1234' },
        { id: 'd', text: '5050' },
      ],
      correctOptionId: 'a',
      explanation:
        'Childline 1098 is India’s free 24-hour emergency phone helpline for children who need help or protection, any time of day or night.',
      xp: 20,
    },
  ],
};

export default personalSafetyQuiz;