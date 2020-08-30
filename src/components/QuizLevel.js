import React, { useState } from "react";
import QuizMaster from "../components/QuizMaster";
import "../stylesheets/QuizLevel.css";
import btnEasy from "../images/easy.png";
import btnMedium from "../images/medium.png";
import btnHard from "../images/hard.png";

function QuizLevel() {
  const [level, setLevel] = useState("");

  return (
    <div className="quizlevel">
      {level ? (
        <QuizMaster level={level} />
      ) : (
        <div className="quizlevel__imglevels">
          <img
            className="quizlevel__imgbtn"
            src={btnEasy}
            alt="Easy"
            onClick={() => setLevel("easy")}
          />
          <img
            className="quizlevel__imgbtn"
            src={btnMedium}
            alt="Medium"
            onClick={() => setLevel("medium")}
          />
          <img
            className="quizlevel__imgbtn"
            src={btnHard}
            alt="Hard"
            onClick={() => setLevel("hard")}
          />
        </div>
      )}
    </div>
  );
}

export default QuizLevel;
