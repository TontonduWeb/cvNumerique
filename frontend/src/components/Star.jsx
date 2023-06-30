import { onMount } from "solid-js";

export default function Star() {
  onMount(() => {
    gsap.to(".star", { rotation: 360, x: 100, duration: 1 });
  });
  return (
    <>
      <div class="star">
        <h1>star</h1>
      </div>
    </>
  );
}
