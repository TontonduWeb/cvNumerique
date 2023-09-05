import { gsap } from "gsap";
import { onMount } from "solid-js";
import "../styles/tryTwice.css";

export default function TryTwice() {
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline({
      scrollTrigger: {
        trigger: ".scroller",
        pin: true,
        scrub: 1,
      },
    });
  });
  return (
    <div class="scroller">
      <section class="orange">
        <div class="text">This is some text inside of a div block.</div>
      </section>

      <section class="black">
        <div class="text-wrap">
          <div class="panel-text blue-text">Blue</div>
          <div class="panel-text red-text">Red</div>
          <div class="panel-text orange-text">Orange</div>
          <div class="panel-text purple-text">Purple</div>
        </div>

        <div class="p-wrap">
          <div class="panel blue"></div>
          <div class="panel red"></div>
          <div class="panel orange"></div>
          <div class="panel purple"></div>
        </div>
      </section>

      <section class="blue"></section>
    </div>
  );
}
