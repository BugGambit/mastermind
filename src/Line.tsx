import { colors } from "./colors";
import { Line } from "./response";

type LineProps = {
  line: Line;
  onClick?: (index: number) => void;
};

const SIZE = "35px";

function LineComponent(props: LineProps) {
  const { line, onClick = () => {} } = props;
  return (
    <div>
      {line.map((colorIndex, index) => (
        <span
          onClick={() => onClick(index)}
          style={{
            backgroundColor: colorIndex !== null ? colors[colorIndex] : "",
            border: "white 1px solid",
            display: "inline-block",
            borderRadius: "50%",
            width: SIZE,
            height: SIZE,
            margin: "3px",
          }}
        />
      ))}
    </div>
  );
}

export default LineComponent;
