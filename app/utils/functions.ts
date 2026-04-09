//
// Copy to clipboard the content of a DOM element

import { OntologizerLinesDataType } from "./interfaces";

//
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

//
// Get maximum id of array with a field "id"
//
export const getMaxId = (arr: OntologizerLinesDataType[]) => {
  return arr.reduce((max, item) => (item.id > max ? item.id : max), arr[0].id);
};
