const RDFLib = require('rdflib');
import { Store, NamedNode } from 'rdflib';

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

// order array by property name (field)
function sortArrayByProperty(array, property) {
  return array.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  });
}

// Extract classes, labels and comments from rdfStore (with loaded ontology)
function extractClasses(rdfStore) {
  const xSetClass = new Set();
  const xArrClass = [];

  // Define RDF namespaces
  const RDF = RDFLib.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const RDFS = RDFLib.Namespace('http://www.w3.org/2000/01/rdf-schema#');
  const OWL = RDFLib.Namespace('http://www.w3.org/2002/07/owl#');
  const LANG = 'en';

  // Extract namespaces from rdfStore
  const nameSpaces = Object.entries(rdfStore.namespaces);
  nameSpaces.push(['time', 'http://www.w3.org/2006/time#']);

  // Iterate over all statements in the store to get classes
  rdfStore
    .statementsMatching(undefined, RDF('type'), OWL('Class'))
    .forEach((statement) => {
      const classURI = statement.subject.value;
      if (classURI.startsWith('http')) {
        xSetClass.add(classURI);
      }
    });

  console.log(xSetClass);

  // Iterate over set and over store to get label and comment
  xSetClass.forEach((xClass) => {
    const xClassNode = RDFLib.namedNode(xClass);
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

    xArrClass.push({
      ontoClassName: extractSubstring(xClass, nameSpaces),
      ontoClassLabel: xLabel,
      ontoClassComment: xComment,
    });
  });

  const ontoClassArray = xArrClass.map((item, index) => ({
    ontoClassKey: index.toString(),
    ontoClassName: item.ontoClassName,
    ontoClassLabel: item.ontoClassLabel,
    ontoClassComment: item.ontoClassComment,
  }));

  return sortArrayByProperty(ontoClassArray, 'ontoClassName');
}
export { extractClasses };

