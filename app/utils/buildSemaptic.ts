import {
  GlobalDataType,
  OntologizerLinesAnnotationsDataType,
  OntologizerLinesDataType,
  PrefixSemanticsDataType,
} from "./interfaces";

//
// Build semaptic json based on the array of context lines and annotation lines
//
export function buildSemanticJson(
  globalData: GlobalDataType,
  ontologizerLinesArray: OntologizerLinesDataType[],
  ontologizerLinesAnnotationsArray: OntologizerLinesAnnotationsDataType[],
  prefixSemanticsArray: PrefixSemanticsDataType[]
) {
  var text_prefix = '"@semaptic": {\n   "@prefix": {\n';
  var text_context = '   },\n   "@context": {\n';
  var text_annotations = '   "@annotations": {\n';

  // Create prefixes...........................................................................
  prefixSemanticsArray.forEach((line) => {
    // context
    let prefixExist = ontologizerLinesArray.some(
      (item) =>
        item.ontoObject.startsWith(line.key + ":") ||
        item.ontoPredicate.startsWith(line.key + ":")
    );
    if (prefixExist) text_prefix += `      "${line.key}": "${line.value}",\n`;
  });

  // dcterms
  let dctermsExist = ontologizerLinesAnnotationsArray.some((item) =>
    item.predicate.startsWith("dcterms:")
  );
  if (dctermsExist)
    text_prefix += `      "dcterms": "http://purl.org/dc/terms/"\n`;
  // dcat
  let dcatExist = ontologizerLinesAnnotationsArray.some((item) =>
    item.predicate.startsWith("dcat:")
  );
  if (dcatExist) text_prefix += `      "dcat": "http://www.w3.org/ns/dcat#"\n`;

  // Create context............................................................................
  globalData.jsonKeys.forEach((jk) => {
    const filteredOntologizerLinesArray = ontologizerLinesArray.filter(
      (item) => item.jsonKey === jk
    );
    // Ordenar o array por subject para que as variáveis "?" fiquem todas juntas no fim
    filteredOntologizerLinesArray.sort((a, b) => {
      if (a.ontoSubject < b.ontoSubject) {
        return 1;
      }
      if (a.ontoSubject > b.ontoSubject) {
        return -1;
      }
      return 0;
    });

    var currentVariable = "";
    text_context += `      \"${jk}\": {\n`;
    filteredOntologizerLinesArray.forEach((line) => {
      if (line.ontoSubject.startsWith("?")) {
        if (currentVariable !== line.ontoSubject) {
          text_context += `         \"${line.ontoSubject}\": {\n`;
          currentVariable = line.ontoSubject;
          text_context += `            \"${line.ontoPredicate}\": \"${line.ontoObject}\"\n         },\n`;
        } else {
          text_context =
            text_context.slice(0, -13) +
            `,\n            \"${line.ontoPredicate}\": \"${line.ontoObject}\"\n         },\n`;
        }
      } else {
        text_context += `         \"${line.ontoPredicate}\": \"${line.ontoObject}\",\n`;
      }
    });
    text_context = text_context.slice(0, -2) + `\n      },\n`;
  });
  text_context = text_context.slice(0, -2) + `\n`;
  text_context += "   },\n";

  // Create annotations ........................................................................
  ontologizerLinesAnnotationsArray.forEach((line) => {
    text_annotations += `      \"${line.predicate}\": \"${line.value}\",\n`;
  });
  text_annotations = text_annotations.slice(0, -2) + "\n   }\n}";
  return text_prefix + text_context + text_annotations;
}

