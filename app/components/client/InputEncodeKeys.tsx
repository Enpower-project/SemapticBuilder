"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ErrorModal from "../server/ErrorModal";
// import { OntologizerLine } from "@/app/utils/interfaces";
import { useGlobalContextOntologizerLines } from "@/app/context/OntologizerLinesContext";
import { useGlobalContext } from "@/app/context/GlobalContext";
import {
  GlobalDataType,
  OntologizerLinesAnnotationsDataType,
} from "@/app/utils/interfaces";
import { getSemapticLines } from "@/app/SemanticHub/semapticKeys";
import { useGlobalContextOntologizerLinesAnnotations } from "@/app/context/OntologizerLinesAnnotationsContext";
// import KeyOntologizer from "./KeyOntologizer";

type JSONObject = {
  [key: string]: any;
};

const InputEncodeKeys = () => {
  const { GlobalData, setGlobalData } = useGlobalContext();
  const [jsonKey, setJsonKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeButtonKey, setActiveButtonKey] = useState("");
  //const [ontologizerLines, setOntologizerLines] = useGlobalContextOntologizerLine();
  const { ontologizerLinesArray, setOntologizerLinesArray } =
    useGlobalContextOntologizerLines();
  const {
    ontologizerLinesAnnotationsArray,
    setOntologizerLinesAnnotationsArray,
  } = useGlobalContextOntologizerLinesAnnotations();

  // update globals in context
  const updateField = (
    field: keyof GlobalDataType,
    value: string | string[]
  ) => {
    setGlobalData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleButtonJsonKey = (item: string) => {
    setJsonKey(item);
    setActiveButtonKey(item);
    updateField("activeButtonKey", item); // update context
  };

  function handleClose() {
    setErrorMessage("");
  }

  return (
    <div className="flex flex-row">
      <div>
        <div className="flex flex-row text-xs m-1">
          <div className="h-7 w-36 text-center bg-gray-100 flex items-center justify-center">
            Key
          </div>
          <div className="ml-1 h-7 w-12 text-center bg-gray-100 flex items-center justify-center">
            Encode
          </div>
        </div>
        <div className="overflow-y-auto h-[344px] text-xs">
          {GlobalData.jsonKeys.map((item, index) => (
            <div key={index} className="flex flex-row box-border">
              <div className="ml-1 pl-1 pt-1 w-36 h-7 border-b truncate">
                {item}
              </div>
              <button
                onClick={() => {
                  console.log("Button clicked:", item);
                  handleButtonJsonKey(item);
                }}
                className={`w-12 h-6 ml-1 mt-1 border rounded-lg drop-shadow shadow-md box-border ${
                  activeButtonKey === item ? "bg-green-300" : "bg-green-50/30"
                }`}
              >
                &gt;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputEncodeKeys;
