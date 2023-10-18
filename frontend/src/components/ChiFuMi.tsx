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
  const [getInfo, setInfo] = createSignal(false);
  const [getGame, setGame] = createSignal(false);

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
    console.log("onMount getGame()", getGame());
  });

  const partiesCount = () => {
    setPartiesPlayed(partiesPlayed() + 1);
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

  const getInfos = () => {
    setInfo(true);
  };

  const getGameBool = () => {
    setGame(true);
  };

  return (
    <>
      <div class="global">
        {!getGame() && !getInfo() && (
          <div class="flex justify-center items-center w-full">
            <form onSubmit={resetParties}>
              <button
                onClick={() => {
                  setParties([]);
                  setENdTheGame(false);
                  getGameBool();
                }}>
                Joue avec moi pour accéder à mes infos
              </button>
            </form>
          </div>
        )}

        {getInfo() && getGame() && (
          <div class="flex justify-center text-center w-full">
            <div class="flex flex-col justify-center items-center w-full">
              <div class="flex justify-between w-full px-8">
                <form onSubmit={resetParties}>
                  <button
                    onclick={() => {
                      setGame(false);
                      setInfo(false);
                    }}
                    class="w-auto p-1 border-2">
                    Recommencer
                  </button>
                </form>
                <a href="/">
                  <button class="w-auto p-1 border-2">Retrouver le site</button>
                </a>
              </div>
              <h2 class="mt-32">Infos</h2>
              <p>Je suis un jeu de pierre, feuille, ciseaux</p>
              <p>
                J'ai été réalisé avec le framework Solid.js et le langage
                TypeScript
              </p>
              <p>
                Je suis hébergé sur Netlify, et j'utilise le service de
                localstorage de votre navigateur pour stocker les données
              </p>
              <div class="w-full mt-32">
                <p class="text-bold text-lg text-primary_color">
                  Non plus sérieusement voici mes infos
                </p>
                <div class="flex justify-around w-full mt-32">
                  <div class="flex flex-col items-center">
                    <a
                      href="https://github.com/TontonduWeb/cvNumerique"
                      class="border-none border-b-0 border-b-black"
                      target="blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="48"
                        height="48"
                        x="0"
                        y="0"
                        viewBox="0 0 24 24"
                        style="enable-background:new 0 0 512 512">
                        <g>
                          <path
                            d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z"
                            fill="#03ff40"
                            data-original="#000000"
                            opacity="1"
                            class=""></path>
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div class="flex flex-col items-center">
                    <a
                      href="https://www.linkedin.com/in/matthieu-dejean/"
                      target="blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="48"
                        height="48"
                        x="0"
                        y="0"
                        viewBox="0 0 176 176"
                        style="enable-background:new 0 0 512 512">
                        <g>
                          <path
                            d="M152 0H24A24 24 0 0 0 0 24v128a24 24 0 0 0 24 24h128a24 24 0 0 0 24-24V24a24 24 0 0 0-24-24zM60 139.28a3.71 3.71 0 0 1-3.71 3.72H40.48a3.71 3.71 0 0 1-3.72-3.72V73a3.72 3.72 0 0 1 3.72-3.72h15.81A3.72 3.72 0 0 1 60 73zM48.38 63a15 15 0 1 1 15-15 15 15 0 0 1-15 15zm94.26 76.54a3.41 3.41 0 0 1-3.42 3.42h-17a3.41 3.41 0 0 1-3.42-3.42v-31.05c0-4.64 1.36-20.32-12.13-20.32-10.45 0-12.58 10.73-13 15.55v35.86A3.42 3.42 0 0 1 90.3 143H73.88a3.41 3.41 0 0 1-3.41-3.42V72.71a3.41 3.41 0 0 1 3.41-3.42H90.3a3.42 3.42 0 0 1 3.42 3.42v5.78c3.88-5.83 9.63-10.31 21.9-10.31 27.18 0 27 25.38 27 39.32z"
                            data-name="Layer 2"
                            fill="#03ff40"
                            data-original="#000000"
                            class=""
                            opacity="1"></path>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {getGame() && !getInfo() && (
          <>
            <div class="z-10 absolute bottom left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {isEndTheGame() && isWinTheGame() ? (
                <>
                  <h2>Tu as gagné le game</h2>
                  {winParties() === 1 || partiesPlayed() > 3 ? (
                    <button onclick={getInfos}>
                      <a>Accède à mes infos</a>
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : isEndTheGame() && !isWinTheGame() ? (
                <>
                  <h2>Tu as perdu le game</h2>
                  {winParties() === 1 || partiesPlayed() > 3 ? (
                    <button onclick={getInfos}>
                      <a>Accède à mes infos</a>
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
                            Objectif :
                            <span class="pl-1">{levelRule().rule}</span>
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
                                transform: `translate(${
                                  coordinates().x - 100
                                }px, ${coordinates().y - 200}px)`,
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
                                transform: `translate(${
                                  coordinates().x - 100
                                }px, ${coordinates().y - 200}px)`,
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
                          <span class="text-6xl">
                            {chiFuMiComputerChoice()}
                          </span>
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
                    <span class="text-primary_color">
                      {levelRule().maxParties}
                    </span>{" "}
                    parties jouées
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
