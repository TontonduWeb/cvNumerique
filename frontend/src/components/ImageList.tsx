import { useProject } from "../providers/projectContext";

export default function ImageList() {
  const [fromContext] = useProject();
  const { project, coordinates, valid } = fromContext;

  return (
    <div>
      {valid.isValid && (
        <img
          class="fadein h-56 w-auto"
          style={{
            left: 0,
            top: 0,
            position: "absolute",
            transition: "transform 1s ease",
            transform: `translate(${coordinates.x + 250}px, ${
              coordinates.y - 125
            }px)`,
          }}
          src={project.img}
          alt={project.title}
        />
      )}
    </div>
  );
}
