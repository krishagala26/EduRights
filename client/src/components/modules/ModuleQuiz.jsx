// // Reusable gamified quiz engine. Takes a `quiz` object ({ title, questions })
// // and plays through one question at a time, awarding XP per correct answer,
// // then shows a results screen. Doesn't know which module it belongs to —
// // Module 3 / Module 4 each pass their own question data
// // (childLabourQuiz.js / internetSafetyQuiz.js).

// import { useState } from 'react';
// import { CheckCircle2, XCircle, Zap, Trophy, ChevronRight, Sparkles } from 'lucide-react';
// import './ModuleQuiz.css';

// export default function ModuleQuiz({ quiz, onFinish }) {
//   const [index, setIndex] = useState(0);
//   const [selectedId, setSelectedId] = useState(null);
//   const [answered, setAnswered] = useState(false);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [xpEarned, setXpEarned] = useState(0);
//   const [finished, setFinished] = useState(false);

//   const question = quiz.questions[index];
//   const isLast = index === quiz.questions.length - 1;
//   const isCorrect = answered && selectedId === question.correctOptionId;

//   const handleSelect = (optionId) => {
//     if (answered) return;
//     setSelectedId(optionId);
//     setAnswered(true);
//     if (optionId === question.correctOptionId) {
//       setCorrectCount((c) => c + 1);
//       setXpEarned((xp) => xp + question.xp);
//     }
//   };

//   const handleNext = () => {
//     if (isLast) {
//       setFinished(true);
//       onFinish?.({
//         correctCount,
//         totalXp: xpEarned,
//         total: quiz.questions.length,
//       });
//       return;
//     }
//     setIndex((i) => i + 1);
//     setSelectedId(null);
//     setAnswered(false);
//   };

//   if (finished) {
//     const total = quiz.questions.length;
//     const allCorrect = correctCount === total;
//     return (
//       <div className="module-quiz module-quiz--results">
//         <Trophy className="module-quiz__trophy-icon" />
//         <h2>{allCorrect ? 'Perfect Score!' : 'Great Job!'}</h2>
//         <p className="module-quiz__score-line">
//           You got {correctCount} out of {total} correct
//         </p>
//         <div className="module-quiz__xp-pill">
//           <Zap size={18} />
//           +{xpEarned} XP earned
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="module-quiz">
//       <div className="module-quiz__header">
//         <span className="module-quiz__progress-label">
//           Question {index + 1} of {quiz.questions.length}
//         </span>
//         <div
//           className="module-quiz__progress-track"
//           role="progressbar"
//           aria-valuemin={0}
//           aria-valuemax={100}
//           aria-valuenow={Math.round(((index + (answered ? 1 : 0)) / quiz.questions.length) * 100)}
//         >
//           <div
//             className="module-quiz__progress-fill"
//             style={{
//               width: `${((index + (answered ? 1 : 0)) / quiz.questions.length) * 100}%`,
//             }}
//           />
//         </div>
//       </div>

//       <div className="module-quiz__card">
//         <p className="module-quiz__prompt">
//           <Sparkles size={18} className="module-quiz__prompt-icon" />
//           {question.prompt}
//         </p>

//         <div className="module-quiz__options">
//           {question.options.map((opt) => {
//             const isSelected = selectedId === opt.id;
//             const isRight = opt.id === question.correctOptionId;
//             let stateClass = '';
//             if (answered) {
//               if (isRight) stateClass = 'is-correct';
//               else if (isSelected) stateClass = 'is-wrong';
//             }
//             return (
//               <button
//                 key={opt.id}
//                 type="button"
//                 className={`module-quiz__option ${stateClass}`}
//                 onClick={() => handleSelect(opt.id)}
//                 disabled={answered}
//               >
//                 <span>{opt.text}</span>
//                 {answered && isRight && <CheckCircle2 size={20} />}
//                 {answered && isSelected && !isRight && <XCircle size={20} />}
//               </button>
//             );
//           })}
//         </div>

//         {answered && (
//           <div className={`module-quiz__feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
//             <p className="module-quiz__feedback-title">
//               {isCorrect ? 'Correct!' : 'Not quite!'}
//             </p>
//             <p className="module-quiz__feedback-text">{question.explanation}</p>
//             {isCorrect && (
//               <span className="module-quiz__xp-badge">
//                 <Zap size={14} /> +{question.xp} XP
//               </span>
//             )}
//           </div>
//         )}

