import { useEffect, useState } from "react";
import { delay } from "../helpers/helpers";
import Grenade from "../gameObjects/Grenade";
import MapBoundaries from "../gameObjects/MapBoundaries";
import { RectangleBoundary } from "../helpers/shapes";
import Player from "../gameObjects/Player";

export default function GameLoop() {
  const fps = 60;
  let lastFrameTime = new Date().getTime();
  let deltaTime = 0;
  const oneFrameWindow = 1000 / fps;
  const [returnValue, setReturnValue] = useState<JSX.Element>(<></>);
  const boundaries: RectangleBoundary[] = [
    new RectangleBoundary(5, 495, 845, 5, "bottom"),
    new RectangleBoundary(0, 5, 5, 490, "left"),
    new RectangleBoundary(5, 0, 845, 5, "top"),
    new RectangleBoundary(850, 5, 5, 490, "right"),

    new RectangleBoundary(400, 240, 5, 255, "right"),
    new RectangleBoundary(450, 240, 5, 255, "left"),
    new RectangleBoundary(405, 240, 45, 5, "top")
  ];

  async function loop() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await delay(lastFrameTime + oneFrameWindow - new Date().getTime());
      deltaTime = new Date().getTime() - lastFrameTime;
      setReturnValue(
        <>
          <Grenade
            boundaries={boundaries}
            deltaTime={deltaTime}
          />
          <MapBoundaries boundaries={boundaries} />
          <Player index={0} deltaTime={deltaTime}/>
          <Player index={1} deltaTime={deltaTime}/>
        </>
      );
      lastFrameTime = new Date().getTime();
    }
  }

  useEffect(() => {
    loop();
  }, []);

  return returnValue;
}
