interface IOntologiesDescription {
  ontoLink: string;
  description: string;
  link: string;
}

interface IOntologies {
  [key: string]: IOntologiesDescription;
}

export const ONTOLOGIES: IOntologies = {
  encom: {
    ontoLink: "https://semanticweb.inesctec.pt/ontologies/encom/ontology.ttl",
    description: "EMPOWER ENCOM Ontology for Energy Communities",
    link: "https://semanticweb.inesctec.pt/ontologies/encom/index.html",
  },
  time: {
    ontoLink:
      //      "https://enterpriseintegrationlab.github.io/icity/Time/doc/ontology.ttl",
      "https://www.w3.org/2006/time",
    description: "Ontology to capture concepts related to time",
    link: "https://www.w3.org/TR/owl-time/",
  },
  saref: {
    ontoLink: "https://saref.etsi.org/core/v3.1.1/saref.rdf",
    description: "SAREF: the Smart Applications REFerence ontology",
    link: "https://saref.etsi.org/core/v3.1.1/",
  },
  s4ener: {
    ontoLink: "https://saref.etsi.org/saref4ener/v1.1.2/saref4ener.rdf",
    description: "SAREF4ENER: extension for the Energy domain",
    link: "https://saref.etsi.org/saref4ener/v1.1.2/",
  },
  s4envi: {
    ontoLink: "https://saref.etsi.org/saref4envi/v1.1.2/saref4envi.rdf",
    description: "SAREF4ENVI: extension for the Environment domain",
    link: "https://saref.etsi.org/saref4envi/v1.1.2/",
  },
  s4bldg: {
    ontoLink: "https://saref.etsi.org/saref4ener/v1.1.2/saref4ener.rdf",
    description: "SAREF4BLDG: extension for the Building domain",
    link: "https://saref.etsi.org/saref4bldg/v1.1.2/",
  },
  s4city: {
    ontoLink: "https://saref.etsi.org/saref4city/v1.1.2/saref4city.rdf",
    description: "SAREF4CITY: extension for the Smart Cities domain",
    link: "https://saref.etsi.org/saref4city/v1.1.2/",
  },
  s4inma: {
    ontoLink: "https://saref.etsi.org/saref4inma/v1.1.2/saref4inma.rdf",
    description:
      "SAREF4INMA: extension for the Industry and Manufacturing domains",
    link: "https://saref.etsi.org/saref4inma/v1.1.2/",
  },
  s4agri: {
    ontoLink: "https://saref.etsi.org/saref4agri/v1.1.2/saref4agri.rdf",
    description:
      "SAREF4AGRI: extension for the Smart Agriculture and Food Chain domains",
    link: "https://saref.etsi.org/saref4agri/v1.1.2/",
  },
  s4auto: {
    ontoLink: "https://saref.etsi.org/saref4auto/v1.1.1/saref4auto.rdf",
    description: "SAREF4AUTO: extension for the Automotive domain",
    link: "https://saref.etsi.org/saref4auto/v1.1.1/",
  },
  s4ehaw: {
    ontoLink: "https://saref.etsi.org/saref4ehaw/v1.1.1/saref4ehaw.rdf",
    description: "SAREF4EHAW: extension for the eHealth/Ageing-well domain",
    link: "https://saref.etsi.org/saref4ehaw/v1.1.1/",
  },
  s4wear: {
    ontoLink: "https://saref.etsi.org/saref4wear/v1.1.1/saref4wear.rdf",
    description: "SAREF4WEAR: extension for the Wearables domain",
    link: "https://saref.etsi.org/saref4wear/v1.1.1/",
  },
  s4watr: {
    ontoLink: "https://saref.etsi.org/saref4watr/v1.1.1/saref4watr.rdf",
    description: "SAREF4WATR: extension for the Water domain",
    link: "https://saref.etsi.org/saref4watr/v1.1.1/",
  },
  s4lift: {
    ontoLink: "https://saref.etsi.org/saref4lift/v1.1.1/saref4lift.rdf",
    description: "SAREF4LIFT: extension for the Smart Lifts domain",
    link: "https://saref.etsi.org/saref4lift/v1.1.1/",
  },
  s4grid: {
    ontoLink: "https://saref.etsi.org/saref4grid/v1.1.1/saref4grid.rdf",
    description: "SAREF4GRID: extension for the Smart Grid domain",
    link: "https://saref.etsi.org/saref4grid/v1.1.1/",
  },
  bot: {
    ontoLink: "https://w3c-lbd-cg.github.io/bot/bot.ttl",
    description: "Building Topology Ontology",
    link: "https://w3c-lbd-cg.github.io/bot/bot.ttl",
  },
};