//         <button
//           type="button"
//           className="module-quiz__next"
//           onClick={handleNext}
//           disabled={!answered}
//         >
//           {isLast ? 'See Results' : 'Next Question'}
//           <ChevronRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }

// Reusable gamified quiz engine. Takes a `quiz` object ({ title, questions })
// and plays through one question at a time, awarding XP per correct answer.
// When the last question is done it calls onFinish({ correctCount, totalXp,
// total }); the results screen itself is shown by ModuleDetail.jsx.
// Doesn't know which module it belongs to — Module 3 / Module 4 each pass
// their own question data (childLabourQuiz.js / internetSafetyQuiz.js).

import { useState } from 'react';
import { CheckCircle2, XCircle, Zap, ChevronRight, Sparkles } from 'lucide-react';
import './ModuleQuiz.css';

export default function ModuleQuiz({ quiz, onFinish }) {
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [results, setResults] = useState([]); // 'correct' | 'wrong' per question

  const question = quiz.questions[index];
  const total = quiz.questions.length;
  const isLast = index === total - 1;
  const isCorrect = answered && selectedId === question.correctOptionId;

  const handleSelect = (optionId) => {
    if (answered) return;
    const right = optionId === question.correctOptionId;
    setSelectedId(optionId);
    setAnswered(true);
    setResults((prev) => {
      const next = [...prev];
      next[index] = right ? 'correct' : 'wrong';
      return next;
    });
    if (right) {
      setCorrectCount((c) => c + 1);
      setXpEarned((xp) => xp + question.xp);
    }
  };

  const handleNext = () => {
    if (isLast) {
      onFinish?.({ correctCount, totalXp: xpEarned, total });
      return;
    }
    setIndex((i) => i + 1);
    setSelectedId(null);
    setAnswered(false);
  };

  return (
    <div className="module-quiz">
      {/* Top bar: step dots + XP counter */}
      <div className="module-quiz__top">
        <div className="module-quiz__steps">
          <span className="module-quiz__label">
            Question {index + 1} of {total}
          </span>
          <ol
            className="module-quiz__dots"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={index + (answered ? 1 : 0)}
          >
            {quiz.questions.map((q, i) => {
              let state = '';
              if (results[i]) state = `is-${results[i]}`;
              else if (i === index) state = 'is-current';
              return <li key={q.id} className={`module-quiz__dot ${state}`} />;
            })}
          </ol>
        </div>

        <span
          key={xpEarned}
          className={`module-quiz__xp ${xpEarned > 0 ? 'is-bump' : ''}`}
        >
          <Zap size={16} /> {xpEarned} XP
        </span>
      </div>

      {/* Question card */}
      <div className="module-quiz__card" key={question.id}>
        <p className="module-quiz__prompt">
          <Sparkles size={22} className="module-quiz__prompt-icon" />
          {question.prompt}
        </p>

        <div className="module-quiz__options">
          {question.options.map((opt, i) => {
            const isSelected = selectedId === opt.id;
            const isRight = opt.id === question.correctOptionId;
            let stateClass = '';
            if (answered) {
              if (isRight) stateClass = 'is-correct';
              else if (isSelected) stateClass = 'is-wrong';
            }
            return (
              <button
                key={opt.id}
                type="button"
                className={`module-quiz__option ${stateClass}`}
                onClick={() => handleSelect(opt.id)}
                disabled={answered}
              >
                <span className="module-quiz__letter" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="module-quiz__option-text">{opt.text}</span>
                {answered && isRight && <CheckCircle2 size={24} />}
                {answered && isSelected && !isRight && <XCircle size={24} />}
              </button>
            );
          })}
        </div>

        {/* Owl feedback bubble */}
        {answered && (
          <div
            className={`module-quiz__feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}
            role="status"
          >
            <span className="module-quiz__owl" aria-hidden="true">🦉</span>
            <div className="module-quiz__bubble">
              <p className="module-quiz__feedback-title">
                {isCorrect ? 'Correct! 🎉' : 'Not quite!'}
              </p>
              <p className="module-quiz__feedback-text">{question.explanation}</p>
              {isCorrect && (
                <span className="module-quiz__xp-badge">
                  <Zap size={14} /> +{question.xp} XP
                </span>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          className="module-quiz__next"
          onClick={handleNext}
          disabled={!answered}
        >
          {isLast ? 'See Results' : 'Next Question'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}