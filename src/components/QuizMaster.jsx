import React, { useState, useEffect, useContext } from "react";
import CountryCapitalQuiz from "../components/CountryCapitalQuiz";
import { AnswerContext } from "../contexts/answerContext";
import getCountryListForQuiz from "../components/getCountryListForQuiz";
import previous from "../images/previous.png";
import next from "../images/next.png";
import submit from "../images/submit.png";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import TimerIcon from "@mui/icons-material/Timer";
import Chip from "@mui/material/Chip";
import "../stylesheets/QuizMaster.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "../helpers/MuiStyles";

import Confetti from "react-confetti";
import CountryFacts from "../data/CountryFacts.json";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function QuizMaster({ level }) {
  const [id, setId] = useState(0);
  const [quizCountries] = useState(getCountryListForQuiz(level));
  const { answer } = useContext(AnswerContext);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState([]);
  const classes = useStyles();

  // Timer state - 5 minutes (300 seconds) for the quiz
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(true);

  const handleClose = () => {
    setSummary([]);
    setOpen(false);
  };

  //Clear the previous answers when the quiz page is loaded
  useEffect(() => {
    answer.clear();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timeLeft === 0) {
        // Auto-submit when time runs out
        handlesubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlesubmit = () => {
    // Stop the timer
    setTimerActive(false);

    // Calculate the score BEFORE updating state (synchronously)
    let correctAnswers = 0;
    quizCountries.forEach((c) => {
      const userChoice = answer.get(c.name);
      if (userChoice === c.capital) {
        correctAnswers++;
      }
    });

    // Build summary for display
    quizCountries.map((c) => {
      setSummary((e) => [
        ...e,
        {
          id: c.id,
          name: c.name,
          capital: c.capital,
          flag: c.flag,
          choice: answer.get(c.name),
        },
      ]);
    });

    // Play sound effect for perfect score
    if (correctAnswers === quizCountries.length) {
      console.log("Perfect score detected! Playing sound...");
      // Try to play a sound file if it exists, otherwise use speech synthesis
      const audio = new Audio('/whoohoo.mp3');
      audio.play().catch(e => {
        // Fallback to speech synthesis if audio file fails or is blocked
        console.log("Audio play failed, using speech synthesis:", e);
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance("Whoo hoo! Perfect score! You are amazing!");
          utterance.rate = 1.2;
          utterance.pitch = 1.2;
          window.speechSynthesis.speak(utterance);
        }
      });
    }

    setOpen(true);
    // console.log("Quizmaster --> Result Summary:", summary);
  };

  return (
    <div className="quizmaster">
      {open && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} />}
      <div className="quizmaster__quesno">
        <Chip
          icon={<ContactSupportIcon />}
          label={`Question: ${id + 1} of ${quizCountries.length}`}
          color="primary"
        />
      </div>
      <div className="quizmaster__timer">
        <Chip
          icon={<TimerIcon />}
          label={formatTime(timeLeft)}
          color={timeLeft < 60 ? "error" : "primary"}
        />
      </div>
      <div className="quizmaster__quiz">
        <CountryCapitalQuiz question={quizCountries[id]} />
        <div className="quizmaster__prevnext">
          <img
            className={id === 0 ? "quizmaster__btndisabled" : "quizmaster__btn"}
            src={previous}
            alt="Previous"
            onClick={id === 0 ? null : () => setId(id - 1)}
          />
          <img
            className={
              id === quizCountries.length - 1
                ? "quizmaster__btndisabled"
                : "quizmaster__btn"
            }
            src={next}
            alt="Next"
            onClick={
              id === quizCountries.length - 1 ? null : () => setId(id + 1)
            }
          />
        </div>
        <img
          className={
            id === quizCountries.length - 1
              ? "quizmaster__btn quizmaster__btnsubmit"
              : "quizmaster__btndisabled"
          }
          src={submit}
          alt="Submit"
          onClick={id === quizCountries.length - 1 ? handlesubmit : undefined}
        />

        {answer.get(quizCountries[id].name) && (
          (() => {
            const countryFact = CountryFacts.find(f => f.country === quizCountries[id].name);
            const fact = countryFact ? countryFact.fact : "";
            return fact ? (
              <div style={{
                marginTop: "30px",
                padding: "10px",
                textAlign: "center",
                animation: "fadeIn 0.5s",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                  <LightbulbIcon style={{ color: "#fbc02d", marginRight: "8px" }} />
                  <strong style={{ color: "#1565c0", fontSize: "1.1rem" }}>Did You Know?</strong>
                </div>
                <span style={{ fontStyle: "italic", color: "#ffffff", fontSize: "1rem" }}>{fact}</span>
              </div>
            ) : null;
          })()
        )}
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle
          className="quizmaster__modaltitle"
          onClose={handleClose}
          disableTypography
        >
          <IconButton onClick={handleClose} className="quizmaster__modalclose">
            <CloseIcon />
          </IconButton>
          <Typography variant="h5">Summary</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Flag</StyledTableCell>
                  <StyledTableCell align="left">Country Name</StyledTableCell>
                  <StyledTableCell align="left">Capital</StyledTableCell>
                  <StyledTableCell align="left">Your Answer</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log("QuizMaster before")}
                {summary.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell>
                      <img
                        src={row.flag}
                        alt={row.name}
                        className="quizmaster__modalflag"
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.capital}</TableCell>
                    <TableCell
                      align="left"
                      className={
                        row.capital === row.choice
                          ? "quizmaster__modalgreen"
                          : "quizmaster__modalred"
                      }
                    >
                      {!row.choice ? "Skipped" : row.choice}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Chip
            className="quizmaster__chipscore"
            color="primary"
            icon={<FaceIcon />}
            label={`Score: 
            ${summary.filter((s) => s.choice === s.capital).length}  
            /
            ${summary.length}
          `}
          />
          <Chip
            className="quizmaster__chipscore"
            style={{ backgroundColor: "#ff9800", color: "white" }}
            icon={<span role="img" aria-label="fire" style={{ fontSize: "1.2rem" }}>🔥</span>}
            label={`Best Streak: ${(() => {
              let maxStreak = 0;
              let currentStreak = 0;
              summary.forEach(s => {
                if (s.choice === s.capital) {
                  currentStreak++;
                  maxStreak = Math.max(maxStreak, currentStreak);
                } else {
                  currentStreak = 0;
                }
              });
              return maxStreak;
            })()
              }`}
          />
          {/* <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuizMaster;
