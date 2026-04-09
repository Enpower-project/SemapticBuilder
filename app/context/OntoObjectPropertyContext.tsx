"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { OntoObjectPropertyDataType } from "../utils/interfaces";

interface OntoObjectPropertyContextProps {
  ontoObjectPropertyArray: OntoObjectPropertyDataType[];
  setOntoObjectPropertyArray: Dispatch<
    SetStateAction<OntoObjectPropertyDataType[]>
  >;
}

interface IPropsOntoObjectProperty {
  children: ReactNode;
}

const GlobalContextOntoObjectProperty =
  createContext<OntoObjectPropertyContextProps>({
    ontoObjectPropertyArray: [],
    setOntoObjectPropertyArray: (): OntoObjectPropertyDataType[] => [],
  });

export const GlobalContextOntoObjectPropertyProvider = ({
  children,
}: IPropsOntoObjectProperty) => {
  const [ontoObjectPropertyArray, setOntoObjectPropertyArray] = useState<
    [] | OntoObjectPropertyDataType[]
  >([]);

  return (
    <GlobalContextOntoObjectProperty.Provider
      value={{ ontoObjectPropertyArray, setOntoObjectPropertyArray }}
    >
      {children}
    </GlobalContextOntoObjectProperty.Provider>
  );
};

export const useGlobalContextOntoObjectProperty = () =>
  useContext(GlobalContextOntoObjectProperty);
