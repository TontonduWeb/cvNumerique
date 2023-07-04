import { onMount } from "solid-js";
import "../styles/timeline.css";

export default function Timeline() {
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Progress Bar
    gsap.to(".progress-bar", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top-=100px center",
        scrub: true,
      },
      backgroundColor: "#03ff40",
    });
    // Circle
    gsap.to(".timeline", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top-=100px center",
        end: () =>
          "+=" + document.querySelector(".text-right-trigger").offsetHeight,
        scrub: true,
      },
      backgroundColor: "#03ff40",
    });
    gsap.to(".timeline", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: () =>
          "+=" + document.querySelector(".text-right-trigger").offsetHeight,
        scrub: true,
      },
      y: () =>
        "+=" + document.querySelector(".text-right-trigger").offsetHeight / 2,
    });
    // Data Text Left
    gsap.to(".text-left-trigger", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top-=100px center",
        scrub: true,
      },
      color: "#03ff40",
    });
    // Data Text Right
    gsap.to(".text-right-trigger", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top-=100px center",
        scrub: true,
      },
      color: "#f5f5f7",
    });

    // Then
    gsap.to(".timeline2", {
      scrollTrigger: {
        trigger: ".timeline2",
        start: "top center",
        end: () =>
          "+=" + document.querySelector(".text-right-trigger2").offsetHeight,
        scrub: true,
      },
      y: () =>
        "+=" + document.querySelector(".text-right-trigger2").offsetHeight / 2,
    });
    gsap.to(".timeline2", {
      scrollTrigger: {
        trigger: ".timeline2",
        start: "top-=100px center",
        end: () =>
          "+=" + document.querySelector(".text-right-trigger2").offsetHeight,
        scrub: true,
      },
      backgroundColor: "#03ff40",
    });
    gsap.to(".text-left-trigger2", {
      scrollTrigger: {
        trigger: ".timeline2",
        start: "top-=100px center",
        scrub: true,
      },
      color: "#03ff40",
    });
    gsap.to(".text-right-trigger2", {
      scrollTrigger: {
        trigger: ".timeline2",
        start: "top-=100px center",
        scrub: true,
      },
      color: "#f5f5f7",
    });
    gsap.to(".timeline3", {
      scrollTrigger: {
        trigger: ".timeline3",
        start: "top center",
        end: () =>
          "+=" + document.querySelector(".text-right-trigger3").offsetHeight,
        scrub: true,
      },
      y: () =>
        "+=" + document.querySelector(".text-right-trigger3").offsetHeight / 2,
      backgroundColor: "#03ff40",
    });
    gsap.to(".text-left-trigger3", {
      scrollTrigger: {
        trigger: ".timeline3",
        start: "top-=100px center",
        scrub: true,
      },
      color: "#03ff40",
    });
    gsap.to(".text-right-trigger3", {
      scrollTrigger: {
        trigger: ".timeline3",
        start: "top-=100px center",
        scrub: true,
      },
      color: "#f5f5f7",
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
            <h2 class="data-text-left text-left-trigger">Hello</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text-right text-right-trigger">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis maxime tempora iusto repellendus blanditiis dolorum
              esse! Ab necessitatibus magnam at blanditiis accusamus ea facere
              ipsam architecto reprehenderit tempora! Ad, sequi.
            </h2>
          </div>
        </div>
        <div class="layout-item">
          <div class="data-left">
            <h2 class="data-text-left text-left-trigger2">Hello</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline2"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text-right text-right-trigger2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
              reprehenderit fugiat praesentium veritatis eveniet iste voluptatem
              magni maiores. Culpa delectus iure quidem aliquam minus, dicta
              molestias repellat hic? Autem, illo?
            </h2>
          </div>
        </div>
        <div class="layout-item">
          <div class="data-left">
            <h2 class="data-text-left text-left-trigger3">Hello</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline3"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text-right text-right-trigger3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              laboriosam repellat eius soluta reprehenderit odio, placeat itaque
              natus. Nam minus vero odio possimus deleniti totam illum
              necessitatibus sapiente culpa fuga.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
