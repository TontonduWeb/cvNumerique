import ImageList from "../components/ImageList";
import ProjectList from "../components/ProjectList";
import { ProjectProvider } from "../providers/projectContext";
import "../styles/projectLayout.css";

export default function ProjectLayout() {
  return (
    <>
      <ProjectProvider>
        <div class="container">
          <div class="container-list">
            <ProjectList />
          </div>
          <ImageList />
        </div>
      </ProjectProvider>
    </>
  );
}
