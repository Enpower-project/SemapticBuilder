"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

type OntoIndividualDataType = {
  ontoIndividualKey: string;
  ontoIndividualName: string;
  ontoIndividualLabel: string;
  ontoIndividualComment: string;
};

interface OntoIndividualContextProps {
  ontoIndividualArray: OntoIndividualDataType[];
  setOntoIndividualArray: Dispatch<SetStateAction<OntoIndividualDataType[]>>;
}

interface IPropsOntoIndividual {
  children: ReactNode;
}

const GlobalContextOntoIndividual = createContext<OntoIndividualContextProps>({
  ontoIndividualArray: [],
  setOntoIndividualArray: (): OntoIndividualDataType[] => [],
});

export const GlobalContextOntoIndividualProvider = ({
  children,
}: IPropsOntoIndividual) => {
  const [ontoIndividualArray, setOntoIndividualArray] = useState<
    [] | OntoIndividualDataType[]
  >([]);

  return (
    <GlobalContextOntoIndividual.Provider
      value={{ ontoIndividualArray, setOntoIndividualArray }}
    >
      {children}
    </GlobalContextOntoIndividual.Provider>
  );
};

export const useGlobalContextOntoIndividual = () =>
  useContext(GlobalContextOntoIndividual);
