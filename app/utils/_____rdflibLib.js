import * as $rdf from 'rdflib';

// Convert full IRI into format namespace:class
function extractSubstring(inputString, nameSpaces) {
  let foundSubstring = null;
  for (const subArray of nameSpaces) {
    const substring = subArray[1];
    if (inputString.includes(substring)) {
      foundSubstring =
        subArray[0] + ':' + inputString.substring(substring.length);
      break;
    }
  }

  if (!foundSubstring) {
    foundSubstring = inputString;
  }

  return foundSubstring;
}

export const classesAndSubclasses = () => {
  const rdfStore = $rdf.graph();
  const fetcher = new $rdf.Fetcher(rdfStore);

  const xArrClass = [];

  const ontologyUrl = 'https://saref.etsi.org/core/v3.1.1/saref.rdf';

  fetcher
    .load(ontologyUrl)
    .then(() => {
      const allClasses = new Set();

      const RDFS = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
      const OWL = $rdf.Namespace('http://www.w3.org/2002/07/owl#');
      const LANG = 'en';

      // Helper function to check if a node is a valid URI
      const isValidURI = (node) => {
        return node && node.startsWith('http');
      };

      const nameSpaces = Object.entries(rdfStore.namespaces);
      console.log(nameSpaces);

      // Extract all classes, excluding blank nodes
      rdfStore
        .statementsMatching(
          undefined,
          $rdf.sym('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          OWL('Class')
        )
        .forEach((statement) => {
          const cls = statement.subject.value;
          if (isValidURI(cls)) {
            allClasses.add(cls);
          }
        });

      // Extract subclasses and their superclasses, excluding blank nodes
      rdfStore
        .statementsMatching(undefined, RDFS('subClassOf'), undefined)
        .forEach((statement) => {
          const subclass = statement.subject.value;
          const superclass = statement.object.value;

          if (isValidURI(subclass)) {
            allClasses.add(subclass);
          }
          if (isValidURI(superclass)) {
            allClasses.add(superclass);
          }
        });

      // Convert the set to an array and sort it alphabetically
      const sortedClasses = Array.from(allClasses).sort();
      console.log('sortedClasses');
      console.log(sortedClasses);

      // Iterate over array and over rdfStore to get label and comment ----------------------
      sortedClasses.forEach((xClass) => {
        const xClassNode = $rdf.namedNode(xClass);
        var xLabel = '';
        var xComment = '';
        rdfStore
          .statementsMatching(xClassNode, RDFS('label'), undefined)
          .forEach((statement) => {
            if (
              statement.object.language === LANG ||
              statement.object.language === '' ||
              statement.object.language === null
            ) {
              xLabel = statement.object.value;
            }
          });
        rdfStore
          .statementsMatching(xClassNode, RDFS('comment'), undefined)
          .forEach((statement) => {
            if (
              statement.object.language === LANG ||
              statement.object.language === '' ||
              statement.object.language === null
            ) {
              xComment = statement.object.value;
            }
          });

        if (xLabel !== '' || xComment !== '') {
          xArrClass.push({
            ontoClassName: extractSubstring(xClass, nameSpaces),
            ontoClassLabel: xLabel,
            ontoClassComment: xComment,
          });
        }
      });
    })
    .catch((err) => {
      console.error('Error loading ontology:', err);
    });
};

/* 
export const classesandsubclasses = () => {
  const rdfStore = $rdf.graph();
  const fetcher = new $rdf.Fetcher(rdfStore);

  const ontologyUrl = 'https://saref.etsi.org/core/v3.1.1/saref.rdf';

  fetcher
    .load(ontologyUrl)
    .then(() => {
      const classes = new Set();
      const subclasses = new Set();

      const RDFS = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
      const OWL = $rdf.Namespace('http://www.w3.org/2002/07/owl#');

      rdfStore
        .statementsMatching(undefined, RDFS('subClassOf'), undefined)
        .forEach((statement) => {
          subclasses.add({
            subclass: statement.subject.value,
            superclass: statement.object.value,
          });
          classes.add(statement.subject.value);
          classes.add(statement.object.value);
        });

      rdfStore
        .statementsMatching(
          undefined,
          $rdf.sym('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          OWL('Class')
        )
        .forEach((statement) => {
          classes.add(statement.subject.value);
        });

      console.log('Classes:', Array.from(classes));
      console.log('Subclasses:', Array.from(subclasses));
    })
    .catch((err) => {
      console.error('Error loading ontology:', err);
    });
};



*/
