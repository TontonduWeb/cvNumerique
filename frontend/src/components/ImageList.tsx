import { onMount } from 'solid-js';
import { useProject } from '../providers/projectContext';
import { gsap } from 'gsap';

export default function ImageList() {
  const [fromContext] = useProject();
  const { project, coordinates, valid } = fromContext;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Effet d'entrée
    gsap.from('.main-cursus-img', {
      scrollTrigger: {
        trigger: '.main-cursus-img',
        start: 'top 80%',
      },
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
    });
    gsap.to('.cursus-img', {
      scrollTrigger: {
        trigger: '.main-cursus-img',
        start: 'top center',
        scrub: true,
      },
      color: '#fff',
    });
  });

  return (
    <div class="main-cursus-img">
      <div>
        {valid.isValid && (
          <>
            <p
              style={{
                left: 0,
                top: 0,
                position: 'relative',
                transition: 'transform 1s ease',
                transform: `translate(${coordinates.x - 400}px, ${
                  coordinates.y - 200
                }px)`,
              }}
              class="text-2xl text-primary_color">
              {project.date}
            </p>
            <img
              class="fadein h-56 w-auto"
              style={{
                left: 0,
                top: 0,
                position: 'relative',
                transition: 'transform 1s ease',
                transform: `translate(${coordinates.x - 400}px, ${
                  coordinates.y - 200
                }px)`,
              }}
              src={project.img}
              alt={project.title}
            />
          </>
        )}
      </div>
    </div>
  );
}
