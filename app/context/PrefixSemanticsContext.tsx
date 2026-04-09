"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { PrefixSemanticsDataType } from "../utils/interfaces";

interface PrefixSemantics {
  prefixSemanticsArray: PrefixSemanticsDataType[];
  setPrefixSemanticsArray: Dispatch<SetStateAction<PrefixSemanticsDataType[]>>;
}

interface IPropsPrefixSemantics {
  children: ReactNode;
}

const GlobalContextPrefixSemantics = createContext<PrefixSemantics>({
  prefixSemanticsArray: [],
  setPrefixSemanticsArray: (): PrefixSemanticsDataType[] => [],
});

export const GlobalContextPrefixProvider = ({
  children,
}: IPropsPrefixSemantics) => {
  const [prefixSemanticsArray, setPrefixSemanticsArray] = useState<
    [] | PrefixSemanticsDataType[]
  >([]);

  return (
    <GlobalContextPrefixSemantics.Provider
      value={{ prefixSemanticsArray, setPrefixSemanticsArray }}
    >
      {children}
    </GlobalContextPrefixSemantics.Provider>
  );
};

export const useGlobalContextPrefixSemantics = () =>
  useContext(GlobalContextPrefixSemantics);
