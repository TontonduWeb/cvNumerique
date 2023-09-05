import { For, batch, createSignal, onMount } from "solid-js";
import { createLocalStore, removeIndex } from "../providers/localStore";
import "../styles/chifumi.css";
import "@fontsource/vt323";

type Partie = { playerChoice: string; computerChoice: string; result: string };
type Level = {
  rank: number;
  level: string;
  pourcent: number;
  winParties: number;
  maxParties: number;
};

export default function ChiFuMi() {
  const [parties, setParties] = createLocalStore<Partie[]>("parties", []);
  const [level, setLevel] = createSignal<Level>({
    rank: 1,
    level: "Facile",
    pourcent: 40,
    winParties: 3,
    maxParties: 10,
  });
  const [coordinates, setCoordinates] = createSignal({ x: 0, y: 0 });
  const [randomChoice, setComputerChoice] = createSignal(0);
  const [pourcent, setPourcent] = createSignal(0);
  const [chiFuMiComputerChoice, setChiFuMiComputerChoice] = createSignal("");
  const [chiFuMiPlayerChoice, setChiFuMiPlayerChoice] = createSignal("");
  const [result, setResult] = createSignal("");
  const [isEndTheGame, setENdTheGame] = createSignal(false);
  const [isWinTheGame, setWinTheGame] = createSignal(false);
  const [isLevelSelected, setIsLevelSelected] = createSignal(false);
  const [isDisplayChoice, setIsDisplayChoice] = createSignal(false);
  const [isDisplay, setIsDisplay] = createSignal(false);
  const [isDisplayMessage, setIsDisplayMessage] = createSignal(false);
  const [isDisplayRule, setIsDisplayRule] = createSignal(false);
  const [winParties, setWinParties] = createSignal(0);
  const [lostParties, setLostParties] = createSignal(0);
  const [partiesPlayed, setPartiesPlayed] = createSignal(0);

  const chiFuMiValues = ["👊", "✋", "✌️"];

  const chiFuMiRule = [
    { value: "👊", rule: "La pierre bat les ciseaux" },
    { value: "✋", rule: "La feuille bat la pierre" },
    { value: "✌️", rule: "Les ciseaux battent la feuille" },
  ];

  const [chiFuMiRuleSelected, setChiFuMiRuleSelected] = createSignal("");
  const [levelRule, setLevelRule] = createSignal({
    rank: 1,
    level: "Facile",
    rule: "40% de parties gagnées",
    minWin: 3,
    maxParties: 10,
    congratulation:
      "Bravo tu as gagné le niveau 1, tu as clairement le niveau !",
    suggestion: "Essaye le niveau moyen",
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

  const levelRules = [
    {
      rank: 1,
      level: "Facile",
      rule: "40% de parties gagnées",
      minWin: 3,
      maxParties: 10,
      congratulation:
        "Bravo tu as gagné le niveau 1, tu as clairement le niveau !",
      suggestion: "Essaye le niveau moyen",
    },
    {
      rank: 2,
      level: "Moyen",
      rule: "50% de parties gagnées",
      minWin: 4,
      maxParties: 10,
      congratulation:
        "Bravo tu as gagné le niveau 2, les choses sérieuses commencent !",
      suggestion: "Essaye le niveau difficile",
    },
    {
      rank: 3,
      level: "Difficile",
      rule: "60% de parties gagnées",
      minWin: 5,
      maxParties: 8,
      congratulation: "Bravo tu as gagné le niveau 3, tu assure vraiment !",
      suggestion: "Seras tu un expert ?",
    },
    {
      rank: 4,
      level: "Expert",
      rule: "70% de parties gagnées",
      minWin: 4,
      maxParties: 8,
      congratulation: "Bravo tu as gagné le niveau 4, tu es un expert !",
      suggestion: "Essaye le niveau maitre",
    },
    {
      rank: 5,
      level: "Maitre",
      rule: "80% de parties gagnées",
      minWin: 5,
      maxParties: 6,
      congratulation: "Bravo tu as gagné le niveau 5, tu es un maitre !",
      suggestion: "Tu as gagné le jeu, bravo ! Enregistre ton score",
    },
  ];

  onMount(() => {
    setParties([]);
    setLevel(levels[0]);
  });

  const partiesCount = () => {
    setPartiesPlayed(partiesPlayed() + 1);
    console.log(partiesPlayed());
  };

  const winPartiesCount = () => {
    if (isEndTheGame() && isWinTheGame()) {
      setWinParties(winParties() + 1);
    }
  };

  const lostPartiesCount = () => {
    if (isEndTheGame() && !isWinTheGame()) {
      setLostParties(lostParties() + 1);
    }
  };

  const showRule = (value: string) => {
    for (let i = 0; i < chiFuMiRule.length; i++) {
      if (chiFuMiRule[i].value === value) {
        setChiFuMiRuleSelected(chiFuMiRule[i].rule);
      }
    }
  };

  const switchShowRule = () => {
    setIsDisplay(!isDisplay());
  };

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    setCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const switchIsDisplayChoice = () => {
    setIsDisplayChoice(!isDisplayChoice());
  };

  const switchIsDisplayMessage = () => {
    setIsDisplayMessage(!isDisplayMessage());
  };

  const switchIsDisplayRule = () => {
    setIsDisplayRule(!isDisplayRule());
  };

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

  const valueToLevelNumber = (value: string) => {
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
  };

  const selectLevel = (rank: number) => {
    setLevel(levels[rank]);
    setIsLevelSelected(true);
  };

  const resetParties = (e: SubmitEvent) => {
    partiesCount();
    e.preventDefault();
    // Create a batch to update state only once
    batch(() => {
      // Set a new player choice in the state
      setParties([]);
      setENdTheGame(false);
      setChiFuMiPlayerChoice("");
      setWinTheGame(false);
    });
  };

  const random = (min: number, max: number) => {
    setComputerChoice(Math.floor(Math.random() * (max - min + 1)) + min);
    if (randomChoice() === 1) {
      setChiFuMiComputerChoice("👊");
    } else if (randomChoice() === 2) {
      setChiFuMiComputerChoice("✋");
    } else if (randomChoice() === 3) {
      setChiFuMiComputerChoice("✌️");
    }
    return chiFuMiComputerChoice;
  };

  const getResult = () => {
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
  };

  const getPourcentPartiesWin = (parties: Partie[]) => {
    let win = 0;
    let pourcentWin = 0;

    for (let i = 0; i < parties.length; i++) {
      if (parties[i].result === "Tu as gagné") {
        win++;
      }
    }
    pourcentWin = (win / parties.length) * 100;

    setPourcent(pourcentWin);
    return pourcent;
  };

  const getMaxParties = (parties: Partie[]) => {
    let max = level().maxParties;
    if (parties.length >= max) {
      setENdTheGame(true);
    }
  };

  const winTheGame = (parties: Partie[]) => {
    let gamesWon = 0;
    for (let i = 0; i < parties.length; i++) {
      if (parties[i].result === "Tu as gagné") {
        gamesWon++;
      }
    }
    if (gamesWon >= level().winParties && pourcent() >= level().pourcent) {
      setWinTheGame(true);
      setENdTheGame(true);
      winPartiesCount();
    } else {
      lostPartiesCount();
    }
  };

  return (
    <>
      <div class="global">
        <div class="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {isEndTheGame() && isWinTheGame() ? (
            <>
              <h2>Tu as gagné le game</h2>
              {winParties() === 1 || partiesPlayed() > 3 ? (
                <button>
                  <a href="/main">Accéder au site de Matthieu</a>
                </button>
              ) : (
                ""
              )}
            </>
          ) : isEndTheGame() && !isWinTheGame() ? (
            <>
              <h2>Tu as perdu le game</h2>
              {winParties() === 1 || partiesPlayed() > 3 ? (
                <button>
                  <a href="/main">Accéder au site de Matthieu</a>
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div
          class="game-container"
          classList={{ winTheGameBack: isEndTheGame() === true }}>
          <div class="game">
            <h1>ChiFuMi</h1>
            {!isEndTheGame() ? (
              <>
                <div
                  class="level"
                  classList={{ hidden: isLevelSelected() == true }}>
                  <h3>Choisis ton niveau :</h3>
                  <form
                    onSubmit={(e) => {
                      resetParties(e);
                    }}>
                    <For each={levels}>
                      {(level, i) => (
                        <input
                          class="w-20 h-auto border-2 mx-5 my-2 cursor-pointer hover:text-primary_color hover:border-primary_color"
                          type="submit"
                          value={level.level}
                          onMouseMove={handleMouseMove}
                          onMouseEnter={() => {
                            setLevelRule(levelRules[i()]);
                          }}
                          onClick={(e) => {
                            selectLevel(
                              valueToLevelNumber(e.currentTarget.value)
                            );
                          }}
                        />
                      )}
                    </For>
                  </form>
                </div>
                <div
                  class="live"
                  classList={{
                    hidden: isLevelSelected() == false,
                  }}>
                  <p>
                    Niveau choisi :
                    <span
                      class="pl-1 text-primary_color"
                      onMouseEnter={() => {
                        switchIsDisplayRule();
                      }}
                      onMouseLeave={() => {
                        switchIsDisplayRule();
                      }}
                      onMouseMove={handleMouseMove}>
                      {levelRule().level}
                    </span>
                  </p>
                  {isDisplayRule() && chiFuMiPlayerChoice() !== "" ? (
                    <div
                      style={{
                        left: 0,
                        top: 0,
                        position: "absolute",
                        transition: "transform 1s ease",
                        transform: `translate(${coordinates().x + 400}px, ${
                          coordinates().y - 75
                        }px)`,
                      }}>
                      <p>
                        Objectif :<span class="pl-1">{levelRule().rule}</span>
                      </p>
                      <p>
                        Minimum : En
                        <span class="p-1">{levelRule().minWin}</span>
                        parties gagnées
                      </p>
                      <p>
                        Maximum : En
                        <span class="p-1">{levelRule().maxParties}</span>
                        parties jouées
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <h4>Choisis entre pierre, feuille ou ciseaux :</h4>
                  <form
                    class="flex justify-center"
                    onSubmit={setPlayerChoiceAndPartie}>
                    <For each={chiFuMiValues}>
                      {(value) => (
                        <button
                          onMouseEnter={() => {
                            switchIsDisplayChoice();
                            showRule(value);
                          }}
                          onMouseLeave={() => {
                            switchIsDisplayChoice();
                            setChiFuMiRuleSelected("");
                          }}
                          onMouseMove={handleMouseMove}
                          onClick={() => {
                            random(1, 3);
                            setChiFuMiPlayerChoice(value);
                            getResult();
                          }}
                          class="w-20 h-auto border-2 m-5">
                          <input
                            class="cursor-pointer"
                            type="button"
                            value={value}
                            onClick={(e) => {
                              setChiFuMiPlayerChoice(e.currentTarget.value);
                            }}
                          />
                        </button>
                      )}
                    </For>
                  </form>
                  <div class="flex justify-center">
                    <button
                      onClick={() => {
                        switchShowRule();
                      }}
                      onMouseEnter={() => {
                        switchIsDisplayMessage();
                      }}
                      onMouseLeave={() => {
                        switchIsDisplayMessage();
                      }}
                      onMouseMove={handleMouseMove}>
                      {isDisplay()
                        ? "☝️ Je veux bien de l'aide"
                        : "Je sais qui est le meilleur"}
                    </button>
                    {isDisplayMessage() && !isDisplay() ? (
                      <div>
                        <p
                          style={{
                            left: 0,
                            top: 0,
                            position: "absolute",
                            transition: "transform 1s ease",
                            transform: `translate(${coordinates().x - 100}px, ${
                              coordinates().y - 200
                            }px)`,
                          }}>
                          Désactiver l'aide
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {isDisplayMessage() && isDisplay() ? (
                      <div>
                        <p
                          style={{
                            left: 0,
                            top: 0,
                            position: "absolute",
                            transition: "transform 1s ease",
                            transform: `translate(${coordinates().x - 100}px, ${
                              coordinates().y - 200
                            }px)`,
                          }}>
                          Activer l'aide pour connaitre qui est le plus fort
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* RÈGLES HOVER */}
                {isDisplayChoice() && !isDisplay() ? (
                  <div>
                    <p
                      style={{
                        left: 0,
                        top: 0,
                        position: "absolute",
                        transition: "transform 1s ease",
                        transform: `translate(${coordinates().x - 100}px, ${
                          coordinates().y - 200
                        }px)`,
                      }}>
                      {chiFuMiRuleSelected()}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              // PARTIES MAXIMUM ATTEINTES

              <div>
                <h3>Parties maximum atteintes ...</h3>
                <p>
                  Atteins les {level().pourcent}% de parties gagnées, avec
                  minimum {level().winParties} parties gagnées en{" "}
                  {level().maxParties} parties maximum
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
          <div class="parties-played">
            <h3>Les Parties</h3>
            {partiesPlayed() > 1 ? (
              <p>Parties jouées : {partiesPlayed()}</p>
            ) : (
              <p>Partie jouée : {partiesPlayed()}</p>
            )}
            {winParties() > 1 ? (
              <p>Parties gagnées : {winParties()}</p>
            ) : (
              <p>Partie gagnée : {winParties()}</p>
            )}
            {lostParties() > 1 ? (
              <p>Parties perdues : {lostParties()}</p>
            ) : (
              <p>Partie perdue : {lostParties()}</p>
            )}
            <button class="w-auto p-1 border-2">
              <a href="/">Reset les parties</a>
            </button>
          </div>
        </div>
        <div class="parties-container">
          {parties.length > 0 ? (
            <>
              <h2 class="flex justify-center">Les manches :</h2>
              <div class="parties">
                <div class="parties-list">
                  <For each={parties}>
                    {(partie, i) => (
                      <div class="flex w-full mt-2">
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
                          class="w-6 h-6 flex justify-center items-center border-2 cursor-pointer"
                          onClick={() => {
                            setParties((p) => removeIndex(p, i()));
                            getPourcentPartiesWin(parties);
                            setENdTheGame(false);
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
              <div class="flex flex-col pb-8">
                <p
                  class="flex justify-center"
                  classList={{ win: isWinTheGame() === true }}>
                  Pourcentage de parties gagnées : {pourcent().toFixed(2)} %
                </p>
                <div class="flex justify-around mt-2">
                  <form onSubmit={resetParties}>
                    <button class="w-auto p-1 border-2">Recommencer</button>
                  </form>
                  <form onSubmit={resetParties}>
                    <button
                      class="w-auto p-1 border-2"
                      onClick={() => setIsLevelSelected(false)}>
                      Changer de niveau
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div class="rules">
              <h3 class="text-3xl">
                Commence une partie du niveau{" "}
                <span class="text-primary_color">{levelRule().level}</span>
              </h3>
              <h4 class="text-5xl">
                Objectif :
                <span class="text-primary_color">{levelRule().rule}</span>
              </h4>
              <p>
                Minimum : En{" "}
                <span class="text-primary_color">{levelRule().minWin}</span>{" "}
                parties gagnées
              </p>
              <p>
                Maximum : En{" "}
                <span class="text-primary_color">{levelRule().maxParties}</span>{" "}
                parties jouées
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
