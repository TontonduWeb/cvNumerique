import { For, createSignal } from "solid-js";
import { Project, useProject } from "../providers/projectContext";

export default function ProjectList() {
  const [pos, setPos] = createSignal({ x: 0, y: 0 });
  const [projects, setProjects] = createSignal([
    {
      title: "Project 1",
      description: "Project 1 description",
      img: "/images/odg.jpg",
      url: "https://www.google.com",
    },
    {
      title: "Project 2",
      description: "Project 2 description",
      img: "https://cdn.pixabay.com/photo/2023/07/01/18/56/dog-8100754_1280.jpg",
      url: "https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_1280.jpg",
    },
    {
      title: "Project 3",
      description: "Project 3 description",
      img: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
      url: "https://www.google.com",
    },
    {
      title: "Project 4",
      description: "Project 4 description",
      img: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      url: "https://www.google.com",
    },
  ]);
  const [project, { changeProject }] = useProject();

  function handleMouseMove(event: { clientX: number; clientY: number }) {
    setPos({
      x: event.clientX,
      y: event.clientY,
    });
    console.log(pos().x, pos().y);
  }

  return (
    <>
      <div onMouseMove={handleMouseMove}>
        The mouse position is {pos().x} x {pos().y}
      </div>
      <div>
        <ul>
          <For each={projects()}>
            {(proj) => (
              <li
                onMouseMove={() => {
                  changeProject(proj), handleMouseMove;
                }}>
                <h2>{proj.title}</h2>
                <p>{proj.description}</p>
                <img class="h-10 w-10" src={proj.img} alt={proj.title} />
                <a href={proj.url}>View Project</a>
              </li>
            )}
          </For>
        </ul>
      </div>
    </>
  );
}
