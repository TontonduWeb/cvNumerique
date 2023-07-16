import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

export type Project = {
  readonly title: string;
  readonly description: string;
  readonly img: string;
  readonly url: string;
  isValid?: boolean;
};

export type Coordinates = {
  readonly x: number;
  readonly y: number;
};

export type Validity = {
  readonly isValid: boolean;
};

export type ProjectContextState = {
  readonly project: Project;
  readonly coordinates: Coordinates;
  readonly valid: Validity;
};

export type ProjectContextValue = [
  state: ProjectContextState,
  actions: {
    changeProject: (project: Project) => void;
    changeCoordinates: (coordinates: Coordinates) => void;
    changeIsValid: (valid: Validity) => void;
  }
];

const defaultState = {
  project: {
    title: "Which project?",
    description: "Project 1 description",
    img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1675&q=80",
    url: "https://www.google.com",
    isValid: false,
  },
  coordinates: { x: 0, y: 0 },
  valid: { isValid: false },
};

const ProjectContext = createContext<ProjectContextValue>([
  defaultState,
  {
    changeProject: () => undefined,
    changeCoordinates: () => undefined,
    changeIsValid: () => undefined,
  },
]);

export const ProjectProvider: ParentComponent<{
  project?: Project;
  coordinates?: Coordinates;
  valid?: Validity;
}> = (props) => {
  const [state, setState] = createStore({
    project: props.project ?? defaultState.project,
    coordinates: { x: 0, y: 0 },
    valid: props.valid ?? defaultState.valid,
  });

  const changeProject = (project: Project) => setState("project", project);
  const changeCoordinates = (coordinates: Coordinates) =>
    setState("coordinates", coordinates);
  const changeIsValid = (valid: Validity) => setState("valid", valid);

  return (
    <ProjectContext.Provider
      value={[state, { changeProject, changeCoordinates, changeIsValid }]}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
