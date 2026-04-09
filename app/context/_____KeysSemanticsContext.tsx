"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

interface KeysSemanticsDataType {
  jsonKey: string;
  ontoSubject: string;
  ontoPredicate: string;
  ontoObject: string;
}

interface KeysSemantics {
  keysSemanticsArray: KeysSemanticsDataType[];
  setKeysSemanticsArray: Dispatch<SetStateAction<KeysSemanticsDataType[]>>;
}

interface IPropsKeysSemantics {
  children: ReactNode;
}

const GlobalContextIPropsKeysSemantics = createContext<KeysSemantics>({
  keysSemanticsArray: [],
  setKeysSemanticsArray: (): KeysSemanticsDataType[] => [],
});

export const GlobalContextKeysSemanticProvider = ({
  children,
}: IPropsKeysSemantics) => {
  const [keysSemanticsArray, setKeysSemanticsArray] = useState<
    [] | KeysSemanticsDataType[]
  >([]);

  return (
    <GlobalContextIPropsKeysSemantics.Provider
      value={{ keysSemanticsArray, setKeysSemanticsArray }}
    >
      {children}
    </GlobalContextIPropsKeysSemantics.Provider>
  );
};

export const useGlobalContextIPropsKeysSemantics = () =>
  useContext(GlobalContextIPropsKeysSemantics);