//
// Build semaptic InterConnect GP based on the array of context lines and annotation lines
//
export function buildSemanticGP(
  globalData: GlobalDataType,
  ontologizerLinesArray: OntologizerLinesDataType[]
) {
  var text_gp = "";

  // Create context............................................................................
  globalData.jsonKeys.forEach((jk) => {
    const filteredOntologizerLinesArray = ontologizerLinesArray.filter(
      (item) => item.jsonKey === jk
    );
    let subject = "";
    let object = "";
    // Ordenar o array por subject para que as variáveis "?" fiquem todas juntas no fim
    filteredOntologizerLinesArray.sort((a, b) => {
      if (a.ontoSubject < b.ontoSubject) {
        return 1;
      }
      if (a.ontoSubject > b.ontoSubject) {
        return -1;
      }
      return 0;
    });

    filteredOntologizerLinesArray.forEach((line) => {
      object = line.ontoObject;
      if (object === "") {
        object = '""';
      }
      subject = line.ontoSubject;
      if (subject === "") {
        subject = '""';
      }
      if (globalData.jsonKeys.includes(subject)) subject = "?" + subject;
      if (object.startsWith("@")) {
        object = "?" + object.slice(1);
      }
      if (object.startsWith("$")) {
        object = "?_" + object.slice(1);
      }
      text_gp += `${subject} ${line.ontoPredicate} ${object}\n`;
    });
  });

  return text_gp;
}

//----------------------------------------------------------------------------------------------
// Build semaptic CSV based on the array of context lines and annotation lines
//
export function buildSemanticCSV(
  globalData: GlobalDataType,
  ontologizerLinesArray: OntologizerLinesDataType[],
  ontologizerLinesAnnotationsArray: OntologizerLinesAnnotationsDataType[],
  prefixSemanticsArray: PrefixSemanticsDataType[]
) {
  var text_csv = "";

  // define a map for csv
  let matrixCSV = new Map<string, string[]>();
  globalData.jsonKeys.forEach((item) => {
    matrixCSV.set(item, []);
  });

  matrixCSV.set("annotations", []);
  matrixCSV.set("ontologies", []);

  // Include in map the ontologizerLinesArray ....................
  ontologizerLinesArray.forEach((item) => {
    matrixCSV
      .get(item.jsonKey)
      ?.push(
        "<" +
          item.ontoSubject +
          "><" +
          item.ontoPredicate +
          "><" +
          item.ontoObject +
          ">"
      );
  });
  // Include in map the ontologizerLinesAnnotationsArray .........
  ontologizerLinesAnnotationsArray.forEach((item) => {
    matrixCSV
      .get("annotations")
      ?.push('<"' + item.predicate + '"> <"' + item.value + '">');
  });
  // Include the ontologies .......................................
  prefixSemanticsArray.forEach((line) => {
    let prefixExist = ontologizerLinesArray.some(
      (item) =>
        item.ontoObject.startsWith(line.key + ":") ||
        item.ontoPredicate.startsWith(line.key + ":")
    );
    if (prefixExist) {
      matrixCSV
        .get("ontologies")
        ?.push('<"' + line.key + '": "' + line.value + '">');
    }
  });
  matrixCSV.get("ontologies")?.push('<"dcterms": "http://purl.org/dc/terms/">');
  // What is the biggest array of the map
  let maxLenght = 0;
  // Iterate through the map entries
  // Iterate through the map entries
  matrixCSV.forEach((array, item) => {
    if (array.length > maxLenght) maxLenght = array.length;
  });
  console.log(maxLenght);

  console.log(matrixCSV);

  text_csv = "";
  //first line with keys
  matrixCSV.forEach((array, item) => {
    text_csv += item + ",";
  });
  text_csv = text_csv.slice(0, -1) + "\n";
  // next lines
  for (let i = 0; i < maxLenght; i++) {
    matrixCSV.forEach((array, item) => {
      if (array[i]) {
        text_csv += array[i] + ",";
      } else text_csv += ",";
    });
    text_csv = text_csv.slice(0, -1) + "\n";
  }

  return text_csv;
}

