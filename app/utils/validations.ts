import {
  GlobalDataType,
  OntologizerLinesAnnotationsDataType,
  OntologizerLinesDataType,
} from "./interfaces";

type PrefixSemanticsDataType = {
  key: string;
  value: string;
};

// Combine arrays of prefix-namespace and remove duplicates
export function createArrayNoDuplicates(
  arr1: PrefixSemanticsDataType[], // new array of prefixes
  arr2: PrefixSemanticsDataType[] // array in context
) {
  arr1.push({ key: "time", value: "http://www.w3.org/2006/time#" });
  arr1.forEach((item) => {
    let keyExist = arr2.some((x) => x.key === item.key);
    if (!keyExist) {
      arr2.push(item);
    }
  });

  console.log("....arr2................", arr2);

  return arr2;
}

// ----------------------------------------------------------------------------------------------------------------------
// Before creating new line, see if previous is valid
//
export const handleValidLine = (
  jk: string,
  ontologizerLinesArray: OntologizerLinesDataType[]
) => {
  let faultySubject = "";
  let faultyObject = "";
  let isValid = true;
  let dummy = "";

  const filteredOntologizerLinesArray = ontologizerLinesArray.filter(
    (item) => item.jsonKey === jk
  );

  // Object variable cannot be a ?jsonKey ----------------------------------------------
  filteredOntologizerLinesArray.forEach((item) => {
    if (item.ontoObject.startsWith("?")) {
      ontologizerLinesArray.forEach((otherItem) => {
        if (otherItem.jsonKey === item.ontoObject.substring(1)) {
          faultyObject = item.ontoObject;
          isValid = false;
          return false;
        }
      });
    }
  });
  if (!isValid) {
    //  dummy = `Variable <b style="color: darkcyan;">${faultyObject}</b> cannot have the name of a <b>Key</b> `;
    dummy = `Variable "${faultyObject}" cannot have the name of a Key `;
    return dummy;
  }

  // Object cannot be empty or ?  ----------------------------------------------
  if (
    filteredOntologizerLinesArray.some(
      (item) => item.ontoObject === "" || item.ontoObject === "?"
    )
  ) {
    dummy = `The Object cannot be empty or "?"`;
    //  dummy = `The Object cannot be empty or <span style="color: darkcyan;">"?"</span>`;
    return dummy;
  }

  // Subject and Object bust be different  ----------------------------------------------
  const matchingItem = filteredOntologizerLinesArray.find(
    (item) => item.ontoObject === item.ontoSubject
  );
  if (matchingItem) {
    //  dummy = `The <b>Object</b> <span style="color: darkcyan;">${matchingItem.ontoObject}</span> cannot be the same as the <b>Subject</b>.`;
    dummy = `The Object "${matchingItem.ontoObject}" cannot be the same as the Subject`;
    return dummy;
  }

  // Subject must be jsonKey or variable ---------------------------------------------------
  isValid = ontologizerLinesArray.every((item) => {
    if (item.ontoObject.startsWith("?")) {
      const ontoObjectWithoutQuestionMark = item.ontoObject.substring(1); // Remove the "?"
      return ontologizerLinesArray.some(
        (otherItem) => otherItem.jsonKey === ontoObjectWithoutQuestionMark
      );
    }
    return true; // If ontoObject does not start with "?", it's valid
  });

  // Subject must be the key, or variable  ----------------------------------------------
  if (
    filteredOntologizerLinesArray.some(
      (item) => item.ontoSubject !== jk && !item.ontoSubject.startsWith("?")
    )
  ) {
    let dummy = `Subject must be "${jk}" or a variable `;
    return dummy;
  }

  // If subject is variable, then variable must exist in an object of this key -------------
  isValid = filteredOntologizerLinesArray.every((item) => {
    if (item.ontoSubject.startsWith("?")) {
      const hasMatchingObject = filteredOntologizerLinesArray.some(
        (otherItem) =>
          otherItem !== item && otherItem.ontoObject === item.ontoSubject
      );
      if (!hasMatchingObject) {
        faultySubject = item.ontoSubject;
        return false;
      }
    }
    return true; // If ontoSubject does not start with "?", it's valid
  });
  if (!isValid) {
    //  let dummy = `<b>Subject</b> variable <b style="color: darkcyan;">${faultySubject}</b> must have a matching <b>Object</b> `;
    let dummy = `Subject variable "${faultySubject}" must have a matching Object `;
    return dummy;
  }

  // Same lines cannot exist ----------------------------------------------------------------
  const seenTuples = new Set();

  for (const item of filteredOntologizerLinesArray) {
    const tuple = `${item.ontoSubject}-${item.ontoPredicate}-${item.ontoObject}`;
    if (seenTuples.has(tuple)) {
      isValid = false;
      break;
    }
    seenTuples.add(tuple);
  }
  if (!isValid) {
    //  let dummy = `<b>Subject - Predicate - Object</b> can't be duplicate `;
    let dummy = `"Subject - Predicate - Object" can't be duplicate `;
    return dummy;
  }

  // variable already in use? ----------------------------------------------------------------
  isValid = ontologizerLinesArray.every((item) => {
    if (item.ontoObject.startsWith("?")) {
      const hasMatchingVariable = ontologizerLinesArray.some(
        (otherItem) =>
          otherItem !== item && otherItem.ontoObject === item.ontoObject
      );
      if (hasMatchingVariable) {
        faultyObject = item.ontoObject;
        isValid = false;
        return false;
      }
    }
    return true;
  });
  if (!isValid) {
    //  let dummy = ` Variable <b style="color: darkcyan;">${faultyObject}</b> already exists! `;
    let dummy = ` Variable "${faultyObject}" already exists! `;
    return dummy;
  }

  // Variables of variables are not allowed ----------------------------------------------
  if (
    filteredOntologizerLinesArray.some(
      (item) =>
        item.ontoObject.startsWith("?") && item.ontoSubject.startsWith("?")
    )
  ) {
    dummy = `Multilevel variables are not allowed`;
    return dummy;
  }

  return dummy;
};
// --------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// Before copying to clipboard see if annotations are complete
//
export const handleValidAnnotations = (
  ontologizerLinesAnnotationsArray: OntologizerLinesAnnotationsDataType[]
) => {
  let dummy = "";

  // value cannot be empty   ----------------------------------------------
  if (ontologizerLinesAnnotationsArray.some((item) => item.value === "")) {
    dummy = `The value of annotatioons cannot be empty`;
  }

  return dummy;
};
// --------------------------------------------------------------------------------------------

