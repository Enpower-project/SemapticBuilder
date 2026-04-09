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
import {
  buildTextDigraph,
  buildTextDigraphGP,
} from "@/app/utils/buildSemaptic";
import { useGlobalContextPrefixSemantics } from "@/app/context/PrefixSemanticsContext";
// import KeyOntologizer from "./KeyOntologizer";

type JSONObject = {
  [key: string]: any;
};

const InputJSON = () => {
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
  const { prefixSemanticsArray, setPrefixSemanticsArray } =
    useGlobalContextPrefixSemantics();

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

  // console.log(GlobalData);

  const handleExtractJsonKeys = () => {
    if (jsonText === "") {
      return;
    }
    try {
      const jsonData: JSONObject = JSON.parse(jsonText);
      setJsonIsValid(true); // Set JSON as invalid

      // Create a set to store unique keys
      var keysSet = new Set<string>();

      // Call the function with the provided JSON object and keys set
      keysSet = extractKeysFromJson(jsonData, keysSet);
      // update context with the extracted keys
      updateField("jsonKeys", Array.from(keysSet));
      // Create initial ontologizerLinesArray
      createInitialOntologizerLinesArray(keysSet);
      // Create initial ontologizerLinesannotationsArray
      createInitialOntologizerLinesAnnotationsArray();
      // Create initial graph
      const textDigraph = buildTextDigraph(
        GlobalData,
        ontologizerLinesArray,
        prefixSemanticsArray
      );
      const textDigraphGP = buildTextDigraphGP(
        GlobalData,
        ontologizerLinesArray
      );
      updateField("textDigraph", textDigraph);
      updateField("textDigraphGP", textDigraphGP);
      // clear keysText
      updateField("keys", ""); // update context
      // update json text
      updateField("json", jsonText);
    } catch (error) {
      console.error("Invalid JSON structure:", error);
      setJsonIsValid(false); // Set JSON as invalid
      setErrorMessage("Invalid JSON Structure");
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
    setJsonText(event.target.value);
    //    updateField("json", event.target.value);
  };

  function extractKeysFromJson(obj: any, keysSet: Set<string>) {
    for (let key in obj) {
      // Skip array indices
      if (!/^\d+$/.test(key)) {
        // Add the key to the keys set
        keysSet.add(key);
      }
      if (typeof obj[key] === "object") {
        extractKeysFromJson(obj[key], keysSet); // Recursively extract keys if the value is an object
      }
    }
    return keysSet;
  }

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
            JSON Structure
          </div>
          <button
            onClick={handleExtractJsonKeys}
            className="w-24 h-7 m-1 ml-0 border rounded-lg drop-shadow shadow-md box-border"
          >
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
          value={jsonText}
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

export default InputJSON;
