import { useEffect, useState } from "react";
import { delay } from "../helpers/helpers";
import Grenade from "../gameObjects/Grenade";
import MapBoundaries from "../gameObjects/MapBoundaries";
import { RectangleBoundary } from "../helpers/shapes";

export default function GameLoop() {
  const fps = 60;
  let lastFrameTime = new Date().getTime();
  let deltaTime = 0;
  const oneFrameWindow = 1000 / fps;
  const currentFrame = 0;
  const [returnValue, setReturnValue] = useState<JSX.Element>(<></>);
  const boundaries: RectangleBoundary[] = [
    new RectangleBoundary(5, 495, 495, 5, "bottom"),
    new RectangleBoundary(0, 5, 5, 490, "left"),
    new RectangleBoundary(5, 0, 495, 5, "top"),
    new RectangleBoundary(500, 5, 5, 490, "right")];

  async function loop() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await delay(lastFrameTime + oneFrameWindow - new Date().getTime());
      deltaTime = new Date().getTime() - lastFrameTime;
      setReturnValue(
        <>
          <Grenade boundaries={boundaries} frame={currentFrame} deltaTime={deltaTime} />
          <MapBoundaries boundaries={boundaries}/>
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
