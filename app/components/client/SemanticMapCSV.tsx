"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { useGlobalContextOntologizerLinesAnnotations } from "@/app/context/OntologizerLinesAnnotationsContext";
import { useGlobalContextOntologizerLines } from "@/app/context/OntologizerLinesContext";
import { useGlobalContextPrefixSemantics } from "@/app/context/PrefixSemanticsContext";
import { buildSemanticCSV } from "@/app/utils/buildSemaptic";
import { copyToClipboard } from "@/app/utils/functions";
import {
  handleValidAnnotations,
  handleValidLine,
} from "@/app/utils/validations";
import { useEffect, useRef, useState } from "react";

//-----------------------------------------------------------------------
// create semaptic map for csv
//-----------------------------------------------------------------------
export default function SemanticMapCSV() {
  const { GlobalData, setGlobalData } = useGlobalContext();
  const { ontologizerLinesArray, setOntologizerLinesArray } =
    useGlobalContextOntologizerLines();
  const {
    ontologizerLinesAnnotationsArray,
    setOntologizerLinesAnnotationsArray,
  } = useGlobalContextOntologizerLinesAnnotations();
  const { prefixSemanticsArray, setPrefixSemanticsArray } =
    useGlobalContextPrefixSemantics();
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);
  const [textArea, setTextArea] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let semapticCSV = "";
    semapticCSV = buildSemanticCSV(
      GlobalData,
      ontologizerLinesArray,
      ontologizerLinesAnnotationsArray,
      prefixSemanticsArray
    );
    setTextArea(semapticCSV);
  }, [ontologizerLinesArray]);

  //
  // Copy text area to clipboard
  //
  const handleCopyTextArea = (textAreaRef: any) => {
    let errorInOntologizerLines = "";
    let errorInOntologizerLinesAnnotations = "";
    // Verify if ontologizerLinesArray is correctly defined
    GlobalData.jsonKeys.forEach((item) => {
      errorInOntologizerLines = handleValidLine(item, ontologizerLinesArray);
      errorInOntologizerLinesAnnotations = handleValidAnnotations(
        ontologizerLinesAnnotationsArray
      );
      if (errorInOntologizerLines !== "") {
        setTextArea("\n\n\n\n\n\n\n" + errorInOntologizerLines);
      } else if (errorInOntologizerLinesAnnotations !== "") {
        setTextArea("\n\n\n\n\n\n\n" + errorInOntologizerLinesAnnotations);
      }
    });
    if (textAreaRef.current) {
      copyToClipboard(textAreaRef.current.value);
      setShowClipboardMessage(true);
      setTimeout(() => {
        setShowClipboardMessage(false);
      }, 1000);
    }
  };

  return (
    <div className="select-none relative p-1 ">
      <div className="h-8 "></div>
      <textarea
        ref={textAreaRef}
        className="select-none w-full h-[342px] resize-none text-xs p-1"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        disabled
      ></textarea>
      <button
        onClick={() => handleCopyTextArea(textAreaRef)}
        className="absolute top-2 right-12 group"
      >
        <img
          src="/images/copy-clipboard.png"
          className="w-10 h-10 transform scale-50"
        />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Copy to clipboard
        </span>
      </button>
      {showClipboardMessage && (
        <div className="absolute top-10 right-3 text-xs text-green-400">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
