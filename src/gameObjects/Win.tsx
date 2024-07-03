import { useRef } from "react";
import { Vector } from "../helpers/shapes";
import { GameStates } from "../components/GameLoop";

interface WinProps {
  gameState: GameStates;
  score: number[];
  restartCounter: number;
  timeToRestart: number;
}

export default function Win(props: WinProps) {
  const currentPosition = useRef(new Vector(320, 100));

  return (
    <>
      {props.gameState === GameStates.end ? (
        <p
          style={{
            position: "absolute",
            top: currentPosition.current.y,
            left: currentPosition.current.x,
            color: "red",
            fontSize: 40,
          }}
        >
          {`Player ${props.score[0] > props.score[1] ? 1 : 2} win!`}<br />
          {`Restarting in ${
            ((props.timeToRestart - props.restartCounter) / 1000).toFixed(0)
          }`}
        </p>
      ) : (
        <></>
      )}
    </>
  );
}
