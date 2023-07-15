import { useProject } from "../providers/projectContext";

export default function ImageList() {
  const [fromContext] = useProject();
  const { project, coordinates, valid } = fromContext;

  return (
    <div>
      {valid.isValid ? (
        <img
          class="h-56 w-auto"
          style={{
            transform: `translate(${coordinates.x * 0.1}px, ${
              coordinates.y * 0.1
            }px)`,
          }}
          src={project.img}
          alt={project.title}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}
