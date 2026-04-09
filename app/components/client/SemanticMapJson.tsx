"use client";

import { copyToClipboard } from "@/app/utils/functions";
import React, { useEffect, useRef, useState } from "react";
import ShowGraph from "../server/ShowGraph";
import { createRoot } from "react-dom/client";
import {
  handleValidAnnotations,
  handleValidLine,
} from "@/app/utils/validations";
import { useGlobalContextOntologizerLines } from "@/app/context/OntologizerLinesContext";
import { useGlobalContext } from "@/app/context/GlobalContext";
// import { error } from "console";
import { useGlobalContextOntologizerLinesAnnotations } from "@/app/context/OntologizerLinesAnnotationsContext";
import { buildSemanticJson, buildTextDigraph } from "@/app/utils/buildSemaptic";
import { useGlobalContextPrefixSemantics } from "@/app/context/PrefixSemanticsContext";

export default function SemanticMapJson() {
  const [textArea, setTextArea] = useState(
    '"@semaptic":{\n   "@prefix": {\n\n   },\n   "@context": {\n\n   },\n   "@annotations": {\n\n   }\n}'
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { ontologizerLinesArray, setOntologizerLinesArray } =
    useGlobalContextOntologizerLines();
  const {
    ontologizerLinesAnnotationsArray,
    setOntologizerLinesAnnotationsArray,
  } = useGlobalContextOntologizerLinesAnnotations();
  const { prefixSemanticsArray, setPrefixSemanticsArray } =
    useGlobalContextPrefixSemantics();
  const { GlobalData, setGlobalData } = useGlobalContext();
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);

  useEffect(() => {
    let semapticSpecs = "";
    semapticSpecs = buildSemanticJson(
      GlobalData,
      ontologizerLinesArray,
      ontologizerLinesAnnotationsArray,
      prefixSemanticsArray
    );
    setTextArea(semapticSpecs);
  }, [ontologizerLinesArray, ontologizerLinesAnnotationsArray]);

  //
  // get digraph and open graph div
  //
  const openGraphDiv = () => {
    let show = GlobalData.showGraph;
    show = !show;
    setGlobalData((prevData) => ({
      ...prevData,
      showGraph: show,
      //    textDigraph: textDigraph,
    }));
  };

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
      <button
        onClick={openGraphDiv}
        className="absolute top-0 right-0 px-2 py-2 group"
      >
        <img src="/images/graph.png" className="w-10 h-10 transform scale-50" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max -mb-2 px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Graph
        </span>
      </button>
    </div>
  );
}

/*

"use client";

import { copyToClipboard } from "@/app/utils/functions";
import React, { useEffect, useRef, useState } from "react";
import ShowGraph from "../server/ShowGraph";
import { createRoot } from "react-dom/client";
import {
  handleValidAnnotations,
  handleValidLine,
} from "@/app/utils/validations";
import { useGlobalContextOntologizerLines } from "@/app/context/OntologizerLinesContext";
import { useGlobalContext } from "@/app/context/GlobalContext";
// import { error } from "console";
import { useGlobalContextOntologizerLinesAnnotations } from "@/app/context/OntologizerLinesAnnotationsContext";
import { buildSemanticJson } from "@/app/utils/buildSemaptic";

export default function SemanticMapJson() {
  const [textArea, setTextArea] = useState(
    '"@semaptic":{\n   "@prefix": {\n\n   },\n   "@context": {\n\n   },\n   "@annotations": {\n\n   }\n}'
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { ontologizerLinesArray, setOntologizerLinesArray } =
    useGlobalContextOntologizerLines();
  const {
    ontologizerLinesAnnotationsArray,
    setOntologizerLinesAnnotationsArray,
  } = useGlobalContextOntologizerLinesAnnotations();
  const { GlobalData, setGlobalData } = useGlobalContext();
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);

  useEffect(() => {
    let semapticSpecs = "";
    semapticSpecs = buildSemanticJson(
      GlobalData,
      ontologizerLinesArray,
      ontologizerLinesAnnotationsArray
    );
    setTextArea(semapticSpecs);
  }, [ontologizerLinesArray, ontologizerLinesAnnotationsArray]);

  const openNewWindow = () => {
    const width = 800;
    const height = 600;
    const left = window.screenLeft + window.innerWidth / 2 - width / 2;
    const top = window.screenTop + window.innerHeight / 2 - height / 2;

    const newWindow = window.open(
      "",
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no`
    );
    if (newWindow) {
      newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Component</title>
            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>
        `);
      newWindow.document.close();

      // Wait for the new window to load
      newWindow.onload = () => {
        const rootElement = newWindow.document.getElementById("root");
        if (rootElement) {
          console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
          const root = createRoot(rootElement);

          console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
          root.render(<ShowGraph />);
        } else {
          console.error("rootElement not found");
        }
      };
    }
  };

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

  const dummy = `Variable <b style="color: darkcyan;">${textArea}</b> already exists!`;

  return (
    <div className="select-none relative p-1 ">
      <textarea
        ref={textAreaRef}
        className="select-none w-full h-[370px] resize-none text-xs p-1"
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
      <button
        onClick={openNewWindow}
        className="absolute top-0 right-0 px-2 py-2 group"
      >
        <img src="/images/graph.png" className="w-10 h-10 transform scale-50" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max -mb-2 px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Graph
        </span>
      </button>
    </div>
  );
}


*/
