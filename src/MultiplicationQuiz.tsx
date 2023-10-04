import { useState, useEffect, useRef } from "react";

function MultiplicationQuiz() {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [bgColor, setBgColor] = useState("bg-gray-100");

  const correctAnswer = num1 * num2;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (feedback === "Richtig! Du bist ein Genie!") {
      setBgColor("bg-green-500");
      setTimeout(() => {
        setBgColor("bg-gray-100");
      }, 2000);
    } else if (feedback.startsWith("Sorry")) {
      setBgColor("bg-red-500 blink");
      setTimeout(() => {
        setBgColor("bg-gray-100");
      }, 5000);
    }
  }, [feedback]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (parseInt(userAnswer, 10) === correctAnswer) {
      setFeedback("Richtig! Du bist ein Genie!");
    } else {
      setFeedback(`Sorry, die richtige Antwort ist: ${correctAnswer}.`);
    }
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setUserAnswer("");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
      <div className='min-h-screen flex pt-20 justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-md w-96'>
          <div className='bg-blue-500 text-white text-center py-4 mb-8'>
            <h1 className='text-3xl'>Das kleine 1 x 1</h1>
          </div>
          <p className='text-6xl mb-4'>
            {num1} x {num2} = ?
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type='number'
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className='p-2 border rounded w-full mb-4 text-2xl text-center'
            />
            <button
              type='submit'
              className='w-full bg-blue-500 text-white p-2 rounded'
            >
              Überprüfen
            </button>
          </form>
          {feedback && <p className='mt-4 text-center'>{feedback}</p>}
          <br />
          <p className='text-center'>
            &copy; 2023 by{" "}
            <a href='https://braeutigam-media.com' target='_blank'>
              Braeutigam Media
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MultiplicationQuiz;
