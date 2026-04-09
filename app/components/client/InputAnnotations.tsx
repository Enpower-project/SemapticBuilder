import { v4 as uuidv4 } from "uuid";
import { useGlobalContextOntologizerLinesAnnotations } from "@/app/context/OntologizerLinesAnnotationsContext";
import { OntologizerLinesAnnotationsDataType } from "@/app/utils/interfaces";
import { useState } from "react";
import ErrorModal from "../server/ErrorModal";

export default function InputAnnotations() {
  const {
    ontologizerLinesAnnotationsArray,
    setOntologizerLinesAnnotationsArray,
  } = useGlobalContextOntologizerLinesAnnotations();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState("");

  const handleInputChange = (id: string, field: string, value: string) => {
    const newLines = ontologizerLinesAnnotationsArray.map((line) =>
      line.id === id ? { ...line, [field]: value } : line
    );
    setOntologizerLinesAnnotationsArray(newLines);
  };

  const addLine = () => {
    // value cannot be empty ------------------------------------------------------

    if (ontologizerLinesAnnotationsArray.some((item) => item.value === "")) {
      setErrorModalText(`Value cannot be empty`);
      setShowErrorModal(true);
    } else {
      const newLines = [...ontologizerLinesAnnotationsArray];

      newLines.push({
        id: uuidv4(),
        predicate: "dcterms:creator",
        value: "",
      });
      setOntologizerLinesAnnotationsArray(newLines);
    }
  };

  const resetAnnotations = () => {
    const newOntologizerLinesAnnotationsArray: OntologizerLinesAnnotationsDataType[] =
      [];
    setOntologizerLinesAnnotationsArray(newOntologizerLinesAnnotationsArray);
    newOntologizerLinesAnnotationsArray.push({
      id: uuidv4(),
      predicate: "dcterms:creator",
      value: "",
    });
    setOntologizerLinesAnnotationsArray(newOntologizerLinesAnnotationsArray);
  };

  const deleteLine = (id: string) => {
    const newOntologizerLinesArray = ontologizerLinesAnnotationsArray.filter(
      (line) => line.id !== id
    );
    setOntologizerLinesAnnotationsArray(newOntologizerLinesArray);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-xs">
        <div className="ml-1 mt-1 h-7 w-40 text-center bg-gray-100 flex items-center justify-center">
          Property
        </div>
        <div className="ml-1 mt-1 h-7 w-[468px] text-center bg-gray-100 flex items-center justify-center">
          Value
        </div>
        <div className="ml-1 mt-1 h-7 w-24 text-center bg-gray-100 flex items-center justify-center">
          + / -
        </div>
      </div>

      <div className="h-[344px] flex flex-col text-xs overflow-y-auto">
        {ontologizerLinesAnnotationsArray.map((line, index) => (
          <div key={line.id} className="flex flex-row">
            {/* --------------- Predicate -------------------- */}
            <select
              className="ml-1 mt-1 pl-1 h-7 w-40 border-b bg-white"
              value={line.predicate}
              onChange={(e) =>
                handleInputChange(line.id, "predicate", e.target.value)
              }
            >
              {" "}
              <option
                value=""
                disabled
                className="bg-sky-600/25 text-black text-sm"
              >
                &#11206; Data Service &#11206;
              </option>
              <option value="dcterms:creator">dcterms:creator</option>
              <option value="dcterms:created">dcterms:created</option>
              <option value="dcterms:contributor">dcterms:contributor</option>
              <option value="dcterms:date">dcterms:date</option>
              <option value="dcterms:description">dcterms:description</option>
              <option value="dcterms:identifier">dcterms:identifier</option>
              <option value="dcterms:isPartOf">dcterms:isPartOf</option>
              <option value="dcterms:licence">dcterms:license</option>
              <option value="dcterms:replaces">dcterms:replaces</option>
              <option value="dcterms:rights">dcterms:rights</option>
              <option value="dcterms:rightsHolder">dcterms:rightsHolder</option>
              <option value="dcterms:source">dcterms:source</option>
              <option value="dcterms:subject">dcterms:subject</option>
              <option value="dcterms:title">dcterms:title</option>
              <option value="dcterms:type">dcterms:type</option>
              <option value="dcterms:valid">dcterms:valid</option>
              <option
                value=""
                disabled
                className="bg-sky-600/25 text-black text-sm"
              >
                &#11206; Dataset &#11206;
              </option>
              <option value="dcat:catalog">dcat:catalog</option>
              <option value="dcat:dataset">dcat:dataset</option>
              <option value="dcat:hasVersion">dcat:hasVersion</option>
              <option value="dcat:keyword">dcat:keyword</option>
              <option value="dcat:resource">dcat:resource</option>
            </select>
            {/* --------------- value -------------------- */}
            <input
              className="ml-1 mt-1 pl-1 h-7 w-[468px] border-b"
              type="text"
              value={line.value}
              onChange={(e) =>
                handleInputChange(line.id, "value", e.target.value)
              }
            />

            {/* --------------- Buttons (+ / -)  -------------------- */}
            <button
              onClick={() => addLine()}
              className="bg-green-300 w-10 h-5 ml-2 mt-2 text-base border rounded-lg drop-shadow shadow-md box-border flex justify-center items-center"
            >
              +
            </button>

            {index == 0 ? (
              <button
                onClick={() => resetAnnotations()}
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