//---------------------------------------------------------------------------------------------------------
// function to build the digraph based on the ontologizerLinesArray
//
export function buildTextDigraph(
  globalData: GlobalDataType,
  ontologizerLinesArray: OntologizerLinesDataType[],
  prefixSemanticsArray: PrefixSemanticsDataType[]
) {
  var textDigraph = "digraph { \n ";
  textDigraph += '"@semaptic" -> "@prefix" [ label = "Block" fontsize="7"]\n';
  textDigraph +=
    '"@semaptic" -> "@annotations" [ label = "Block" fontsize="7"]\n';
  textDigraph += '"@semaptic" -> "@context" [ label = "Block" fontsize="7"]\n';

  globalData.jsonKeys.forEach((key) => {
    textDigraph += `\"@context\" -> \"${key}\" [label= \"Key\" fontsize=\"8\"]\n`;
  });

  let object = "";
  ontologizerLinesArray.forEach((line) => {
    if (line.ontoObject && line.ontoSubject) {
      object = line.ontoObject;
      if (object.startsWith("@")) {
        object = object.slice(1);
      }
      textDigraph += `\"${line.ontoSubject}\" -> \"${object}\" [label= \"${line.ontoPredicate}\" fontsize=\"8\"]\n`;
    }
  });

  // prefixes ------------------------
  prefixSemanticsArray.forEach((line) => {
    let prefixExist = ontologizerLinesArray.some(
      (item) =>
        item.ontoObject.startsWith(line.key + ":") ||
        item.ontoPredicate.startsWith(line.key + ":")
    );
    if (prefixExist)
      textDigraph += `\"@prefix\" -> \"${line.key}\" [label= \"Prefix\" fontsize=\"8\"]\n`;
  });
  textDigraph += `\"@prefix\" -> \"decterms\" [label= \"Prefix\" fontsize=\"8\"]\n`;

  textDigraph += "}";

  return textDigraph;
}
//---------------------------------------------------------------------------------------------------------
// function to build the digraph based on the ontologizerLinesArray
//
export function buildTextDigraphGP(
  globalData: GlobalDataType,
  ontologizerLinesArray: OntologizerLinesDataType[]
) {
  var textDigraphGP = "digraph { \n ";

  let object = "";
  let subject = "";
  ontologizerLinesArray.forEach((line) => {
    if (line.ontoObject && line.ontoSubject) {
      object = line.ontoObject;
      subject = line.ontoSubject;
      if (globalData.jsonKeys.includes(subject)) subject = "?" + subject;
      if (object.startsWith("@")) {
        object = "?" + object.slice(1);
      }
      if (object.startsWith("$")) {
        object = "?_" + object.slice(1);
      }
      textDigraphGP += `\"${subject}\" -> \"${object}\" [label= \"${line.ontoPredicate}\" fontsize=\"8\"]\n`;
    }
  });

  textDigraphGP += "}";

  return textDigraphGP;
}

/*

// Define the type for the frequency counter
  type FrequencyCounter = {
    [key: string]: OntologizerLinesDataType[];
  };

  // Create first line of keys and bigger number of lines with same key
  globalData.jsonKeys.forEach((jk) => {
    text_csv += jk + ",";
  });

  text_csv += "annotations,ontologies\n";

  // Step 1: Group elements by jsonKey
  const groupedByJsonKey: FrequencyCounter =
    ontologizerLinesArray.reduce<FrequencyCounter>((acc, item) => {
      if (!acc[item.jsonKey]) {
        acc[item.jsonKey] = [];
      }
      acc[item.jsonKey].push(item);
      return acc;
    }, {});

  // Step 2: Find the maximum number of elements in any group
  const maxGroupLength = Math.max(
    ...Object.values(groupedByJsonKey).map((group) => group.length)
  );

  // Step 3: Access elements in the desired order
  for (let i = 0; i < maxGroupLength; i++) {
    globalData.jsonKeys.forEach((jk) => {
      if (groupedByJsonKey[jk][i]?.jsonKey) {
        text_csv +=
          "<" +
          groupedByJsonKey[jk][i].ontoSubject +
          "><" +
          groupedByJsonKey[jk][i].ontoPredicate +
          "><" +
          groupedByJsonKey[jk][i].ontoObject +
          ">,";
      } else text_csv += ",";
    });
    text_csv += "\n";
  }


  */
