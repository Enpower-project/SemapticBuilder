import { useGlobalContextOntoClass } from "@/app/context/OntoClassContext";

// Show Classes from active ontology
//
const ShowClasses = () => {
  const { ontoClassArray, setOntoClassArray } = useGlobalContextOntoClass();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-xs">
        <div className="m-1 h-7 w-48 text-center bg-gray-100 flex items-center justify-center">
          Class
        </div>
        <div className="m-1 ml-0 h-7 w-48 text-center bg-gray-100 flex items-center justify-center">
          Label
        </div>
        <div className="m-1 ml-0 h-7 w-[900px] text-center bg-gray-100 flex items-center justify-center">
          Comment
        </div>
      </div>
      <div className="h-[432px] overflow-y-auto gap-1">
        {ontoClassArray.map((item, index) => (
          <div key={index} className="flex hover:text-blue-600">
            <div className="ml-1 mt-1 pl-1 w-48 truncate border-b text-xs">
              {item.ontoClassName}
            </div>
            <div className="ml-1 mt-1 pl-1 w-48 border-b truncate text-xs">
              {item.ontoClassLabel}
            </div>
            <div className="ml-1 mt-1 pl-1 w-[900px] border-b text-xs">
              {item.ontoClassComment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowClasses;
