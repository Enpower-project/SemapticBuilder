"use client";

const RDFLib = require("rdflib");

import { ONTOLOGIES } from "@/app/utils/constants";
import {
  extractClasses,
  extractObjectProperties,
  extractDataProperties,
  extractIndividuals,
  extractNamespaces,
} from "@/app/utils/rdflibStore";
import FilePicker from "./FilePicker";
import { useGlobalContextPrefixSemantics } from "@/app/context/PrefixSemanticsContext";
import { createArrayNoDuplicates } from "@/app/utils/validations";
import { useGlobalContextOntoClass } from "@/app/context/OntoClassContext";
import { useGlobalContextOntoObjectProperty } from "@/app/context/OntoObjectPropertyContext";
import { useGlobalContextOntoDataProperty } from "@/app/context/OntoDataPropertyContext";
import { useGlobalContextOntoIndividual } from "@/app/context/OntoIndividualContext";

export default function Ontologies() {
  const { ontoClassArray, setOntoClassArray } = useGlobalContextOntoClass();
  const { ontoObjectPropertyArray, setOntoObjectPropertyArray } =
    useGlobalContextOntoObjectProperty();
  const { ontoDataPropertyArray, setOntoDataPropertyArray } =
    useGlobalContextOntoDataProperty();
  const { ontoIndividualArray, setOntoIndividualArray } =
    useGlobalContextOntoIndividual();
  const { prefixSemanticsArray, setPrefixSemanticsArray } =
    useGlobalContextPrefixSemantics();

  // Function to fetch data from the URL
  const fetchData = async (ontoLink: string) => {
    // Create an RDF store
    const rdfStore = RDFLib.graph();
    // Create the fetcher to store
    const fetcher = new RDFLib.Fetcher(rdfStore);

    try {
      await fetcher.load(ontoLink);
      console.log("Ontology loaded successfully.");
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Classes into context
    const ontoClassArrayWithgKey = extractClasses(rdfStore);
    setOntoClassArray(ontoClassArrayWithgKey);

    // Object Properties into context
    const ontoObjectPropertyArrayWithgKey = extractObjectProperties(rdfStore);
    setOntoObjectPropertyArray(ontoObjectPropertyArrayWithgKey);

    // Data Properties into context
    const ontoDataPropertyArrayWithgKey = extractDataProperties(rdfStore);
    setOntoDataPropertyArray(ontoDataPropertyArrayWithgKey);

    // Individuals into context
    const ontoIndividualArrayWithgKey = extractIndividuals(rdfStore);
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

  return (
    <>
      <div className="flex flex-row text-xs">
        <div className="m-1 h-7 w-16 text-center bg-gray-100 flex items-center justify-center">
          Prefix
        </div>
        <div className="m-1 ml-0 h-7 w-[336px] text-center bg-gray-100 flex items-center justify-center">
          Ontology description
        </div>
        <div className="m-1 ml-0 h-7 w-20 text-center bg-gray-100 flex items-center justify-center">
          U / D
        </div>
        <div className="m-1 ml-0 h-7 w-12 text-center bg-gray-100 flex items-center justify-center">
          Link
        </div>
      </div>

      <div className="flex flex-row mt-4 mb-4">
        <div className="w-16 m-1 h-8 "></div>
        <div className="w-[336px] h-8 p-1 text-sm font-bold flex  items-center bg-white">
          Upload ontology from local file
        </div>
        <div className="w-16 h-8">
          <FilePicker />
        </div>
        <div className="w-16 h-8"></div>
      </div>
      <div className="h-[360px] overflow-y-auto">
        {Object.keys(ONTOLOGIES).map((key) => (
          <div key={key} className="flex flex-row h-8 text-xs">
            <label className="w-16 m-1 mt-0 truncateflex flex items-center hover:overflow-visible hover:text-blue-600 border-b">
              {key}
            </label>
            <label className="w-[336px] m-1 ml-0 mt-0 truncate flex  items-center hover:overflow-visible hover:text-blue-600 border-b">
              {ONTOLOGIES[key].description}
            </label>
            <button
              onClick={() => fetchData(ONTOLOGIES[key].ontoLink)}
              className="w-20 m-1 ml-0 mt-0 border rounded-lg drop-shadow shadow-md box-border"
            >
              Download
            </button>
            <a
              href={ONTOLOGIES[key].link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-12 h-6 m-1 ml-0 border bg-blue-50 rounded-lg drop-shadow shadow-md box-border">
                Visit
              </button>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
