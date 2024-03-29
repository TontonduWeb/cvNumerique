import { For, createSignal } from 'solid-js';
import { useProject } from '../providers/projectContext';
import '../styles/project.css';

export default function ProjectList() {
  const [project, { changeProject, changeCoordinates, changeIsValid }] =
    useProject();
  const [coordinates, setCoordinates] = createSignal({ x: 0, y: 0 });
  const [isDisplay, setIsDisplay] = createSignal({ isValid: false });

  function handleMouseMove(event: { clientX: number; clientY: number }) {
    setCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function switchIsValid() {
    setIsDisplay({
      isValid: !isDisplay().isValid,
    });
    changeIsValid(isDisplay());
  }

  const [projects, setProjects] = createSignal([
    {
      title: 'Site Mephisto',
      date: '2020',
      description:
        "Première expérience avec un produit digital, lors de la digitalisation de l'offre physique de la marque Mephisto de la boutique de Bordeaux. En tant que chargé de projet, j'ai pu participer à la création du site e-commerce, de la stratégie digitale et de la mise en place de la stratégie CRM.",
      img: '/images/site-mephisto.png',
      url: 'https://www.chaussuremephisto.fr/fr/',
      isValid: false,
    },
    {
      title: 'Site Wanna Gonna',
      date: '2021',
      description:
        "Lors de ma première expérience en tant qu'apprentis développeur, en suivant le cursus PHP Symfony, nous avons eu la chance de participer à la conception et la réalisation d'une plateforme de mise en relation entre des bénévoles et des associations pour un client final.",
      img: '/images/wanna-gonna.png',
      url: 'https://www.wannagonna.org/',
      isValid: false,
    },
    {
      title: 'Site Scub',
      date: '2022',
      description:
        "Lors de ma première année d'alternance, j'ai eu l'occasion de participer à la refonte du site vitrine du groupe Scub.",
      img: '/images/site-scub.png',
      url: 'https://www.scub.net',
      isValid: false,
    },
    {
      title: 'Application Seeds',
      date: '2023',
      description:
        "Et pour finir un projet mobile, Seeds. Lors de ma dernière année d'alternance, j'ai eu l'opportunité de concevoir et réaliser une application mobile avec le framework Flutter et l'ecosystème Firebase.",
      img: '/images/seeds.png',
      url: 'https://github.com/TontonduWeb/seeds-growing',
      isValid: false,
    },
  ]);

  return (
    <div class="project-container" onMouseMove={handleMouseMove}>
      <For each={projects()}>
        {(proj) => (
          <a
            onMouseMove={() => {
              changeCoordinates(coordinates());
            }}
            onMouseOver={() => changeProject(proj)}
            onMouseEnter={switchIsValid}
            onMouseLeave={switchIsValid}
            href={proj.url}
            target="_blank"
            class="list">
            <h2>{proj.title}</h2>
            <p>{proj.description}</p>
          </a>
        )}
      </For>
    </div>
  );
}
