import { useState } from "react";
import "./App.css";
import Row from "./Row";
import {
  Circle,
  Line,
  Response,
  generateSecret,
  getResponse,
} from "./response";
import { colors } from "./colors";

function getNextColor(currValue: Circle) {
  if (currValue == null) {
    return 0;
  }
  return (currValue + 1) % colors.length;
}

const secret = generateSecret();
const numberOfGuesses = 12;
const emtpyLine: Line = [null, null, null, null];
const defaultLine: Line = [0, 0, 0, 0];

function generateInitialLinesValue(): Line[] {
  const rows: Line[] = [defaultLine];
  rows.push(...new Array(numberOfGuesses - 1).fill(null).map(() => emtpyLine));
  return rows;
}

function generateInitialGuessResponses(): Response[] {
  const defaultGuessResponse: Response = { reds: 0, whites: 0 };
  return new Array(numberOfGuesses)
    .fill(null)
    .map(() => ({ ...defaultGuessResponse }));
}

function App() {
  const [currRow, setCurrRow] = useState(0);
  const [lines, setLines] = useState<Line[]>(generateInitialLinesValue());
  const [guessResponses, setGuessResponses] = useState<Response[]>(
    generateInitialGuessResponses()
  );

  const onGuess = () => {
    const response = getResponse(secret, lines[currRow]);
    const guessResponseCopy = [...guessResponses];
    guessResponseCopy[currRow] = response;
    setGuessResponses(guessResponseCopy);

    if (response.reds === 4) {
      alert("You won!!!");
    } else if (currRow === numberOfGuesses - 1) {
      alert("You lost looser!!!");
    }

    setCurrRow(currRow + 1);
    const linesCopy = [...lines];
    linesCopy[currRow + 1] = defaultLine;
    setLines(linesCopy);
  };

  const onClick = (index: number) => {
    const linesCopy = [...lines];
    const rowCopy: Line = [...linesCopy[currRow]];
    const currColor = rowCopy[index];
    const newColor = getNextColor(currColor);
    rowCopy[index] = newColor;
    linesCopy[currRow] = rowCopy;
    setLines(linesCopy as Line[]);
  };

  return (
    <>
      <button style={{ marginBottom: "20px" }} onClick={onGuess}>
        Guess!
      </button>
      {lines.map((line, idx) => {
        const response = guessResponses[idx];
        return (
          <>
            <Row
              line={line}
              response={response}
              onClick={idx === currRow ? onClick : () => {}}
            />
            <div style={{ height: "5px" }} />
          </>
        );
      })}
      <div style={{ height: "50px" }} />
    </>
  );
}

export default App;
