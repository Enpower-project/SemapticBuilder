"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

type OntoClassDataType = {
  ontoClassKey: string;
  ontoClassName: string;
  ontoClassLabel: string;
  ontoClassComment: string;
};

interface OntoClassContextProps {
  ontoClassArray: OntoClassDataType[];
  setOntoClassArray: Dispatch<SetStateAction<OntoClassDataType[]>>;
}

interface IPropsOntoClass {
  children: ReactNode;
}

const GlobalContextOntoClass = createContext<OntoClassContextProps>({
  ontoClassArray: [],
  setOntoClassArray: (): OntoClassDataType[] => [],
});

export const GlobalContextOntoClassProvider = ({
  children,
}: IPropsOntoClass) => {
  const [ontoClassArray, setOntoClassArray] = useState<
    [] | OntoClassDataType[]
  >([]);

  return (
    <GlobalContextOntoClass.Provider
      value={{ ontoClassArray, setOntoClassArray }}
    >
      {children}
    </GlobalContextOntoClass.Provider>
  );
};

export const useGlobalContextOntoClass = () =>
  useContext(GlobalContextOntoClass);
