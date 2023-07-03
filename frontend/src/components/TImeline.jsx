import { onMount } from "solid-js";
import "../styles/timeline.css";

export default function Timeline() {
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        scrub: 1,
        markers: true,
      },
    });
    tl.to(".timeline", {
      y: 200,
      // rotation: 360,
      easy: "none",
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
            <h2 class="data-text">Hello</h2>
          </div>
          <div class="data-center">
            <div class="circle timeline"></div>
          </div>
          <div class="data-right">
            <h2 class="data-text">World</h2>
          </div>
        </div>
        {/* <div class="h-2 w-2 bg-red-400">X</div> */}
      </div>
    </>
  );
}
