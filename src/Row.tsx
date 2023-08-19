import "./App.css";
import LineComponent from "./Line";
import ResponseComponent from "./ResponseComponent";
import { Line, Response } from "./response";

type RowProps = {
  line: Line;
  response: Response;
  onClick?: (index: number) => void;
};

function Row(props: RowProps) {
  const { line, response, onClick = () => {} } = props;
  return (
    <div style={{ display: "flex" }}>
      <LineComponent line={line} onClick={onClick} />
      <span style={{ width: "20px" }} />
      <ResponseComponent response={response} />
    </div>
  );
}

export default Row;
