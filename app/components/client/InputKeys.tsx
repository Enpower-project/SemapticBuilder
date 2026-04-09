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

const InputKeys = () => {
  const { GlobalData, setGlobalData } = useGlobalContext();
  const [jsonText, setJsonText] = useState(GlobalData.json);
  const [keysText, setKeysText] = useState(GlobalData.keys);
  const [jsonIsValid, setJsonIsValid] = useState(true);
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

  const handleExtractKeys = () => {
    {
      if (keysText === "") {
        return;
      }
      const validVariableNamePattern = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;
      const rows = keysText.split("\n");
      const keysSet = new Set<string>();

      rows.forEach((row) => {
        const words = row.split(/\s+/); // Split row into words
        for (const word of words) {
          if (validVariableNamePattern.test(word)) {
            keysSet.add(word);
            break; // Only take the first valid word
          }
        }
      });

      updateField("jsonKeys", Array.from(keysSet));

      // Create initial ontologizerLinesArray
      createInitialOntologizerLinesArray(keysSet);
      // Create initial ontologizerLinesannotationsArray
      createInitialOntologizerLinesAnnotationsArray();

      // Clear JSON text
      //     setJsonText("");
      updateField("json", ""); // update context
      // update keys text context
      updateField("keys", keysText); // update context
    }
  };

  //
  // Create initial array for all json keys, once they were extracted
  // If they exist in semaptic hub, fields are filled acordingly
  //
  const createInitialOntologizerLinesArray = (keysSet: Set<string>) => {
    setOntologizerLinesArray([]);

    const newLines = getSemapticLines(keysSet);
    setOntologizerLinesArray(newLines);
  };

  //
  // Create initial array for annotations
  //
  const createInitialOntologizerLinesAnnotationsArray = () => {
    setOntologizerLinesAnnotationsArray([]);
    const newLinesAnnotations: OntologizerLinesAnnotationsDataType[] = [];

    newLinesAnnotations.push({
      id: uuidv4(),
      predicate: "dcterms:creator",
      value: "",
    });

    setOntologizerLinesAnnotationsArray(newLinesAnnotations);
  };

  const handleTextAreaChange = (event: any) => {
    setKeysText(event.target.value);
    //  updateField("keys", event.target.value);
  };

  function clearTextArea() {
    setJsonText("");
    setJsonKey("");
    setKeysText("");
    updateField("json", ""); // update context
    setOntologizerLinesArray([]);
    setGlobalData({
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
  }

  function handleClose() {
    setErrorMessage("");
  }

  return (
    <div className="flex flex-row">
      {errorMessage && (
        <ErrorModal
          errorButton=""
          genericMessage="Invalid JSON Structure!"
          errorMessage={errorMessage}
          errorButtonVisible={false}
          onClose={handleClose}
        />
      )}
      <div className="flex flex-col w-96">
        <div className="flex flex-row text-xs">
          <div className="m-1 h-7 w-36 text-center bg-gray-100 flex items-center justify-center">
            List of keys
          </div>
          <button
            onClick={handleExtractKeys}
            className="w-24 h-7 m-1 ml-0 border rounded-lg drop-shadow shadow-md box-border group"
          >
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              The first valid word of each row will be the key
            </span>
            Extract Keys
          </button>
          <button
            onClick={clearTextArea}
            className="w-20 h-7 m-1 ml-0 border rounded-lg drop-shadow shadow-md box-border"
          >
            Clear
          </button>
        </div>
        <textarea
          value={keysText}
          onChange={handleTextAreaChange}
          spellCheck={false}
          className={`m-1 mt-0 p-2 text-xs h-[344px] resize-none ${
            jsonIsValid ? "bg-white" : "bg-red-50/50"
          }`}
        />
      </div>
    </div>
  );
};

export default InputKeys;
