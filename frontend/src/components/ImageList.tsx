import { useProject } from "../providers/projectContext";

export default function ImageList() {
  const [fromContext] = useProject();
  const { project } = fromContext;
  return (
    <div>
      <h1>{project.title}</h1>
      <img src={project.img} alt={project.title} />
    </div>
  );
}
