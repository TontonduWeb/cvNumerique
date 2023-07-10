import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

export type Project = {
  readonly title: string;
  readonly description: string;
  readonly img: string;
  readonly url: string;
};

export type ProjectContextState = {
  readonly project: Project;
};

export type ProjectContextValue = [
  state: ProjectContextState,
  actions: {
    changeProject: (project: Project) => void;
  }
];

const defaultState = {
  project: {
    title: "Which project?",
    description: "Project 1 description",
    img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    url: "https://www.google.com",
  },
};

const ProjectContext = createContext<ProjectContextValue>([
  defaultState,
  {
    changeProject: () => undefined,
  },
]);

export const ProjectProvider: ParentComponent<{
  project?: Project;
}> = (props) => {
  const [state, setState] = createStore({
    project: props.project ?? defaultState.project,
  });

  const changeProject = (project: Project) => setState("project", project);

  return (
    <ProjectContext.Provider value={[state, { changeProject }]}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
