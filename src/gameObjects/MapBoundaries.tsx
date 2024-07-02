import { Rectangle } from "../helpers/shapes";

interface MapBoundariesProps {
    boundaries: Rectangle[]
}

export default function MapBoundaries(props: MapBoundariesProps) {
  return (
    <>
      {props.boundaries.map((rect) => {
        return (
          <div
            key={"" + Math.random() + Math.random()}
            style={{
              position: "absolute",
              top: rect.y,
              left: rect.x,
              width: rect.width,
              height: rect.height,
              backgroundColor: "red",
            }}
          ></div>
        );
      })}
    </>
  );
}
