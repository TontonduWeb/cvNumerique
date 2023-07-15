import ImageList from "../components/ImageList";
import ProjectList from "../components/ProjectList";
import { ProjectProvider } from "../providers/projectContext";
import "../styles/project.css";

export default function ProjectLayout() {
  return (
    <>
      <ProjectProvider>
        <div class="container">
          <div class="container-list">
            <ProjectList />
          </div>
          <div class="container-img">
            <ImageList />
          </div>
        </div>
      </ProjectProvider>
    </>
  );
}
