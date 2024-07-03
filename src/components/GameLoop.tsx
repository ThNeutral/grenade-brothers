import { useEffect, useRef, useState } from "react";
import { delay } from "../helpers/helpers";
import Grenade from "../gameObjects/Grenade";
import MapBoundaries from "../gameObjects/MapBoundaries";
import { RectangleBoundary } from "../helpers/shapes";
import Player from "../gameObjects/Player";
import Score from "../gameObjects/Score";
import Win from "../gameObjects/Win";

export enum GameStates {
  reset,
  playing,
  end,
}

export default function GameLoop() {
  const fps = 60;
  let lastFrameTime = new Date().getTime();
  let deltaTime = 0;
  const oneFrameWindow = 1000 / fps;
  const [returnValue, setReturnValue] = useState<JSX.Element>(<></>);
  const gameState = useRef<GameStates>(GameStates.playing);
  let score = [0, 0];
  const maxScore = 1;
  let restartCounter = 0;
  const timeToRestart = 3 * 1000;
  const boundaries: RectangleBoundary[] = [
    new RectangleBoundary(0, 5, 5, 490, "left"),
    new RectangleBoundary(5, 0, 845, 5, "top"),
    new RectangleBoundary(850, 5, 5, 490, "right"),

    new RectangleBoundary(400, 240, 5, 255, "right"),
    new RectangleBoundary(450, 240, 5, 255, "left"),
    new RectangleBoundary(405, 240, 45, 5, "bottom"),

    new RectangleBoundary(5, 495, 395, 5, "player1-field"),
    new RectangleBoundary(455, 495, 395, 5, "player2-field"),
  ];

  function reset() {
    gameState.current = GameStates.playing;
    lastFrameTime = new Date().getTime();
    score = [0, 0];
    restartCounter = 0;
  }

  function player1ScoreIncrement() {
    score[0] += 1;
    changeGameState(score[0] === maxScore ? GameStates.end : GameStates.reset);
  }

  function player2ScoreIncrement() {
    score[1] += 1;
    changeGameState(score[1] === maxScore ? GameStates.end : GameStates.reset);
  }

  function changeGameState(state: GameStates) {
    gameState.current = state;
  }

  function getObjects() {
    return (
      <>
        <Grenade
          boundaries={boundaries}
          deltaTime={deltaTime}
          gameState={gameState.current}
          player1ScoreIncrement={player1ScoreIncrement}
          player2ScoreIncrement={player2ScoreIncrement}
          changeGameState={changeGameState}
        />
        <MapBoundaries boundaries={boundaries} />
        <Player index={0} deltaTime={deltaTime} />
        <Player index={1} deltaTime={deltaTime} />
        <Score index={0} maxScore={maxScore} score={score} />
        <Score index={1} maxScore={maxScore} score={score} />
        <Win
          gameState={gameState.current}
          score={score}
          restartCounter={restartCounter}
          timeToRestart={timeToRestart}
        />
      </>
    );
  }

  async function loop() {
    setReturnValue(getObjects());
    // eslint-disable-next-line no-constant-condition
    while (true) {
      switch (gameState.current) {
        case GameStates.playing: {
          await delay(lastFrameTime + oneFrameWindow - new Date().getTime());
          deltaTime = new Date().getTime() - lastFrameTime;
          setReturnValue(getObjects());
          lastFrameTime = new Date().getTime();
          break;
        }
        case GameStates.end: {
          restartCounter += oneFrameWindow;
          await delay(oneFrameWindow);
          if (restartCounter > timeToRestart) {
            reset();
            continue;
          }
          setReturnValue(getObjects());
          break;
        }
        default: {
          await delay(oneFrameWindow);
          break;
        }
      }
    }
  }

  useEffect(() => {
    loop();
  }, []);

  return returnValue;
}
