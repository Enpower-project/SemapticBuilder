import { UUID } from "crypto";

export type GlobalDataType = {
  json: string;
  jsonKeys: string[]; // Array of strings
  keys: string;
  activeButtonKey: string;
  jsonMap: string;
  gpMap: string;
  csvMap: string;
  xmlMap: string;
  showGraph: boolean;
  showGraphGP: boolean;
  textDigraph: string;
  textDigraphGP: string;
};

export type OntologizerLinesDataType = {
  id: string;
  jsonKey: string;
  ontoSubject: string;
  ontoPredicate: string;
  ontoObject: string;
};

export type OntologizerLinesAnnotationsDataType = {
  id: string;
  predicate: string;
  value: string;
};

// ontology prefixes
export type PrefixSemanticsDataType = {
  key: string; // prefix
  value: string; // namespace
};

// Data property
export type OntoDataPropertyDataType = {
  ontoDataPropertyKey: string;
  ontoDataPropertyName: string;
  ontoDataPropertyLabel: string;
  ontoDataPropertyComment: string;
};

// Object property
export type OntoObjectPropertyDataType = {
  ontoObjectPropertyKey: string;
  ontoObjectPropertyName: string;
  ontoObjectPropertyLabel: string;
  ontoObjectPropertyComment: string;
  //range: string;
  //domain: string;
  //equivalentTo: string;
};
