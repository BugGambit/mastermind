import { Response } from "./response";

type ResponseProps = {
  response: Response;
};

const SIZE = "15px";
const RED = "#FF0000";
const WHITE = "#FFFFFF";

function ResponseComponent(props: ResponseProps) {
  const colors: string[] = [];
  for (let i = 0; i < props.response.reds; i++) {
    colors.push(RED);
  }
  for (let i = 0; i < props.response.whites; i++) {
    colors.push(WHITE);
  }
  while (colors.length < 4) {
    colors.push("#000000");
  }

  const rows = [
    [colors[0], colors[1]],
    [colors[2], colors[3]],
  ];

  return (
    <div>
      {rows.map((rowColors) => (
        <div>
          {rowColors.map((color) => (
            <span
              style={{
                backgroundColor: color,
                display: "inline-block",
                borderRadius: "50%",
                width: SIZE,
                height: SIZE,
                margin: "3px",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResponseComponent;
