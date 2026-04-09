import { v4 as uuidv4 } from "uuid";

import { useEffect, useRef, useState } from "react";
import { useGlobalContextOntologizerLines } from "@/app/context/OntologizerLinesContext";
import { OntologizerLinesDataType } from "@/app/utils/interfaces";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { useGlobalContextOntoObjectProperty } from "@/app/context/OntoObjectPropertyContext";
import { useGlobalContextOntoDataProperty } from "@/app/context/OntoDataPropertyContext";
import { useGlobalContextOntoClass } from "@/app/context/OntoClassContext";
import { useGlobalContextOntoIndividual } from "@/app/context/OntoIndividualContext";
import ErrorModal from "../server/ErrorModal";
import { handleValidLine } from "@/app/utils/validations";
import {
  buildTextDigraph,
  buildTextDigraphGP,
} from "@/app/utils/buildSemaptic";
import { useGlobalContextPrefixSemantics } from "@/app/context/PrefixSemanticsContext";

export default function InputContext() {
  //  const isValidNewLine = useRef(false);
  const { GlobalData, setGlobalData } = useGlobalContext();
  const { ontologizerLinesArray, setOntologizerLinesArray } =
    useGlobalContextOntologizerLines();
  const { ontoObjectPropertyArray, setOntoObjectPropertyArray } =
    useGlobalContextOntoObjectProperty();
  const { ontoClassArray, setOntoClassArray } = useGlobalContextOntoClass();
  const { ontoIndividualArray, setOntoIndividualArray } =
    useGlobalContextOntoIndividual();
  const { ontoDataPropertyArray, setOntoDataPropertyArray } =
    useGlobalContextOntoDataProperty();
  const { prefixSemanticsArray, setPrefixSemanticsArray } =
    useGlobalContextPrefixSemantics();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState("");
  //  const [ontologizerLines, setOntologizerLines] = useState<
  //    OntologizerLinesDataType[]
  //  >([]);

  console.log(".............................");
  console.log(ontologizerLinesArray);

  const handleInputChange = (id: string, field: string, value: string) => {
    const newLines = ontologizerLinesArray.map((line) =>
      line.id === id ? { ...line, [field]: value } : line
    );
    setOntologizerLinesArray(newLines);
    if (!value.startsWith("?")) {
      const textDigraph = buildTextDigraph(
        GlobalData,
        newLines,
        prefixSemanticsArray
      );
      setGlobalData((prevData) => ({
        ...prevData,
        textDigraph: textDigraph,
      }));
      const textDigraphGP = buildTextDigraphGP(GlobalData, newLines);
      setGlobalData((prevData) => ({
        ...prevData,
        textDigraphGP: textDigraphGP,
      }));
    }
    //  handleValidLine(newLines);
  };

  // useEffect(() => {}, [ontologizerLinesArray]);

  //
  // Add new line in ontologizerLinesArray
  //
  const addLine = (jk: string) => {
    console.log(0);
    const errorModal = handleValidLine(jk, ontologizerLinesArray);

    if (errorModal) {
      setErrorModalText(errorModal);
      setShowErrorModal(true);
    } else {
      // if everything is valid, add new line
      const newOntologizerLinesArray = [...ontologizerLinesArray];
      if (true) {
        newOntologizerLinesArray.push({
          id: uuidv4(),
          jsonKey: jk,
          ontoSubject: jk,
          ontoPredicate: "rdf:type",
          ontoObject: "",
        });
        setOntologizerLinesArray(newOntologizerLinesArray);
        // console.log(newOntologizerLinesArray);
        //Build digraph
        //Build digraphGP
        const textDigraph = buildTextDigraph(
          GlobalData,
          ontologizerLinesArray,
          prefixSemanticsArray
        );
        setGlobalData((prevData) => ({
          ...prevData,
          textDigraph: textDigraph,
        }));
        const textDigraphGP = buildTextDigraphGP(
          GlobalData,
          ontologizerLinesArray
        );
        setGlobalData((prevData) => ({
          ...prevData,
          textDigraphGP: textDigraphGP,
        }));
      }
    }
  };

  const deleteLine = (id: string) => {
    const newOntologizerLinesArray = ontologizerLinesArray.filter(
      (line) => line.id !== id
    );
    setOntologizerLinesArray(newOntologizerLinesArray);
    // handleValidLine();
    const textDigraph = buildTextDigraph(
      GlobalData,
      newOntologizerLinesArray,
      prefixSemanticsArray
    );
    setGlobalData((prevData) => ({
      ...prevData,
      textDigraph: textDigraph,
    }));
    const textDigraphGP = buildTextDigraphGP(
      GlobalData,
      newOntologizerLinesArray
    );
    setGlobalData((prevData) => ({
      ...prevData,
      textDigraphGP: textDigraphGP,
    }));
  };

  const resetJsonKey = (jk: string) => {
    const newOntologizerLinesArray = ontologizerLinesArray.filter(
      (line) => line.jsonKey !== jk
    );
    newOntologizerLinesArray.push({
      id: uuidv4(),
      jsonKey: jk,
      ontoSubject: jk,
      ontoPredicate: "rdf:type",
      ontoObject: "",
    });
    setOntologizerLinesArray(newOntologizerLinesArray);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-xs">
        <div className="ml-1 mt-1 h-7 w-52 text-center bg-gray-100 flex items-center justify-center">
          Subject
        </div>
        <div className="ml-1 mt-1 h-7 w-52 text-center bg-gray-100 flex items-center justify-center">
          Predicate
        </div>
        <div className="ml-1 mt-1 h-7 w-52 text-center bg-gray-100 flex items-center justify-center">
          Object
        </div>
        <div className="ml-1 mt-1 h-7 w-24 text-center bg-gray-100 flex items-center justify-center">
          + / -
        </div>
      </div>

      <div className="h-[344px] flex flex-col text-xs overflow-y-auto">
        {ontologizerLinesArray
          .filter((line) => line.jsonKey === GlobalData.activeButtonKey)
          .map((line, index) => (
            <div key={line.id} className="flex flex-row">
              {/* --------------- Subject -------------------- */}
              <input
                className="ml-1 mt-1 pl-1 h-7 w-52 border-b"
                type="text"
                value={line.ontoSubject}
                onChange={(e) =>
                  handleInputChange(line.id, "ontoSubject", e.target.value)
                }
                disabled={index === 0} // Disable the input if it's the first element
              />
              {/* --------------- Predicate -------------------- */}
              <select
                className="ml-1 mt-1 pl-1 h-7 w-52 border-b bg-white"
                value={line.ontoPredicate}
                onChange={(e) =>
                  handleInputChange(line.id, "ontoPredicate", e.target.value)
                }
              >
                <option value={line.ontoPredicate} className="bg-green-300">
                  {line.ontoPredicate}
                </option>
                <option value="rdf:type">rdf:type</option>
                {/* Object properties */}
                <option
                  value=""
                  disabled
                  className="bg-sky-600/25 text-black text-sm"
                >
                  &#11206; Object Properties &#11206;
                </option>
                {ontoObjectPropertyArray.map((option, index) => (
                  <option key={index} value={option.ontoObjectPropertyName}>
                    {option.ontoObjectPropertyName}
                  </option>
                ))}
                {/* Data properties */}
                <option
                  value=""
                  disabled
                  className="bg-sky-600/25 text-black text-sm"
                >
                  &#11206; Data Properties &#11206;
                </option>
                {ontoDataPropertyArray.map((option, index) => (
                  <option key={index} value={option.ontoDataPropertyName}>
                    {option.ontoDataPropertyName}
                  </option>
                ))}
              </select>
              {/* --------------- Object -------------------- */}

              {line.ontoObject[0] === "?" ? (
                <input
                  className="ml-1 mt-1 pl-1 h-7 w-52 border-b bg-white"
                  type="text"
                  value={line.ontoObject}
                  disabled={line.ontoObject[0] !== "?"} // Disable the input if it's the first element
                  onChange={(e) =>
                    handleInputChange(line.id, "ontoObject", e.target.value)
                  }
                />
              ) : (
                <select
                  className="ml-1 mt-1 pl-1 h-7 w-52 border-b bg-white"
                  value={line.ontoObject}
                  onChange={(e) =>
                    handleInputChange(line.id, "ontoObject", e.target.value)
                  }
                >
                  <option value={line.ontoObject} className="bg-green-300">
                    {line.ontoObject}
                  </option>
                  <option
                    value=""
                    disabled
                    className="bg-sky-600/25 text-black text-sm"
                  >
                    &#11206; New variable &#11206;
                  </option>
                  <option value="?">?</option>
                  <option
                    value=""
                    disabled
                    className="bg-sky-600/25 text-black text-sm"
                  >
                    &#11206; json key &#11206;
                  </option>
                  {GlobalData.jsonKeys.map((option, index) => (
                    <option
                      key={index}
                      value={
                        option !== GlobalData.activeButtonKey
                          ? "@" + option
                          : "$" + option
                      }
                    >
                      {option !== GlobalData.activeButtonKey
                        ? "@" + option
                        : "$" + option}
                    </option>
                  ))}
                  <option
                    value=""
                    disabled
                    className="bg-sky-600/25 text-black text-sm"
                  >
                    &#11206; Ontology Class &#11206;
                  </option>
                  {ontoClassArray.map((option, index) => (
                    <option key={index * 1001} value={option.ontoClassName}>
                      {option.ontoClassName}
                    </option>
                  ))}
                  <option
                    value=""
                    disabled
                    className="bg-sky-600/25 text-black text-sm"
                  >
                    &#11206; Individuals &#11206;
                  </option>
                  {ontoIndividualArray.map((option, index) => (
                    <option
                      key={index * 1001}
                      value={option.ontoIndividualName}
                    >
                      {option.ontoIndividualName}
                    </option>
                  ))}
                </select>
              )}
              {/* --------------- Buttons (+ / -)  -------------------- */}
              <button
                onClick={() => addLine(line.jsonKey)}
                className="bg-green-300 w-10 h-5 ml-2 mt-2 text-base border rounded-lg drop-shadow shadow-md box-border flex justify-center items-center"
              >
                +
              </button>

              {index == 0 ? (
                <button
                  onClick={() => resetJsonKey(line.jsonKey)}
                  className="bg-sky-600/25 w-10 h-5 ml-2 mt-2 text-base border rounded-lg drop-shadow shadow-md box-border flex justify-center items-center"
                >
                  &#8630;
                </button>
              ) : (
                <button
                  onClick={() => deleteLine(line.id)}
                  className="bg-red-300  w-10 h-5 ml-2 mt-2 text-base border rounded-lg drop-shadow shadow-md box-border flex justify-center items-center"
                >
                  -
                </button>
              )}
            </div>
          ))}
        {showErrorModal && (
          <ErrorModal
            genericMessage={errorModalText}
            errorButtonVisible={false}
            errorMessage=""
            errorButton=""
            onClose={() => setShowErrorModal(false)}
          />
        )}
      </div>
    </div>
  );
}
