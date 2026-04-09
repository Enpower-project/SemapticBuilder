"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { GlobalDataType } from "../utils/interfaces";

interface GlobalContextProps {
  GlobalData: GlobalDataType;
  setGlobalData: Dispatch<SetStateAction<GlobalDataType>>;
}

interface IPropsGlobal {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextProps>({
  GlobalData: {
    json: "",
    jsonKeys: [], // Initialize the array of strings
    keys: "",
    activeButtonKey: "",
    jsonMap: "",
    gpMap: "",
    csvMap: "",
    xmlMap: "",
    showGraph: false,
    showGraphGP: false,
    textDigraph: "",
    textDigraphGP: "",
  },
  setGlobalData: (): GlobalDataType => ({
    json: "",
    jsonKeys: [], // Initialize the array of strings
    keys: "",
    activeButtonKey: "",
    jsonMap: "",
    gpMap: "",
    csvMap: "",
    xmlMap: "",
    showGraph: false,
    showGraphGP: false,
    textDigraph: "",
    textDigraphGP: "",
  }),
});

export const GlobalContextProvider = ({ children }: IPropsGlobal) => {
  const [GlobalData, setGlobalData] = useState<GlobalDataType>({
    json: "",
    jsonKeys: [], // Initialize the array of strings
    keys: "",
    activeButtonKey: "",
    jsonMap: "",
    gpMap: "",
    csvMap: "",
    xmlMap: "",
    showGraph: false,
    showGraphGP: false,
    textDigraph: "",
    textDigraphGP: "",
  });

  return (
    <GlobalContext.Provider value={{ GlobalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
