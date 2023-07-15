import { For, createSignal } from "solid-js";
import { Project, useProject } from "../providers/projectContext";
import "../styles/project.css";

export default function ProjectList() {
  const [project, { changeProject, changeCoordinates, changeIsValid }] =
    useProject();
  const [coordinates, setCoordinates] = createSignal({ x: 0, y: 0 });
  const [valid, setIsValid] = createSignal({ isValid: false });

  function handleMouseMove(event: { clientX: number; clientY: number }) {
    setCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function switchOn() {
    setIsValid({
      isValid: true,
    });
    changeIsValid(valid());
  }

  function switchOff() {
    setIsValid({
      isValid: false,
    });
    changeIsValid(valid());
  }

  const [projects, setProjects] = createSignal([
    {
      title: "Project 1",
      description: "Project 1 description",
      img: "/images/dog.jpg",
      url: "https://www.google.com",
    },
    {
      title: "Project 2",
      description: "Project 2 description",
      img: "https://cdn.pixabay.com/photo/2015/11/17/13/13/puppy-1047521_1280.jpg",
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

  return (
    <ul>
      <For each={projects()}>
        {(proj) => (
          <li
            onMouseMove={handleMouseMove}
            onMouseEnter={switchOn}
            onMouseLeave={switchOff}>
            <div
              onMouseMove={() => {
                changeCoordinates(coordinates());
              }}
              onMouseEnter={() => {
                changeProject(proj);
              }}>
              <h2>{proj.title}</h2>
              <p>{proj.description}</p>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
}