// Extract Object properties, labels and comments from rdfStore (with loaded ontology)
function extractObjectProperties(rdfStore) {
  const xSetObjectProperty = new Set();
  const xArrObjectProperty = [];

  console.log(
    '************************ extractObjectProperties *********************'
  );

  // Define RDF namespaces
  const RDF = RDFLib.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const RDFS = RDFLib.Namespace('http://www.w3.org/2000/01/rdf-schema#');
  const OWL = RDFLib.Namespace('http://www.w3.org/2002/07/owl#');
  const LANG = 'en';

  // Extract namespaces from rdfStore
  const nameSpaces = Object.entries(rdfStore.namespaces);
  nameSpaces.push(['time', 'http://www.w3.org/2006/time#']);
  // console.log(nameSpaces[0][0]);

  console.log(rdfStore);
  // Iterate over all statements in the store to get classes
  rdfStore
    .statementsMatching(undefined, RDF('type'), OWL('ObjectProperty'))
    .forEach((statement) => {
      const ObjectPropertyURI = statement.subject.value;
      if (ObjectPropertyURI.startsWith('http')) {
        xSetObjectProperty.add(ObjectPropertyURI);
      }
    });

  // Iterate over set and over store to get label and comment
  xSetObjectProperty.forEach((xOProp) => {
    //    console.log('xoprop...........................', xOProp);
    const xObjectPropertyNode = RDFLib.namedNode(xOProp);
    var xLabel = '';
    var xComment = '';
    //    var xRange = '';
    //    var xDomain = '';
    //    var xEquivalentTo = '';
    rdfStore
      .statementsMatching(xObjectPropertyNode, RDFS('label'), undefined)
      .forEach((statement) => {
        if (
          statement.object.language === LANG ||
          statement.object.language === '' ||
          statement.object.language === null
        ) {
          xLabel = statement.object.value;
          //          console.log('Object Property:', xObjectPropertyNode);
          //          console.log('Label:', xLabel);
        }
      });
    rdfStore
      .statementsMatching(xObjectPropertyNode, RDFS('comment'), undefined)
      .forEach((statement) => {
        if (
          statement.object.language === LANG ||
          statement.object.language === '' ||
          statement.object.language === null
        ) {
          xComment = statement.object.value;
          //          console.log('Comment:', xComment);
        }
      });
    /*
    // range
    console.log('........start range...........');
    var xRangeTemp = '';
    rdfStore
      .statementsMatching(xObjectPropertyNode, RDFS('range'), undefined)
      .forEach((statement) => {
        if (statement.object.termType === 'BlankNode') {
          rdfStore
            .statementsMatching(undefined, OWL('unionOf'), undefined) // OWL('unionOf')
            .forEach((stat) => {
              if (stat.subject.value === statement.object.value) {
                stat.object.elements.forEach((element) => {
                  xRangeTemp +=
                    extractSubstring(element.value, nameSpaces) + ' | ';
                });
              }
            });
          xRangeTemp = '( ' + xRangeTemp.slice(0, -3) + ' )';
        } else {
          xRange +=
            extractSubstring(statement.object.value, nameSpaces) + ' & ';
        }
      });
    xRange = xRange + xRangeTemp;
    if (!xRangeTemp) xRange = xRange.slice(0, -3);
    // domain
    console.log('........start domain...........');
    var xDomainTemp = '';
    rdfStore
      .statementsMatching(xObjectPropertyNode, RDFS('domain'), undefined)
      .forEach((statement) => {
        if (statement.object.termType === 'BlankNode') {
          console.log('blank..................', statement);
          rdfStore
            .statementsMatching(undefined, OWL('unionOf'), undefined) // OWL('unionOf')
            .forEach((stat) => {
              if (stat.subject.value === statement.object.value) {
                stat.object.elements.forEach((element) => {
                  xDomainTemp +=
                    extractSubstring(element.value, nameSpaces) + ' | ';
                });
              }
            });
          xDomainTemp = '( ' + xDomainTemp.slice(0, -3) + ' )';
        } else {
          xDomain +=
            extractSubstring(statement.object.value, nameSpaces) + ' & ';
        }
      });
    xDomain = xDomain + xDomainTemp;
    if (!xDomainTemp) xDomain = xDomain.slice(0, -3);
    // equivalent property
    console.log('........start equivalent property...........');
    rdfStore
      .statementsMatching(
        xObjectPropertyNode,
        OWL('equivalentProperty'),
        undefined
      )
      .forEach((stat) => {
        xEquivalentTo +=
          extractSubstring(stat.object.value, nameSpaces) + ' & ';
        console.log(stat);
      });
    xEquivalentTo = xEquivalentTo.slice(0, -3);
*/
    //    if (xLabel !== '' || xComment !== '') {
    xArrObjectProperty.push({
      ontoObjectPropertyName: extractSubstring(xOProp, nameSpaces),
      ontoObjectPropertyLabel: xLabel,
      ontoObjectPropertyComment: xComment,
      //        range: xRange,
      //        domain: xDomain,
      //        equivalentTo: xEquivalentTo,
    });
    //    }
  });

  const ontoObjectPropertyArray = xArrObjectProperty.map((item, index) => ({
    ontoObjectPropertyKey: index.toString(),
    ontoObjectPropertyName: item.ontoObjectPropertyName,
    ontoObjectPropertyLabel: item.ontoObjectPropertyLabel,
    ontoObjectPropertyComment: item.ontoObjectPropertyComment,
    range: item.range,
    domain: item.domain,
    equivalentTo: item.equivalentTo,
  }));

  return sortArrayByProperty(ontoObjectPropertyArray, 'ontoObjectPropertyName');
}
export { extractObjectProperties };

// Extract Data properties, labels and comments from rdfStore (with loaded ontology)
function extractDataProperties(rdfStore) {
  const xSetDataProperty = new Set();
  const xArrDataProperty = [];

  console.log(
    '************************ extractDataProperties *********************'
  );

  // Define RDF namespaces
  const RDF = RDFLib.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const RDFS = RDFLib.Namespace('http://www.w3.org/2000/01/rdf-schema#');
  const OWL = RDFLib.Namespace('http://www.w3.org/2002/07/owl#');
  const LANG = 'en';

  // Extract namespaces from rdfStore
  const nameSpaces = Object.entries(rdfStore.namespaces);
  nameSpaces.push(['time', 'http://www.w3.org/2006/time#']);

  // Iterate over all statements in the store to get classes
  rdfStore
    .statementsMatching(undefined, RDF('type'), OWL('DatatypeProperty'))
    .forEach((statement) => {
      const DataPropertyURI = statement.subject.value;
      if (DataPropertyURI.startsWith('http')) {
        xSetDataProperty.add(DataPropertyURI);
      }
    });

  // Iterate over set and over store to get label and comment
  xSetDataProperty.forEach((xDProp) => {
    const xDataPropertyNode = RDFLib.namedNode(xDProp);
    var xLabel = '';
    var xComment = '';
    rdfStore
      .statementsMatching(xDataPropertyNode, RDFS('label'), undefined)
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
      .statementsMatching(xDataPropertyNode, RDFS('comment'), undefined)
      .forEach((statement) => {
        if (
          statement.object.language === LANG ||
          statement.object.language === '' ||
          statement.object.language === null
        ) {
          xComment = statement.object.value;
        }
      });

    //    if (xLabel !== '' || xComment !== '') {
    xArrDataProperty.push({
      ontoDataPropertyName: extractSubstring(xDProp, nameSpaces),
      ontoDataPropertyLabel: xLabel,
      ontoDataPropertyComment: xComment,
    });
    //    }
  });

  const ontoDataPropertyArray = xArrDataProperty.map((item, index) => ({
    ontoDataPropertyKey: index.toString(),
    ontoDataPropertyName: item.ontoDataPropertyName,
    ontoDataPropertyLabel: item.ontoDataPropertyLabel,
    ontoDataPropertyComment: item.ontoDataPropertyComment,
  }));

  return sortArrayByProperty(ontoDataPropertyArray, 'ontoDataPropertyName');
}
export { extractDataProperties };

