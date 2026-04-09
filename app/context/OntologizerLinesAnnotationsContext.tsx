"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { OntologizerLinesAnnotationsDataType } from "../utils/interfaces";

interface OntologizerLinesAnnotationsProps {
  ontologizerLinesAnnotationsArray: OntologizerLinesAnnotationsDataType[];
  setOntologizerLinesAnnotationsArray: Dispatch<
    SetStateAction<OntologizerLinesAnnotationsDataType[]>
  >;
}

interface IPropsOntologizerLinesAnnotations {
  children: ReactNode;
}

const GlobalContextOntologizerLinesAnnotations =
  createContext<OntologizerLinesAnnotationsProps>({
    ontologizerLinesAnnotationsArray: [],
    setOntologizerLinesAnnotationsArray:
      (): OntologizerLinesAnnotationsDataType[] => [],
  });

export const GlobalContextOntologizerLinesAnnotationsProvider = ({
  children,
}: IPropsOntologizerLinesAnnotations) => {
  const [
    ontologizerLinesAnnotationsArray,
    setOntologizerLinesAnnotationsArray,
  ] = useState<[] | OntologizerLinesAnnotationsDataType[]>([]);

  return (
    <GlobalContextOntologizerLinesAnnotations.Provider
      value={{
        ontologizerLinesAnnotationsArray,
        setOntologizerLinesAnnotationsArray,
      }}
    >
      {children}
    </GlobalContextOntologizerLinesAnnotations.Provider>
  );
};

export const useGlobalContextOntologizerLinesAnnotations = () =>
  useContext(GlobalContextOntologizerLinesAnnotations);
