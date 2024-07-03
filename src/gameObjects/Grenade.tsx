import { useRef } from "react";
import { Vector, Rectangle, RectangleBoundary } from "../helpers/shapes";
import { GameStates } from "../components/GameLoop";

interface GrenadeProps {
  deltaTime: number;
  boundaries: RectangleBoundary[];
  gameState: GameStates;
  player1ScoreIncrement: () => void;
  player2ScoreIncrement: () => void;
  changeGameState: (state: GameStates) => void;
}

const gravityPixelsPerSecond2 = 100;
const speedLosePerSecond = 0.1;
const repulsionInPixels = 1;

export default function Grenade(props: GrenadeProps) {
  const deltaTimeInSeconds = props.deltaTime / 1000;

  const currentSpeed = useRef(new Vector(Math.random() < 0.5 ? -100 : 100, 0));
  const currentPosition = useRef(new Rectangle(412.5, 100, 25, 25));

  if (props.gameState === GameStates.reset) {
    currentSpeed.current = new Vector(Math.random() < 0.5 ? -100 : 100, 0);
    currentPosition.current = new Rectangle(412.5, 100, 25, 25);
    props.changeGameState(GameStates.playing);
    return <div style={getStyle(currentPosition.current)}></div>;
  }

  if (props.gameState === GameStates.end) {
    currentSpeed.current = new Vector(Math.random() < 0.5 ? -100 : 100, 0);
    currentPosition.current = new Rectangle(412.5, 100, 25, 25);
    return <div style={getStyle(currentPosition.current)}></div>;
  }

  const nextSpeed = currentSpeed.current.getCopy();
  const nextPosition = currentPosition.current.getCopy();

  const speedLose = 1 - speedLosePerSecond;
  nextSpeed.change(
    nextSpeed.x,
    nextSpeed.y + gravityPixelsPerSecond2 * deltaTimeInSeconds
  );

  let isIntersection = false;
  for (const boundary of props.boundaries) {
    const intersectionSide = boundary.isIntersecting(nextPosition);
    if (intersectionSide) {
      let xSpeedSign = 1,
        xPosShift = 0;
      let ySpeedSign = 1,
        yPosShift = 0;
      switch (intersectionSide) {
        case "top": {
          ySpeedSign = -1;
          yPosShift = 1;
          break;
        }
        case "bottom": {
          ySpeedSign = -1;
          yPosShift = -1;
          break;
        }
        case "left": {
          xSpeedSign = -1;
          xPosShift = 1;
          break;
        }
        case "right": {
          xSpeedSign = -1;
          xPosShift = -1;
          break;
        }
        case "player1-field": {
          props.player1ScoreIncrement();
          break;
        }
        case "player2-field": {
          props.player2ScoreIncrement();
          break;
        }
      }
      nextSpeed.change(
        xSpeedSign * nextSpeed.x,
        ySpeedSign * nextSpeed.y * speedLose
      );
      nextPosition.change(
        nextPosition.x + nextSpeed.x * deltaTimeInSeconds,
        nextPosition.y + nextSpeed.y * deltaTimeInSeconds
      );
      nextPosition.change(
        nextPosition.x + xPosShift * repulsionInPixels,
        nextPosition.y + yPosShift * repulsionInPixels
      );
      isIntersection = true;
    }
  }
  if (!isIntersection) {
    nextPosition.change(
      nextPosition.x + nextSpeed.x * deltaTimeInSeconds,
      nextPosition.y + nextSpeed.y * deltaTimeInSeconds
    );
  }

  currentSpeed.current = nextSpeed;
  currentPosition.current = nextPosition;

  return <div style={getStyle(currentPosition.current)}></div>;
}

function getStyle(rect: Rectangle) {
  return {
    position: "absolute",
    width: rect.width,
    height: rect.height,
    backgroundColor: "red",
    left: rect.x,
    top: rect.y,
  } as React.CSSProperties;
}
