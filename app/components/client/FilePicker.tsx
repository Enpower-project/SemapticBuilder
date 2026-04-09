"use client";

import { useState } from "react";

const RDFLib = require("rdflib");

import {
  extractClasses,
  extractDataProperties,
  extractIndividuals,
  extractNamespaces,
  extractObjectProperties,
} from "@/app/utils/rdflibStore";

import { useGlobalContextOntoClass } from "@/app/context/OntoClassContext";
import { useGlobalContextOntoObjectProperty } from "@/app/context/OntoObjectPropertyContext";
import { useGlobalContextOntoDataProperty } from "@/app/context/OntoDataPropertyContext";
import { useGlobalContextOntoIndividual } from "@/app/context/OntoIndividualContext";
//import { Console } from "console";
//import ErrorModal from "./ErrorModal";
import ErrorModal from "../server/ErrorModal";
import { createArrayNoDuplicates } from "@/app/utils/validations";
import { useGlobalContextPrefixSemantics } from "@/app/context/PrefixSemanticsContext";

const FilePicker: React.FC = () => {
  const [filePath, setFilePath] = useState<string>("");
  const { ontoClassArray, setOntoClassArray } = useGlobalContextOntoClass();
  const { ontoDataPropertyArray, setOntoDataPropertyArray } =
    useGlobalContextOntoDataProperty();
  const { ontoObjectPropertyArray, setOntoObjectPropertyArray } =
    useGlobalContextOntoObjectProperty();
  const { ontoIndividualArray, setOntoIndividualArray } =
    useGlobalContextOntoIndividual();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { prefixSemanticsArray, setPrefixSemanticsArray } =
    useGlobalContextPrefixSemantics();

  const handleFileParse = (
    fileContent: string,
    baseURI: string,
    mimeType: string
  ) => {
    const rdfStore = RDFLib.graph(); // Create a new RDF store
    try {
      RDFLib.parse(fileContent, rdfStore, baseURI, mimeType);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      console.log(`The error is: ${error}`);
    }

    const ontoClassArrayWithgKey = extractClasses(rdfStore);
    const ontoDataPropertyArrayWithgKey = extractDataProperties(rdfStore);
    const ontoObjectPropertyArrayWithgKey = extractObjectProperties(rdfStore);
    const ontoIndividualArrayWithgKey = extractIndividuals(rdfStore);

    setOntoClassArray(ontoClassArrayWithgKey);
    setOntoDataPropertyArray(ontoDataPropertyArrayWithgKey);
    setOntoObjectPropertyArray(ontoObjectPropertyArrayWithgKey);
    setOntoIndividualArray(ontoIndividualArrayWithgKey);

    // Prefixes into context
    let ontoPrefixNamespaces = extractNamespaces(rdfStore);

    // remove duplicate prefixes
    let uniquePrefixesNamespaces = createArrayNoDuplicates(
      ontoPrefixNamespaces,
      prefixSemanticsArray
    );

    console.log("-----------ontoPrefixNamespaces--------------");
    console.log(uniquePrefixesNamespaces);

    setPrefixSemanticsArray(uniquePrefixesNamespaces);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilePath(file.name);
      readFileContents(file);
    }
  };

  const readFileContents = (file: File) => {
    const fileName = file.name.toLowerCase();
    let mimeType = "";
    if (fileName.endsWith(".ttl")) {
      mimeType = "text/turtle";
    }
    if (fileName.endsWith(".rdf") || fileName.endsWith(".xml")) {
      mimeType = "application/rdf+xml";
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const fileContent = event.target.result as string;
        handleFileParse(
          fileContent,
          "file://" + encodeURI(file.name),
          mimeType
        );
      }
    };
    reader.readAsText(file);
  };

  const handleClose = () => {
    setErrorMessage(null); // Set errorMessage to null when the modal is closed
    setOntoClassArray([]);
    setOntoDataPropertyArray([]);
    setOntoObjectPropertyArray([]);
    setOntoIndividualArray([]);
  };

  return (
    <div>
      {errorMessage && (
        <ErrorModal
          genericMessage="Unexpected error reading the ontology file!"
          errorMessage={errorMessage}
          errorButtonVisible={true}
          errorButton="View Technical Error"
          onClose={handleClose}
        />
      )}
      <label className="w-20 ml-1 h-8 text-sm flex items-center justify-center mb-4 border cursor-pointer  rounded-lg  drop-shadow-xl shadow-lg">
        <input
          type="file"
          accept=".ttl,.rdf,.xml"
          className="hidden "
          onChange={handleFileChange}
        />
        Upload
      </label>
    </div>
  );
};

export default FilePicker;

// <input type="file" onChange={handleFileChange} />
