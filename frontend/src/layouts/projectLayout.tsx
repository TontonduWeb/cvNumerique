import ImageList from '../components/ImageList';
import ProjectList from '../components/ProjectList';
import { ProjectProvider } from '../providers/projectContext';
import '../styles/project.css';

export default function ProjectLayout() {
  return (
    <>
      <ProjectProvider>
        <div class="main-container">
          <div class="container-list">
            <ProjectList />
          </div>
          <div class="relative text-center flex flex-col">
            <h1 class="cursus-img sticky top-2 text-primary_color">Projets</h1>
            <ImageList />
          </div>
        </div>
      </ProjectProvider>
    </>
  );
}
