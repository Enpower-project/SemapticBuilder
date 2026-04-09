import { v4 as uuidv4 } from "uuid";
import { OntologizerLinesDataType } from "../utils/interfaces";

//
// Create initial ontologizerLinesArray
// If key is in semaptic hub, create it imediatly
//
export const getSemapticLines = (
  keysSet: Set<string>
): OntologizerLinesDataType[] => {
  const newLines: OntologizerLinesDataType[] = [];

  keysSet.forEach((key) => {
    if (key === "windspeed") {
      newLines.push(
        {
          id: uuidv4(),
          jsonKey: key,
          ontoSubject: key,
          ontoPredicate: "rdf:type",
          ontoObject: "saref:Meter",
        },
        {
          id: uuidv4(),
          jsonKey: key,
          ontoSubject: key,
          ontoPredicate: "rdf:type",
          ontoObject: "?aaa",
        },
        {
          id: uuidv4(),
          jsonKey: key,
          ontoSubject: "?aaa",
          ontoPredicate: "rdf:type",
          ontoObject: "saref:Device",
        }
      );
    } else {
      newLines.push({
        id: uuidv4(),
        jsonKey: key,
        ontoSubject: key,
        ontoPredicate: "rdf:type",
        ontoObject: "",
      });
    }
  });

  console.log(newLines);

  return newLines;
};
