import { useRef } from "react";
import { Vector } from "../helpers/shapes";

interface ScoreProps {
  index: 0 | 1;
  score: number[];
  maxScore: number;
}

export default function Score(props: ScoreProps) {
  const currentPosition = useRef(
    new Vector(props.index === 0 ? 30 : 850 - 75, 15)
  );

  return (
    <>
      <p
        style={{
          position: "absolute",
          top: currentPosition.current.y,
          left: currentPosition.current.x,
          color: "red",
          fontSize: 35
        }}
      >{`${props.score[props.index]}/${props.maxScore}`}</p>
    </>
  );
}
