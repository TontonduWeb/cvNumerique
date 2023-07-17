import { For, batch, createSignal } from "solid-js";
import { createLocalStore } from "../providers/localStore";

type Partie = { playerChoice: string; computerChoice: string; result: string };
type ChiFuMiItem = { title: string; partieNumber: number };

export default function ChiFuMi() {
  const [computerChoice, setComputerChoice] = createSignal(0);
  const [chiFuMiComputerChoice, setChiFuMiComputerChoice] = createSignal("");
  const [chiFuMiPlayerChoice, setChiFuMiPlayerChoice] = createSignal("");
  const [result, setResult] = createSignal("");
  const [parties, setParties] = createLocalStore<Partie[]>("parties", []);

  const addPlayerChoiceAndPartie = (e: SubmitEvent) => {
    e.preventDefault();
    // Create a batch to update state only once
    batch(() => {
      // Set a new partie in the state
      setParties(parties.length, {
        playerChoice: chiFuMiPlayerChoice(),
        computerChoice: chiFuMiComputerChoice(),
        result: result(),
      });
    });
  };

  const resetParties = (e: SubmitEvent) => {
    e.preventDefault();
    // Create a batch to update state only once
    batch(() => {
      // Set a new player choice in the state
      setParties([]);
    });
  };

  function random(min: number, max: number) {
    setComputerChoice(Math.floor(Math.random() * (max - min + 1)) + min);

    if (computerChoice() === 1) {
      setChiFuMiComputerChoice("Pierre");
    } else if (computerChoice() === 2) {
      setChiFuMiComputerChoice("Feuille");
    } else if (computerChoice() === 3) {
      setChiFuMiComputerChoice("Ciseaux");
    }
    return chiFuMiComputerChoice;
  }

  function getResult() {
    if (chiFuMiPlayerChoice() === "Pierre") {
      if (chiFuMiComputerChoice() === "Pierre") {
        setResult("Egalité");
      } else if (chiFuMiComputerChoice() === "Feuille") {
        setResult("Perdu");
      } else if (chiFuMiComputerChoice() === "Ciseaux") {
        setResult("Gagné");
      }
    }
    if (chiFuMiPlayerChoice() === "Feuille") {
      if (chiFuMiComputerChoice() === "Pierre") {
        setResult("Gagné");
      } else if (chiFuMiComputerChoice() === "Feuille") {
        setResult("Egalité");
      } else if (chiFuMiComputerChoice() === "Ciseaux") {
        setResult("Perdu");
      }
    }
    if (chiFuMiPlayerChoice() === "Ciseaux") {
      if (chiFuMiComputerChoice() === "Pierre") {
        setResult("Perdu");
      } else if (chiFuMiComputerChoice() === "Feuille") {
        setResult("Gagné");
      } else if (chiFuMiComputerChoice() === "Ciseaux") {
        setResult("Egalité");
      }
    }
  }

  return (
    <>
      <h1>ChiFuMi</h1>
      <h2>Choisissez entre pierre, feuille et ciseaux</h2>
      <form onSubmit={addPlayerChoiceAndPartie}>
        <button
          onClick={() => {
            random(1, 3);
            getResult();
          }}
          class="w-20 h-auto border-2 m-5">
          <input
            class="cursor-pointer"
            type="button"
            value="Pierre"
            onClick={(e) => {
              setChiFuMiPlayerChoice(e.currentTarget.value);
            }}
          />
        </button>
        <button
          onClick={() => {
            random(1, 3);
            getResult();
          }}
          class="w-20 h-auto border-2 m-5">
          <input
            class="cursor-pointer"
            type="button"
            value="Feuille"
            onClick={(e) => {
              setChiFuMiPlayerChoice(e.currentTarget.value);
            }}
          />
        </button>
        <button
          onClick={() => {
            random(1, 3);
            getResult();
          }}
          class="w-20 h-auto border-2 m-5">
          <input
            class="cursor-pointer"
            type="button"
            value="Ciseaux"
            onClick={(e) => {
              setChiFuMiPlayerChoice(e.currentTarget.value);
            }}
          />
        </button>
      </form>
      <div>
        <h3>Ton choix : </h3>
        {/* <For each={playerChoices}>
          {(playerChoice, i) => (
            <div>
              <p>{playerChoice.title}</p>
            </div>
          )}
        </For> */}
        <p>{chiFuMiPlayerChoice()}</p>
      </div>

      <div>
        <button>
          <h3>Le choix de l'ordinateur : </h3>
        </button>
        <p>{chiFuMiComputerChoice()}</p>
      </div>

      <div>
        <h3>Résultat : </h3>
        <p>{result()}</p>
      </div>
      <div>
        <h3>Parties : </h3>
        <For each={parties}>
          {(partie, i) => (
            <div>
              <p>Partie n°{i() + 1}</p>
              <p>
                {partie.playerChoice} VS {partie.computerChoice} :{" "}
                {partie.result}
              </p>
            </div>
          )}
        </For>
      </div>
      <form onSubmit={resetParties}>
        <button>Reset</button>
      </form>
    </>
  );
}
