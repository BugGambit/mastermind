import { colors } from "./colors";
import { getIntInRange } from "./random";

export type Response = {
  reds: number;
  whites: number;
};

type ColorIndex = number;
export type Circle = ColorIndex | null;
export type Line = [Circle, Circle, Circle, Circle];

export function generateSecret() {
  const line: Line = [0, 0, 0, 0];
  for (let position = 0; position < 4; position++) {
    line[position] = getIntInRange(colors.length);
  }
  return line;
}

export function getResponse(secret: Line, guess: Line): Response {
  const reds = guess.filter((color, idx) => color === secret[idx]).length;

  const remainingSecret = secret.filter((color, idx) => color !== guess[idx]);
  const remainingGuess = guess.filter((color, idx) => color !== secret[idx]);

  let whites = 0;
  for (let color = 0; color < colors.length; color++) {
    const numberOfColorsInSecret = remainingSecret.filter(
      (c) => c === color
    ).length;
    const numberOfColorsInGuess = remainingGuess.filter(
      (c) => c === color
    ).length;
    whites += Math.min(numberOfColorsInSecret, numberOfColorsInGuess);
  }

  return { reds, whites };
}
