"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { OntologizerLinesDataType } from "../utils/interfaces";

interface OntologizerLinesContextProps {
  ontologizerLinesArray: OntologizerLinesDataType[];
  setOntologizerLinesArray: Dispatch<
    SetStateAction<OntologizerLinesDataType[]>
  >;
}

interface IPropsOntologizerLines {
  children: ReactNode;
}

const GlobalContextOntologizerLines =
  createContext<OntologizerLinesContextProps>({
    ontologizerLinesArray: [],
    setOntologizerLinesArray: (): OntologizerLinesDataType[] => [],
  });

export const GlobalContextOntologizerLinesProvider = ({
  children,
}: IPropsOntologizerLines) => {
  const [ontologizerLinesArray, setOntologizerLinesArray] = useState<
    [] | OntologizerLinesDataType[]
  >([]);

  return (
    <GlobalContextOntologizerLines.Provider
      value={{ ontologizerLinesArray, setOntologizerLinesArray }}
    >
      {children}
    </GlobalContextOntologizerLines.Provider>
  );
};

export const useGlobalContextOntologizerLines = () =>
  useContext(GlobalContextOntologizerLines);
