import { createContext, ParentComponent, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export type Chifumi = {
  readonly getInfo: boolean;
};

export type ChifumiContextState = {
  readonly chifumi: Chifumi;
};

export type ChifumiContextValue = [
  state: ChifumiContextState,
  actions: {
    changeChifumi: (chifumi: Chifumi) => void;
  }
];

const defaultState = {
  chifumi: {
    getInfo: false,
  },
};

const ChifumiContext = createContext<ChifumiContextValue>([
  defaultState,
  {
    changeChifumi: () => undefined,
  },
]);

export const ChifumiProvider: ParentComponent<{
  chifumi?: Chifumi;
}> = (props) => {
  const [state, setState] = createStore({
    chifumi: {
      getInfo: false,
    },
  });

  const changeChifumi = (chifumi: Chifumi) => {
    setState("chifumi", chifumi);
  };

  return (
    <ChifumiContext.Provider value={[state, { changeChifumi }]}>
      {props.children}
    </ChifumiContext.Provider>
  );
};

export const useChifumiContext = () => useContext(ChifumiContext);
