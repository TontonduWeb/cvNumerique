import { For, batch, createSignal, onMount } from "solid-js";
import { createLocalStore, removeIndex } from "../providers/localStore";
import "../styles/chifumi.css";

type Partie = { playerChoice: string; computerChoice: string; result: string };
type Level = {
  rank: number;
  level: string;
  pourcent: number;
  winParties: number;
  maxParties: number;
};

export default function ChiFuMi() {
  const [computerChoice, setComputerChoice] = createSignal(0);
  const [chiFuMiComputerChoice, setChiFuMiComputerChoice] = createSignal("");
  const [chiFuMiPlayerChoice, setChiFuMiPlayerChoice] = createSignal("");
  const [result, setResult] = createSignal("");
  const [parties, setParties] = createLocalStore<Partie[]>("parties", []);
  const [pourcent, setPourcent] = createSignal(0);
  const [isActive, setIsActive] = createSignal(false);
  const [isWinTheGame, setWinTheGame] = createSignal(false);
  const [levelSignal, setLevelSignal] = createSignal<Level>({
    rank: 1,
    level: "Facile",
    pourcent: 40,
    winParties: 3,
    maxParties: 10,
  });

  const levels = [
    { rank: 1, level: "Facile", pourcent: 40, winParties: 3, maxParties: 10 },
    { rank: 2, level: "Moyen", pourcent: 50, winParties: 4, maxParties: 10 },
    {
      rank: 3,
      level: "Difficile",
      pourcent: 60,
      winParties: 5,
      maxParties: 8,
    },
    { rank: 4, level: "Expert", pourcent: 70, winParties: 4, maxParties: 8 },
    { rank: 5, level: "Maitre", pourcent: 80, winParties: 5, maxParties: 6 },
  ];

  onMount(() => {
    setParties([]);
    setLevelSignal(levels[0]);
  });
  const setPlayerChoiceAndPartie = (e: SubmitEvent) => {
    e.preventDefault();
    // Create a batch to update state only once
    batch(() => {
      // Set a new partie in the state
      setParties(parties.length, {
        playerChoice: chiFuMiPlayerChoice(),
        computerChoice: chiFuMiComputerChoice(),
        result: result(),
      });
      getPourcentPartiesWin(parties);
      getMaxParties(parties);
      winTheGame(parties);
    });
  };

  function valueToLevelNumber(value: string) {
    switch (value) {
      case "Facile":
        return 0;
      case "Moyen":
        return 1;
      case "Difficile":
        return 2;
      case "Expert":
        return 3;
      case "Maitre":
        return 4;
      default:
        return 0;
    }
  }

  function selectLevel(rank: number) {
    setLevelSignal(levels[rank]);
  }

  const resetParties = (e: SubmitEvent) => {
    e.preventDefault();
    // Create a batch to update state only once
    batch(() => {
      // Set a new player choice in the state
      setParties([]);
      setIsActive(false);
    });
  };

  function random(min: number, max: number) {
    setComputerChoice(Math.floor(Math.random() * (max - min + 1)) + min);

    if (computerChoice() === 1) {
      setChiFuMiComputerChoice("👊");
    } else if (computerChoice() === 2) {
      setChiFuMiComputerChoice("✋");
    } else if (computerChoice() === 3) {
      setChiFuMiComputerChoice("✌️");
    }
    return chiFuMiComputerChoice;
  }

  function getResult() {
    if (chiFuMiPlayerChoice() === "👊") {
      if (chiFuMiComputerChoice() === "👊") {
        setResult("Egalité");
      } else if (chiFuMiComputerChoice() === "✋") {
        setResult("Tu as perdu");
      } else if (chiFuMiComputerChoice() === "✌️") {
        setResult("Tu as gagné");
      }
    }
    if (chiFuMiPlayerChoice() === "✋") {
      if (chiFuMiComputerChoice() === "👊") {
        setResult("Tu as gagné");
      } else if (chiFuMiComputerChoice() === "✋") {
        setResult("Egalité");
      } else if (chiFuMiComputerChoice() === "✌️") {
        setResult("Tu as perdu");
      }
    }
    if (chiFuMiPlayerChoice() === "✌️") {
      if (chiFuMiComputerChoice() === "👊") {
        setResult("Tu as perdu");
      } else if (chiFuMiComputerChoice() === "✋") {
        setResult("Tu as gagné");
      } else if (chiFuMiComputerChoice() === "✌️") {
        setResult("Egalité");
      }
    }
  }

  function getPourcentPartiesWin(parties: Partie[]) {
    let win = 0;
    let lost = 0;
    let equal = 0;
    let pourcentWin = 0;
    let pourcentLost = 0;
    let pourcentEqual = 0;

    for (let i = 0; i < parties.length; i++) {
      if (parties[i].result === "Tu as gagné") {
        win++;
      } else if (parties[i].result === "Tu as perdu") {
        lost++;
      } else if (parties[i].result === "Egalité") {
        equal++;
      }
    }
    pourcentWin = (win / parties.length) * 100;
    pourcentLost = (lost / parties.length) * 100;
    pourcentEqual = (equal / parties.length) * 100;

    setPourcent(pourcentWin);
    return pourcent;
  }

  function getMaxParties(parties: Partie[]) {
    let max = levelSignal().maxParties;
    if (parties.length >= max) {
      setIsActive(true);
    }
  }

  function winTheGame(parties: Partie[]) {
    let gamesWon = 0;
    for (let i = 0; i < parties.length; i++) {
      if (parties[i].result === "Tu as gagné") {
        gamesWon++;
      }
    }
    if (
      gamesWon >= levelSignal().winParties &&
      pourcent() >= levelSignal().pourcent
    ) {
      setWinTheGame(true);
      setIsActive(true);
    }
  }

  return (
    <>
      <div class="global">
        {isActive() && isWinTheGame() ? (
          <h2 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            Tu as gagné le game
          </h2>
        ) : isActive() && !isWinTheGame() ? (
          <h2 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            Tu as perdu le game
          </h2>
        ) : (
          ""
        )}
        <div
          class="game-container"
          classList={{ winTheGameBack: isActive() === true }}>
          <div class="game">
            <h1>ChiFuMi</h1>
            {!isActive() ? (
              <>
                <div class="level">
                  <h3>Choisis ton niveau :</h3>
                  <form
                    onSubmit={(e) => {
                      resetParties(e);
                    }}>
                    <input
                      class="w-20 h-auto border-2 mx-5 my-2"
                      type="submit"
                      value="Facile"
                      checked
                      onClick={(e) => {
                        selectLevel(valueToLevelNumber(e.currentTarget.value));
                      }}
                    />
                    <input
                      class="w-20 h-auto border-2 mx-5 my-2"
                      type="submit"
                      value="Moyen"
                      onClick={(e) => {
                        selectLevel(valueToLevelNumber(e.currentTarget.value));
                      }}
                    />
                    <input
                      class="w-20 h-auto border-2 mx-5 my-2"
                      type="submit"
                      value="Difficile"
                      onClick={(e) => {
                        selectLevel(valueToLevelNumber(e.currentTarget.value));
                      }}
                    />
                    <input
                      class="w-20 h-auto border-2 mx-5 my-2"
                      type="submit"
                      value="Expert"
                      onClick={(e) => {
                        selectLevel(valueToLevelNumber(e.currentTarget.value));
                      }}
                    />
                    <input
                      class="w-20 h-auto border-2 mx-5 my-2"
                      type="submit"
                      value="Maitre"
                      onClick={(e) => {
                        selectLevel(valueToLevelNumber(e.currentTarget.value));
                      }}
                    />
                  </form>
                </div>
                <p>Level rank : {levelSignal().rank}</p>
                <h4>Choisis entre pierre, feuille ou ciseaux :</h4>
                <form onSubmit={setPlayerChoiceAndPartie}>
                  <button
                    onClick={() => {
                      random(1, 3);
                      setChiFuMiPlayerChoice("👊");
                      getResult();
                    }}
                    class="w-20 h-auto border-2 m-5">
                    <input
                      class="cursor-pointer"
                      type="button"
                      name="pierre"
                      value="👊"
                      onClick={(e) => {
                        setChiFuMiPlayerChoice(e.currentTarget.value);
                      }}
                    />
                  </button>
                  <button
                    onClick={() => {
                      random(1, 3);
                      setChiFuMiPlayerChoice("✋");
                      getResult();
                    }}
                    class="w-20 h-auto border-2 m-5">
                    <input
                      class="cursor-pointer"
                      type="button"
                      value="✋"
                      onClick={(e) => {
                        setChiFuMiPlayerChoice(e.currentTarget.value);
                      }}
                    />
                  </button>
                  <button
                    onClick={() => {
                      random(1, 3);
                      setChiFuMiPlayerChoice("✌️");
                      getResult();
                    }}
                    class="w-20 h-auto border-2 m-5">
                    <input
                      class="cursor-pointer"
                      type="button"
                      value="✌️"
                      onClick={(e) => {
                        setChiFuMiPlayerChoice(e.currentTarget.value);
                      }}
                    />
                  </button>
                </form>
              </>
            ) : (
              <div>
                <h3>Parties maximum atteintes ...</h3>
                <p>
                  Atteins les {levelSignal().pourcent}% de parties gagnées, avec
                  minimum {levelSignal().winParties} parties gagnées en{" "}
                  {levelSignal().maxParties} parties maximum
                </p>
              </div>
            )}
          </div>
          <div class="live-result">
            {chiFuMiPlayerChoice() !== "" && (
              <div class="result-partie">
                <div class="playerAndComputChoices">
                  <div>
                    <span class="text-6xl">{chiFuMiPlayerChoice()}</span>
                  </div>
                  <span class="text-4xl">🆚</span>
                  <div>
                    <div>
                      <span class="text-6xl">{chiFuMiComputerChoice()}</span>
                    </div>
                    <p></p>
                  </div>
                </div>

                <div class="flex justify-center">
                  <h3>
                    <span
                      classList={{
                        win: result() === "Tu as gagné",
                        lost: result() === "Tu as perdu",
                        equal: result() === "Egalité",
                      }}>
                      {result()}
                    </span>
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>

        <div class="parties-container">
          {parties.length > 0 && (
            <>
              <h2>Les parties :</h2>
              <div class="grow">
                <div class="parties">
                  <div class="parties-list">
                    <For each={parties}>
                      {(partie, i) => (
                        <div class="flex w-full">
                          <div class="flex w-full">
                            <p class="mr-6">n° {i() + 1}</p>
                            <span
                              class="grow"
                              classList={{
                                win: partie.result === "Tu as gagné",
                                lost: partie.result === "Tu as perdu",
                                equal: partie.result === "Egalité",
                              }}>
                              {partie.result}
                            </span>
                            <div class=" mr-6 w-20 flex justify-between">
                              <span>{partie.playerChoice}</span>
                              <span>VS</span>
                              <span>{partie.computerChoice}</span>
                            </div>
                          </div>
                          <button
                            class="w-6 h-6 border-2 cursor-pointer"
                            onClick={() => {
                              setParties((p) => removeIndex(p, i()));
                              getPourcentPartiesWin(parties);
                              setIsActive(false);
                              setWinTheGame(false);
                              winTheGame(parties);
                            }}>
                            X
                          </button>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </div>
              <div>
                <p classList={{ win: isWinTheGame() === true }}>
                  Pourcentage de parties gagnées : {pourcent().toFixed(2)} %
                </p>
              </div>
              <form onSubmit={resetParties}>
                <button class="w-auto p-1 border-2">Recommencer</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