/*



interface ContextLine {
  id: number;
  predicate: string;
  value: string;
}

interface OntologizerLine {
  id: number;
  jsonKey: string;
  ontoSubject: string;
  ontoPredicate: string;
  ontoObject: string;
}

type PrefixSemanticsDataType = {
  key: string;
  value: string;
};

export async function isValidUrl(url: string) {
  try {
    const response = await fetch(url);
    console.log("-----------------------------------------");
    console.log(response);
    console.log("-----------------------------------------");
    if (response.status !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    // An error indicates that the URL is invalid
    console.error(error);
    return false;
  }
}

// verify if previous lines of an array have null elements to prevent creation of new line
// and a lot of other restrictions
export function validOntologizerLine(
  jsonKey: string,
  OntologizerArray: OntologizerLine[]
): boolean {
  const jsonKeyLines: OntologizerLine[] = OntologizerArray.filter(
    (line) => line.jsonKey === jsonKey
  );

  for (let i = 0; i < jsonKeyLines.length; i++) {
    if (jsonKeyLines[i].ontoSubject === "") return false;
    if (jsonKeyLines[i].ontoObject === "" || jsonKeyLines[i].ontoObject === "?")
      return false;

    // subject is jsonkey or new variable
    if (
      jsonKeyLines[i].ontoSubject !== jsonKeyLines[i].jsonKey &&
      jsonKeyLines[i].ontoSubject[0] !== "?"
    )
      return false;

    // No object variable for subject variable
    if (
      jsonKeyLines[i].ontoSubject[0] === "?" &&
      jsonKeyLines[i].ontoObject[0] === "?"
    )
      return false;

    // subject is new variable not declared before
    if (jsonKeyLines[i].ontoSubject[0] === "?") {
      var objectExists = false;
      for (let j = 0; j < i; j++) {
        if (jsonKeyLines[i].ontoSubject === jsonKeyLines[j].ontoObject) {
          objectExists = true;
          break;
        }
      }
      if (!objectExists) return false;
    }
    // Test if object variable is used in other key
    if (jsonKeyLines[i].ontoObject[0] === "?")
      if (
        OntologizerArray.some(
          (line) =>
            line.jsonKey !== jsonKeyLines[i].jsonKey &&
            line.ontoObject === jsonKeyLines[i].ontoObject
        )
      )
        return false;
  }

  return true;
}

// Combine arrays of prefix-namespace and remove duplicates
export function createArrayNoDuplicates(
  arr1: PrefixSemanticsDataType[], // new array of prefixes
  arr2: PrefixSemanticsDataType[] // array in context
) {
  arr1.forEach((item) => {
    let keyExist = arr2.some((x) => x.key === item.key);
    if (!keyExist) {
      arr2.push(item);
    }
  });

  return arr2;
}

// build semantic specification structure
export function buildSemanticJson(
  prefixes: PrefixSemanticsDataType[],
  context: OntologizerLine[],
  annotations: ContextLine[]
) {
  var contextArr = [...context];
  var prefixArr = [...prefixes];
  var annotationsArr = [...annotations];

  var text_prefixes = '"@semaptic": {\n   "@prefixes": { \n';
  var text_context = '   "@context": { \n';
  var text_annotations = '   "@annotations": { \n';

  // get prefixes from contextArr

  // prefixes ---------------------------------------------------
  prefixArr.forEach((line) => {
    let prefixExists = contextArr.some(
      (item) =>
        item.ontoPredicate.startsWith(line.key + ":") ||
        item.ontoObject.startsWith(line.key + ":")
    );
    if (prefixExists)
      text_prefixes =
        text_prefixes + `      "${line.key}" : "${line.value}",\n`;
  });

  // context ----------------------------------------------------
  // sort array
  contextArr.sort((a, b) => {
    // First, compare by jsonKey
    if (a.jsonKey < b.jsonKey) return -1;
    if (a.jsonKey > b.jsonKey) return 1;
    // If jsonKeys are equal, compare by id
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    // If both jsonKey and id are equal
    return 0;
  });
  var dummy = "zzz"; //
  contextArr.forEach((line) => {
    if (dummy !== line.jsonKey) {
      if (dummy === "zzz")
        text_context = text_context + `      "${line.ontoSubject}": {\n`;
      else
        text_context =
          text_context.slice(0, -2) +
          `\n      },\n      "${line.ontoSubject}": {\n`;

      dummy = line.jsonKey;
    }
    if (line.ontoSubject[0] === "?") {
      text_context =
        text_context +
        `         "${line.ontoSubject}": {"${line.ontoPredicate}": "${line.ontoObject}"},\n`;
    } else {
      text_context =
        text_context +
        `         "${line.ontoPredicate}": "${line.ontoObject}",\n`;
    }
  });

  // Annotations -------------------------------------------------
  annotationsArr.forEach((line) => {
    text_annotations =
      text_annotations + `      "${line.predicate}": "${line.value}",\n`;
  });

  //  text_prefixes = text_prefixes + "   },\n";
  text_prefixes = text_prefixes.slice(0, -2) + "\n   },\n";
  text_context = text_context.slice(0, -2) + "\n      }\n   },\n";
  text_annotations = text_annotations.slice(0, -2) + "\n   }\n}";

  return text_prefixes + text_context + text_annotations;
}



*/
