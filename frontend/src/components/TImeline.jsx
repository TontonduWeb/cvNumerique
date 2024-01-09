import { onMount } from 'solid-js';
import '../styles/timeline.css';

export default function Timeline() {
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Progress Bar
    gsap.to('.progress-bar', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top-=100px center',
        scrub: true,
      },
      backgroundColor: '#03ff40',
    });
    // Circle
    gsap.to('.timeline', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top-=100px center',
        end: () =>
          '+=' + document.querySelector('.text-right-trigger').offsetHeight,
        scrub: true,
      },
      backgroundColor: '#03ff40',
    });
    gsap.to('.timeline', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top center',
        end: () =>
          '+=' + document.querySelector('.text-right-trigger').offsetHeight,
        scrub: true,
      },
      y: () =>
        '+=' + document.querySelector('.text-right-trigger').offsetHeight / 2,
    });
    // Data Text Left
    gsap.to('.text-left-trigger', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#03ff40',
    });
    // Data Text Right
    gsap.to('.text-right-trigger', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#f5f5f7',
    });

    // Then
    gsap.to('.timeline2', {
      scrollTrigger: {
        trigger: '.timeline2',
        start: 'top center',
        end: () =>
          '+=' + document.querySelector('.text-right-trigger2').offsetHeight,
        scrub: true,
      },
      y: () =>
        '+=' + document.querySelector('.text-right-trigger2').offsetHeight / 2,
    });
    gsap.to('.timeline2', {
      scrollTrigger: {
        trigger: '.timeline2',
        start: 'top-=100px center',
        end: () =>
          '+=' + document.querySelector('.text-right-trigger2').offsetHeight,
        scrub: true,
      },
      backgroundColor: '#03ff40',
    });
    gsap.to('.text-left-trigger2', {
      scrollTrigger: {
        trigger: '.timeline2',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#03ff40',
    });
    gsap.to('.text-right-trigger2', {
      scrollTrigger: {
        trigger: '.timeline2',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#f5f5f7',
    });
    gsap.to('.timeline3', {
      scrollTrigger: {
        trigger: '.timeline3',
        start: 'top center',
        end: () =>
          '+=' + document.querySelector('.text-right-trigger3').offsetHeight,
        scrub: true,
      },
      y: () =>
        '+=' + document.querySelector('.text-right-trigger3').offsetHeight / 2,
      backgroundColor: '#03ff40',
    });
    gsap.to('.text-left-trigger3', {
      scrollTrigger: {
        trigger: '.timeline3',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#03ff40',
    });
    gsap.to('.text-right-trigger3', {
      scrollTrigger: {
        trigger: '.timeline3',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#f5f5f7',
    });
    gsap.to('.timeline4', {
      scrollTrigger: {
        trigger: '.timeline4',
        start: 'top center',
        end: () =>
          '+=' + document.querySelector('.text-right-trigger4').offsetHeight,
        scrub: true,
      },
      y: () =>
        '+=' + document.querySelector('.text-right-trigger4').offsetHeight / 2,
      backgroundColor: '#03ff40',
    });
    gsap.to('.text-left-trigger4', {
      scrollTrigger: {
        trigger: '.timeline4',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#03ff40',
    });
    gsap.to('.text-right-trigger4', {
      scrollTrigger: {
        trigger: '.timeline4',
        start: 'top-=100px center',
        scrub: true,
      },
      color: '#f5f5f7',
    });
  });
  return (
    <>
      <div class="layout">
        <div class="progress">
          <div class="progress-bar"></div>
          <div class="overlay-top"></div>
          <div class="overlay-bottom"></div>
        </div>
        <div class="layout-item">
          <div class="data-left">
            <h2 class="data-text-left text-left-trigger">Dévoué</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text-right text-right-trigger">
              La tache peut être pénible, mais je suis prêt à faire ce qu'il
              faut pour mener à bien le projet.
            </h2>
          </div>
        </div>
        <div class="layout-item">
          <div class="data-left">
            <h2 class="data-text-left text-left-trigger2">Curieux</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline2"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text-right text-right-trigger2">
              Toujours à recherche de nouvelles informations, de nouvelles
              notions à aborder. Apprendre est dans ma nature et me renseigner
              sur un sujet est un plaisir.
            </h2>
          </div>
        </div>
        <div class="layout-item">
          <div class="data-left">
            <h2 class="data-text-left text-left-trigger3">Sociable</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline3"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text-right text-right-trigger3">
              Rencontrer de nouvelles personnes, échanger sur des sujets divers
              et variés me permet de m'enrichir jour après jour.
            </h2>
          </div>
        </div>
        <div class="layout-item">
          <div class="data-left">
            <h2 class="data-text-left text-left-trigger4">Pédagogue</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline4"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text-right text-right-trigger4">
              J'aime transmettre mes connaissances et aider les autres à
              progresser. J'aime recevoir des conseils et des critiques
              constructives pour m'améliorer.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
