import React, { useState, useEffect, useContext } from "react";
import CountryCapitalQuiz from "../components/CountryCapitalQuiz";
import { AnswerContext } from "../contexts/answerContext";
import getCountryListForQuiz from "../components/getCountryListForQuiz";
import previous from "../images/previous.png";
import next from "../images/next.png";
import submit from "../images/submit.png";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import TimerIcon from "@material-ui/icons/Timer";
import Chip from "@material-ui/core/Chip";
import "../stylesheets/QuizMaster.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  StyledTableCell,
  StyledTableRow,
  useStyles
} from "../helpers/MuiStyles";

function QuizMaster({ level }) {
  const [id, setId] = useState(0);
  const [quizCountries] = useState(getCountryListForQuiz(level));
  const { answer } = useContext(AnswerContext);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  //Clear the previous answers when the quiz page is loaded
  useEffect(() => {
    answer.clear();
  }, []);

  const handlesubmit = () => {
    quizCountries.map(c => {
      setSummary(e => [
        ...e,
        {
          id: c.id,
          name: c.name,
          capital: c.capital,
          flag: c.flag,
          choice: answer.get(c.name)
        }
      ]);
    });

    // Calculate the score and store it in the state.

    setOpen(true);
    // console.log("Quizmaster --> Result Summary:", summary);
  };

  return (
    <div className="quizmaster">
      <div className="quizmaster__quesno">
        <Chip
          icon={<ContactSupportIcon />}
          label={`Question: ${id + 1} of ${quizCountries.length}`}
          color="primary"
        />
      </div>
      <div className="quizmaster__timer">
        <Chip icon={<TimerIcon />} label="Timer" color="primary" />
      </div>
      <div className="quizmaster__quiz">
        <CountryCapitalQuiz question={quizCountries[id]} />
        <div className="quizmaster__prevnext">
          <img
            className="quizmaster__btn"
            src={previous}
            alt="Previous"
            onClick={id === 0 ? null : () => setId(id - 1)}
          />
          <img
            className="quizmaster__btn"
            src={next}
            alt="Next"
            onClick={
              id === quizCountries.length - 1 ? null : () => setId(id + 1)
            }
          />
        </div>
        <img
          className="quizmaster__btn quizmaster__btnsubmit"
          src={submit}
          alt="Submit"
          onClick={handlesubmit}
        />
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>Summary</DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Flag</StyledTableCell>
                  <StyledTableCell align="right">Country Name</StyledTableCell>
                  <StyledTableCell align="right">Capital</StyledTableCell>
                  <StyledTableCell align="right">Your Answer</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log("QuizMaster before")}
                {summary.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <img
                        src={row.flag}
                        alt={row.name}
                        className="quizmaster__modalflag"
                      />
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.capital}</TableCell>
                    <TableCell
                      align="right"
                      className={
                        row.capital === row.choice
                          ? "quizmaster__modalgreen"
                          : "quizmaster__modalred"
                      }
                    >
                      {!row.choice ? "Skipped" : row.choice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Chip
            color="primary"
            icon={<FaceIcon />}
            label={`Score: 
            ${summary.filter(s => s.choice === s.capital).length}  
            /
            ${summary.length}
          `}
          />
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuizMaster;
