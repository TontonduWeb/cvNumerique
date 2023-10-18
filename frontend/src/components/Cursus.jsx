import { createSignal, onMount } from "solid-js";
import axios from "axios";
import { marked } from "marked";

import { gsap } from "gsap";

const [error, setError] = createSignal(null);
const [responseCursuses, setResponseCursuses] = createSignal([]);
const [cursusSorted, setCursusSorted] = createSignal([]);

export default function Cursuses() {
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Effet d'entrée
    gsap.from(".main-cursus", {
      scrollTrigger: {
        trigger: ".main-cursus",
        start: "top 80%",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
    });
    gsap.to(".cursus", {
      scrollTrigger: {
        trigger: ".main-cursus",
        start: "center center",
        scrub: true,
      },
      color: "#03ff40",
    });
  });

  const getData = async () => {
    await axios
      .get("http://localhost:1337/api/cursuses")
      .then(({ data }) => {
        setResponseCursuses(data.data);
        setCursusSorted(responseCursuses().sort((a, b) => b.id - a.id));
      })
      .catch((err) => {
        setError(err);
      });
  };

  getData();

  return (
    <div class="main-cursus border-solid border-2 border-slate-500 m-20 grid grid-cols-2 justify-center">
      <div class="relative text-center flex flex-col">
        <h1 class="cursus sticky top-2">Cursus</h1>
      </div>
      <div class="grid grid-rows-4">
        {cursusSorted().map((ligne) => {
          const { ecole, description, periode, titre } = ligne.attributes;
          const html = marked(description);
          return (
            <div class="p-4 border-l-2 border-b-2 border-slate-500 h-full flex flex-col justify-center">
              <div class="flex justify-between pb-4">
                <p class="text-sm">{periode}</p>
                <p>{ecole}</p>
              </div>
              <div class="flex flex-col text-center justify-center">
                <h2 class="pb-4">{titre}</h2>
                <div innerHTML={html}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
