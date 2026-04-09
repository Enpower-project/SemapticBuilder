import { useGlobalContextOntoDataProperty } from "@/app/context/OntoDataPropertyContext";

// Show Data Properties from active ontology
const ShowDataProperties = () => {
  const { ontoDataPropertyArray, setOntoDataPropertyArray } =
    useGlobalContextOntoDataProperty();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-xs">
        <div className="m-1 h-7  w-48 text-center bg-gray-100 flex items-center justify-center">
          Data Property
        </div>
        <div className="m-1 ml-0 h-7  w-48 text-center bg-gray-100 flex items-center justify-center">
          Label
        </div>
        <div className="m-1 ml-0 h-7 w-[900px] text-center bg-gray-100 flex items-center justify-center">
          Comment
        </div>
      </div>
      <div className="h-[432px] overflow-y-auto gap-1">
        {ontoDataPropertyArray.map((item, index) => (
          <div key={index} className="flex gap-1 hover:text-blue-600">
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoDataPropertyName}
            </div>
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoDataPropertyLabel}
            </div>
            <div className="ml-1 mt-1 pl-1 w-[900px] border-b text-xs">
              {item.ontoDataPropertyComment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShowDataProperties;

/*


  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-xs">
        <div className="m-1 h-7  w-48 text-center bg-gray-100 flex items-center justify-center">
          Data Property
        </div>
        <div className="m-1 ml-0 h-7  w-48 text-center bg-gray-100 flex items-center justify-center">
          Label
        </div>
        <div className="m-1 ml-0 h-7 w-[900px] text-center bg-gray-100 flex items-center justify-center">
          Comment
        </div>
      </div>
      <div className="h-[432px] overflow-y-auto gap-1">
        {ontoDataPropertyArray.map((item, index) => (
          <div key={index} className="flex gap-1 hover:text-blue-600">
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoDataPropertyName}
            </div>
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoDataPropertyLabel}
            </div>
            <div className="ml-1 mt-1 pl-1 w-[900px] border-b text-xs">
              {item.ontoDataPropertyComment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

*/
