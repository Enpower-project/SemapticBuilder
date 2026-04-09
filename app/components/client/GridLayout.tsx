"use client";

import React, { useState } from "react";
import NavButton from "./NavButton";
import ShowClasses from "../server/ShowClasses";
import ShowObjectProperties from "../server/ShowObjectProperties";
import ShowDataProperties from "../server/ShowDataProperties";
import ShowIndividuals from "../server/ShowIndividuals";
import Ontologies from "./Ontologies";
import InputJSON from "./InputJSON";
import InputKeys from "./InputKeys";
import InputContext from "./InputContext";
import InputAnnotations from "./InputAnnotations";
import SemanticMapJson from "./SemanticMapJson";
import InputEncodeKeys from "./InputEncodeKeys";
import { useGlobalContext } from "@/app/context/GlobalContext";
import ShowGraph from "../server/ShowGraph";
import SemanticMapGP from "./SemanticMapGP";
import ShowGraphGP from "../server/ShowGraphGP";
import SemanticMapCSV from "./SemanticMapCSV";

export default function GridLayout() {
  const { GlobalData, setGlobalData } = useGlobalContext();
  const [activeButtonGroup1, setActiveButtonGroup1] =
    useState<string>("navButtonJson");
  const [activeButtonGroup2, setActiveButtonGroup2] =
    useState<string>("navButtonContext");
  const [activeButtonGroup3, setActiveButtonGroup3] = useState<string>(
    "navButtonSemanticJSON"
  );
  const [activeButtonGroup4, setActiveButtonGroup4] =
    useState<string>("navButtonClasses");

  // handle colors of group buttons
  // Group1 -> JSON, Keys
  // Group2 -> @context, @annotations
  // Group3 -> Semantic Map, " "
  // Group4 -> Classes, Object Properties, Data Properties, Individuals
  const handleButtonClick = (group: number, id: string) => {
    switch (group) {
      case 1:
        setActiveButtonGroup1(id);
        break;
      case 2:
        setActiveButtonGroup2(id);
        break;
      case 3:
        setActiveButtonGroup3(id);
        break;
      case 4:
        setActiveButtonGroup4(id);
        break;
      default:
        break;
    }
  };

  // Show correspondent component after pressing nav button
  const ShowContent = ({ selectedContent }: any) => {
    switch (selectedContent) {
      case "navButtonJson":
        return <InputJSON />;
      case "navButtonKeys":
        return <InputKeys />;
      case "navButtonContext":
        return <InputContext />;
      case "navButtonAnnotations":
        return <InputAnnotations />;
      case "navButtonSemanticJSON":
        return <SemanticMapJson />;
      case "navButtonSemanticGP":
        return <SemanticMapGP />;
      case "navButtonSemanticCSV":
        return <SemanticMapCSV />;
      case "navButtonClasses":
        return <ShowClasses />;
      case "navButtonObjectProperties":
        return <ShowObjectProperties />;
      case "navButtonDataProperties":
        return <ShowDataProperties />;
      case "navButtonIndividuals":
        return <ShowIndividuals />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="mb-8">
          <p className=" text-6xl text-sky-600 font-bold">
            SEMAPTIC
            <span className="text-sky-600/15 font-normal italic">BUILDER</span>
          </p>
          <p className="pb-4  text-sky-600 text-xs">
            A Map for Semantic Interoperability
          </p>
        </div>

        <div className="ml-auto flex flex-row gap-10">
          <a
            href="https://www.enpower-project.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/ENPOWER.png" className="w-28" />
          </a>
          <a
            href="https://www.inesctec.pt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/INESCTEC.png" className="w-48 mt-3" />
          </a>
        </div>
      </div>

      <div className="mb-4 flex">
        {/* ------------------ JSON / Keys -------------------- */}
        <div className="w-[336px]">
          <div className="h-8">
            <NavButton
              id="navButtonJson"
              variant={
                activeButtonGroup1 === "navButtonJson" ? "active" : "inactive"
              }
              onClick={() => handleButtonClick(1, "navButtonJson")}
            >
              JSON
            </NavButton>
            <NavButton
              id="navButtonKeys"
              variant={
                activeButtonGroup1 === "navButtonKeys" ? "active" : "inactive"
              }
              onClick={() => handleButtonClick(1, "navButtonKeys")}
            >
              Keys
            </NavButton>
          </div>
          <div className="h-96 bg-white shadow-md rounded-b-lg">
            <ShowContent selectedContent={activeButtonGroup1} />
          </div>
        </div>
        {/* Encode keys */}
        <div className="ml-2 w-[204px]">
          <div className="h-8"></div>
          <div className="h-96 bg-white shadow-md rounded-b-lg">
            <InputEncodeKeys />
          </div>
        </div>
        {/* ------------------ Context / Annotations -------------------- */}
        <div className="ml-2 w-[740px]">
          <div className="h-8">
            <NavButton
              id="navButtonContext"
              variant={
                activeButtonGroup2 === "navButtonContext"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(2, "navButtonContext")}
            >
              @context
            </NavButton>
            <NavButton
              id="navButtonAnnotations"
              variant={
                activeButtonGroup2 === "navButtonAnnotations"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(2, "navButtonAnnotations")}
            >
              @annotations
            </NavButton>
          </div>
          <div className="h-96 bg-white shadow-md rounded-b-lg">
            <ShowContent selectedContent={activeButtonGroup2} />
          </div>
        </div>
        <div className="ml-2 w-[548px]">
          <div className="h-8">
            <NavButton
              id="navButtonSemanticJSON"
              variant={
                activeButtonGroup3 === "navButtonSemanticJSON"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(3, "navButtonSemanticJSON")}
            >
              JSON Map
            </NavButton>
            <NavButton
              id="navButtonSemanticCSV"
              variant={
                activeButtonGroup3 === "navButtonSemanticCSV"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(3, "navButtonSemanticCSV")}
            >
              CSV Map
            </NavButton>
            <NavButton
              id="navButtonSemanticGP"
              variant={
                activeButtonGroup3 === "navButtonSemanticGP"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(3, "navButtonSemanticGP")}
            >
              Graph Pattern
            </NavButton>
          </div>
          <div className="h-96 bg-white shadow-md rounded-b-lg">
            <ShowContent selectedContent={activeButtonGroup3} />
          </div>
        </div>
      </div>

      {/* ------------------ Graph ------------------------- */}

      {GlobalData.showGraph && (
        <div className="mb-2 flex">
          {/*<div className="w-[336px] h-[600px] rounded-lg bg-white"></div>*/}
          <div className="w-[1852px] h-[600px] rounded-lg bg-white">
            <ShowGraph />
          </div>
        </div>
      )}
      {GlobalData.showGraphGP && (
        <div className="mb-2 flex">
          {/*<div className="w-[336px] h-[600px] rounded-lg bg-white"></div>*/}
          <div className="w-[1852px] h-[600px] rounded-lg bg-white">
            <ShowGraphGP />
          </div>
        </div>
      )}

      {/* ------------------ Ontologies -------------------- */}
      <div className="mt-4 mb-2 flex">
        <div className="w-[548px]">
          <div className="h-8">
            <NavButton
              id="navButtonOntologies"
              variant="active"
              onClick={() => {}}
            >
              Ontologies
            </NavButton>
          </div>
          <div className="h-120 bg-white shadow-md rounded-b-lg">
            <Ontologies />
          </div>
          {/*<div className="h-120 bg-white shadow-md rounded-b-lg">lalala</div>*/}
        </div>
        {/* Show classes / properties / Individuals */}
        <div className="ml-2 w-[1296px]">
          <div className="h-8">
            <NavButton
              id="navButtonClasses"
              variant={
                activeButtonGroup4 === "navButtonClasses"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(4, "navButtonClasses")}
            >
              Classes
            </NavButton>
            <NavButton
              id="navButtonObjectProperties"
              variant={
                activeButtonGroup4 === "navButtonObjectProperties"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(4, "navButtonObjectProperties")}
            >
              Object Properties
            </NavButton>
            <NavButton
              id="navButtonDataProperties"
              variant={
                activeButtonGroup4 === "navButtonDataProperties"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(4, "navButtonDataProperties")}
            >
              Data Properties
            </NavButton>
            <NavButton
              id="navButtonIndividuals"
              variant={
                activeButtonGroup4 === "navButtonIndividuals"
                  ? "active"
                  : "inactive"
              }
              onClick={() => handleButtonClick(4, "navButtonIndividuals")}
            >
              Individuals
            </NavButton>
          </div>
          <div className="h-120 bg-white shadow-md rounded-b-lg">
            <ShowContent selectedContent={activeButtonGroup4} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*

"use client";

import NavButton from "./NavButton";

export default function GridLayout() {
  return (
    <div>
      <div className="mb-8">
        <p className=" text-6xl text-sky-600 font-bold">
          SEMAPTIC
          <span className="text-sky-600/15 font-normal italic">BUILDER</span>
        </p>
        <p className="pb-4  text-sky-600 text-xs">
          A Map for Semantic Interoperability
        </p>
      </div>
      <div className="mb-8 flex">
        <div className="w-[300px]">
          <div className="h-8">
            <NavButton id="navButtonJson" initialVariant="active">
              JSON
            </NavButton>
            <NavButton id="navButtonKeys" initialVariant="inactive">
              Keys
            </NavButton>
          </div>
          <div className="h-96 bg-white"></div>
        </div>
        <div className="ml-2 w-[240px]">
          <div className="h-8"></div>
          <div className="h-96 bg-white"></div>
        </div>
        <div className="ml-2 w-[800px]">
          <div className="h-8">
            <NavButton id="navButtonContext" initialVariant="active">
              @context
            </NavButton>
            <NavButton id="navButtonAnnotations" initialVariant="inactive">
              @annotations
            </NavButton>
          </div>
          <div className="h-96 bg-white"></div>
        </div>
        <div className="ml-2 w-[488px]">
          <div className="h-8">
            <NavButton id="navButtonSemaptic" initialVariant="active">
              Semantic MAP
            </NavButton>
            <NavButton id="navButtonCsv" initialVariant="inactive">
              &nbsp;
            </NavButton>
          </div>
          <div className="h-96 bg-white"></div>
        </div>
      </div>
      <div className="mb-2 flex">
        <div className="w-[548px]">
          <div className="h-8">
            <NavButton id="navButtonOntologies" initialVariant="active">
              Ontologies
            </NavButton>
          </div>
          <div className="h-120 bg-white"></div>
        </div>
        <div className="ml-2 w-[1296px]">
          <div className="h-8">
            <NavButton id="navButtonClasses" initialVariant="active">
              Classes
            </NavButton>
            <NavButton id="navButtonObjectProperties" initialVariant="inactive">
              Object Properties
            </NavButton>
            <NavButton id="navButtonDataProperties" initialVariant="inactive">
              Data Properties
            </NavButton>
            <NavButton id="navButtonIndividuals" initialVariant="inactive">
              Individuals
            </NavButton>
          </div>
          <div className="h-120 bg-white"></div>
        </div>
      </div>
    </div>
  );
}


*/