// Extract Individual, labels and comments from rdfStore (with loaded ontology)
function extractIndividuals(rdfStore) {
  const xSetIndividual = new Set();
  const xArrIndividual = [];

  console.log(
    '************************ extractIndividuals *********************'
  );

  // Define RDF namespaces
  const RDF = RDFLib.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const RDFS = RDFLib.Namespace('http://www.w3.org/2000/01/rdf-schema#');
  const OWL = RDFLib.Namespace('http://www.w3.org/2002/07/owl#');
  const LANG = 'en';

  // Extract namespaces from rdfStore
  const nameSpaces = Object.entries(rdfStore.namespaces);
  nameSpaces.push(['time', 'http://www.w3.org/2006/time#']);

  // Iterate over all statements in the store to get classes
  rdfStore
    .statementsMatching(undefined, RDF('type'), OWL('NamedIndividual'))
    .forEach((statement) => {
      const IndividualURI = statement.subject.value;
      if (IndividualURI.startsWith('http')) {
        xSetIndividual.add(IndividualURI);
      }
    });

  // Iterate over set and over store to get label and comment
  xSetIndividual.forEach((xInd) => {
    const xIndividualNode = RDFLib.namedNode(xInd);
    var xLabel = '';
    var xComment = '';
    rdfStore
      .statementsMatching(xIndividualNode, RDFS('label'), undefined)
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
      .statementsMatching(xIndividualNode, RDFS('comment'), undefined)
      .forEach((statement) => {
        if (
          statement.object.language === LANG ||
          statement.object.language === '' ||
          statement.object.language === null
        ) {
          xComment = statement.object.value;
        }
      });

    //    if (xLabel !== '' || xComment !== '') {
    xArrIndividual.push({
      ontoIndividualName: extractSubstring(xInd, nameSpaces),
      ontoIndividualLabel: xLabel,
      ontoIndividualComment: xComment,
    });
    //    }
  });

  const ontoIndividualArray = xArrIndividual.map((item, index) => ({
    ontoIndividualKey: index.toString(),
    ontoIndividualName: item.ontoIndividualName,
    ontoIndividualLabel: item.ontoIndividualLabel,
    ontoIndividualComment: item.ontoIndividualComment,
  }));

  return sortArrayByProperty(ontoIndividualArray, 'ontoIndividualName');
}
export { extractIndividuals };

// Extract namespaces
function extractNamespaces(rdfStore) {
  console.log(
    '************************ extract namespaces *********************'
  );

  // Extract namespaces from rdfStore
  const nameSpaces = Object.entries(rdfStore.namespaces);

  let xArrNamespaces = [];
  for (let [key, value] of nameSpaces) {
    xArrNamespaces.push({ key, value });
  }

  console.log(nameSpaces);
  console.log(
    '************************ extract namespaces *********************'
  );
  return xArrNamespaces;
  /*
  const ontoPrefixNamespacesArr = xArrNamespaces.map((item, index) => ({
    ontoIndividualKey: index.toString(),
    ontoIndividualName: item.ontoIndividualName,
    ontoIndividualLabel: item.ontoIndividualLabel,
    ontoIndividualComment: item.ontoIndividualComment,
  }));

  nameSpaces.forEach(([key, value]) => {
    console.log(`Key: ${key}, Value: ${value}`);
    ontoPrefixNamespacesArr.push({ key, value });
  });
  console.log(
    "************************ extract namespaces *********v************"
  );
  console.log(ontoPrefixNamespacesArr);
  console.log(
    "************************ extract namespaces *********************"
  );
  return ontoPrefixNamespacesArr;*/
}
export { extractNamespaces };
