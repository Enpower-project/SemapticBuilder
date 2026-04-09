"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { OntoDataPropertyDataType } from "../utils/interfaces";

interface OntoDataPropertyContextProps {
  ontoDataPropertyArray: OntoDataPropertyDataType[];
  setOntoDataPropertyArray: Dispatch<
    SetStateAction<OntoDataPropertyDataType[]>
  >;
}

interface IPropsOntoDataProperty {
  children: ReactNode;
}

const GlobalContextOntoDataProperty =
  createContext<OntoDataPropertyContextProps>({
    ontoDataPropertyArray: [],
    setOntoDataPropertyArray: (): OntoDataPropertyDataType[] => [],
  });

export const GlobalContextOntoDataPropertyProvider = ({
  children,
}: IPropsOntoDataProperty) => {
  const [ontoDataPropertyArray, setOntoDataPropertyArray] = useState<
    [] | OntoDataPropertyDataType[]
  >([]);

  return (
    <GlobalContextOntoDataProperty.Provider
      value={{ ontoDataPropertyArray, setOntoDataPropertyArray }}
    >
      {children}
    </GlobalContextOntoDataProperty.Provider>
  );
};

export const useGlobalContextOntoDataProperty = () =>
  useContext(GlobalContextOntoDataProperty);
