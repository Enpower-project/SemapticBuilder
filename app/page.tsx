import GridLayout from "./components/client/GridLayout";

export default function Home() {
  return (
    <div className="flex min-h-screen max-h-screen justify-center bg-gray-400">
      <div className="overflow-x-auto">
        <div className="m-2 min-w-[1900px] max-w-[1900px] shadow-md rounded-lg p-6 bg-gray-100">
          <GridLayout />
        </div>
      </div>
    </div>
  );
}

/*

<div className="flex justify-center bg-gray-100">
<div className="my-2 min-w-[1900px] max-w-[1900px] bg-white shadow-md rounded-lg p-6 overflow-x-auto">



    <div className="flex min-h-screen mas-h-screen justify-center items-center bg-gray-100 overflow-x-auto ">
      <div className="my-2 min-w-[1900px] max-w-[1900px] bg-white shadow-md rounded-lg p-6">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam cumque






"use client";


import NavButton from "./components/client/NavButton";


  function handleButtonClick(id: string) {
    console.log(`Button with ID "${id}" was clicked!`);
  }
        
        <NavButton
          text="Button 1"
          onClick={handleButtonClick}
          customId="button-one"
        />

*/
