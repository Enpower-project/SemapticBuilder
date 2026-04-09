"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  Children,
} from "react";

type NavButtonsType = {
  navButtonJson: string;
  navButtonKeys: string;
  navButtonContext: string;
  navButtonAnnotations: string;
  navButtonSemaptic: string;
  navButtonCsv: string;
  navButtonClasses: string;
  navButtonObjectProperties: string;
  navButtonDataProperties: string;
  navButtonIndividuals: string;
};

interface INavButtons {
  NavButtons: NavButtonsType;
  setNavButtons: Dispatch<SetStateAction<NavButtonsType>>;
}

interface IPropsNavButtons {
  children: ReactNode;
}

const GlobalContextNavButtons = createContext<INavButtons>({
  NavButtons: {
    navButtonJson: "",
    navButtonKeys: "",
    navButtonContext: "",
    navButtonAnnotations: "",
    navButtonSemaptic: "",
    navButtonCsv: "",
    navButtonClasses: "",
    navButtonObjectProperties: "",
    navButtonDataProperties: "",
    navButtonIndividuals: "",
  },
  setNavButtons: (): NavButtonsType => ({
    navButtonJson: "",
    navButtonKeys: "",
    navButtonContext: "",
    navButtonAnnotations: "",
    navButtonSemaptic: "",
    navButtonCsv: "",
    navButtonClasses: "",
    navButtonObjectProperties: "",
    navButtonDataProperties: "",
    navButtonIndividuals: "",
  }),
});

export const GlobalContextNavButtonsProvider = ({
  children,
}: IPropsNavButtons) => {
  const [NavButtons, setNavButtons] = useState<NavButtonsType>({
    navButtonJson: "",
    navButtonKeys: "",
    navButtonContext: "",
    navButtonAnnotations: "",
    navButtonSemaptic: "",
    navButtonCsv: "",
    navButtonClasses: "",
    navButtonObjectProperties: "",
    navButtonDataProperties: "",
    navButtonIndividuals: "",
  });

  return (
    <GlobalContextNavButtons.Provider value={{ NavButtons, setNavButtons }}>
      {children}
    </GlobalContextNavButtons.Provider>
  );
};

export const useGlobalContextNavButtons = () =>
  useContext(GlobalContextNavButtons);
