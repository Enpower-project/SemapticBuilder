// <ShowObjectPropertiesStats propertyStats={hoveredPropertyName} />

import { useGlobalContextOntoObjectProperty } from "@/app/context/OntoObjectPropertyContext";

// Show Object properties from active ontology
const ShowObjectProperties = () => {
  const { ontoObjectPropertyArray, setOntoObjectPropertyArray } =
    useGlobalContextOntoObjectProperty();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-xs">
        <div className="m-1 h-7 w-48 text-center bg-gray-100 flex items-center justify-center">
          Object Property
        </div>
        <div className="m-1 ml-0 h-7 w-48 text-center bg-gray-100 flex items-center justify-center">
          Label
        </div>
        <div className="m-1 ml-0 h-7 w-[900px] text-center bg-gray-100 flex items-center justify-center">
          Comment
        </div>
      </div>
      <div className="h-[432px] overflow-y-auto gap-1">
        {ontoObjectPropertyArray.map((item, index) => (
          <div key={index} className="flex hover:text-blue-600">
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoObjectPropertyName}
            </div>
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoObjectPropertyLabel}
            </div>
            <div className="ml-1 mt-1 pl-1 w-[900px] border-b text-xs">
              {item.ontoObjectPropertyComment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowObjectProperties;

/*

import { useGlobalContextOntoObjectProperty } from "@/app/context/OntoObjectPropertyContext";
import { useState } from "react";
//import ShowObjectPropertiesStats from "./ShowObjectPropertiesStats";
import { OntoObjectPropertyDataType } from "@/app/utils/interfaces";

// Show Object properties from active ontology
const ShowObjectProperties = () => {
  const { ontoObjectPropertyArray, setOntoObjectPropertyArray } =
    useGlobalContextOntoObjectProperty();

  const [hoveredPropertyName, setHoveredPropertyName] =
    useState<OntoObjectPropertyDataType | null>(null);

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-row text-xs">
        <div className="m-1 h-7 w-48 text-center bg-gray-100 flex items-center justify-center">
          Object Property
        </div>
        <div className="m-1 ml-0 h-7 w-48 text-center bg-gray-100 flex items-center justify-center">
          Label
        </div>
        <div className="m-1 ml-0 h-7 w-[900px] text-center bg-gray-100 flex items-center justify-center">
          Comment
        </div>
      </div>
      <div className="h-[432px] overflow-y-auto gap-1 ">
        {ontoObjectPropertyArray.map((item, index) => (
          <div key={index} className="flex hover:text-blue-600">
            <div
              onMouseEnter={() => setHoveredPropertyName(item)}
              onMouseLeave={() => setHoveredPropertyName(null)}
              className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs"
            >
              {item.ontoObjectPropertyName}
            </div>
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoObjectPropertyLabel}
            </div>
            <div className="ml-1 mt-1 pl-1 w-[900px] border-b text-xs">
              {item.ontoObjectPropertyComment}
            </div>
            {hoveredPropertyName &&
              hoveredPropertyName.ontoObjectPropertyName ===
                item.ontoObjectPropertyName && ( // Show comment on hover
                <div className="absolute top-0 right-0 h-[480px] w-[900px] bg-white text-xs border-2 z-50">
                  <div className="m-1 mt-4 h-7 w-[888px] text-center bg-gray-200 flex items-center justify-center">
                    {hoveredPropertyName.ontoObjectPropertyName}
                  </div>
                  <ShowObjectPropertiesStats {...item} />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowObjectProperties;

*/
