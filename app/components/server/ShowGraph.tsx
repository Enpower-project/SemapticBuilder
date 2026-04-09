import { useGlobalContext } from "@/app/context/GlobalContext";
import { Graphviz } from "graphviz-react";
import { useRef, useState } from "react";

export default function ShowGraph() {
  const { GlobalData, setGlobalData } = useGlobalContext();
  const graphRef = useRef<HTMLDivElement>(null);
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);

  let textDigraph = GlobalData.textDigraph;
  if (!textDigraph) {
    textDigraph =
      'digraph {  subject -> object [label="predicate" fontsize="8"]; }';
  }

  const GraphvizOptions = { fit: true, height: 572, width: 1824, zoom: true };

  const closeGraphDiv = () => {
    setGlobalData((prevData) => ({
      ...prevData,
      showGraph: false,
    }));
  };

  const copyToClipboardAsPng = () => {
    if (graphRef.current) {
      const svgElement = graphRef.current.querySelector("svg");
      if (svgElement) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);

          canvas.toBlob((blob) => {
            if (blob) {
              const item = new ClipboardItem({ "image/png": blob });
              navigator.clipboard
                .write([item])
                .then(() => {
                  setShowClipboardMessage(true);
                  setTimeout(() => {
                    setShowClipboardMessage(false);
                  }, 1000);
                })
                .catch((err) => {
                  console.error("Failed to copy PNG: ", err);
                });
            }
          }, "image/png");
        };
        img.src = url;
      }
    }
  };

  return (
    <div className="p-4 relative">
      <div ref={graphRef}>
        <Graphviz dot={textDigraph} options={GraphvizOptions} />
      </div>
      <button
        onClick={() => copyToClipboardAsPng()}
        className="absolute top-2 right-12 group"
      >
        <img
          src="/images/copy-clipboard.png"
          className="w-10 h-10 transform scale-50"
        />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Copy to clipboard
        </span>
      </button>
      {showClipboardMessage && (
        <div className="absolute top-10 right-3 text-xs text-green-400">
          Copied to clipboard
        </div>
      )}
      <button
        onClick={() => closeGraphDiv()}
        className="absolute top-2 right-2 group"
      >
        <img src="/images/close.png" className="w-10 h-10 transform scale-60" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Close Graph
        </span>
      </button>
    </div>
  );
}

/*

import { useGlobalContext } from "@/app/context/GlobalContext";
import { Graphviz } from "graphviz-react";
import { useRef, useState, useEffect } from "react";

export default function ShowGraph() {
  const { GlobalData, setGlobalData } = useGlobalContext();
  const graphRef = useRef<HTMLDivElement>(null);
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);

  let textDigraph = GlobalData.textDigraph;
  if (!textDigraph) {
    textDigraph =
      'digraph {  subject -> object [label="predicate" fontsize="8"]; }';
  }

  const GraphvizOptions = { fit: true, height: 572, width: 1824, zoom: true };

  const closeGraphDiv = () => {
    setGlobalData((prevData) => ({
      ...prevData,
      showGraph: false,
    }));
  };

  const copyToClipboardAsJpg = () => {
    if (graphRef.current) {
      const svgElement = graphRef.current.querySelector("svg");
      if (svgElement) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);

          canvas.toBlob((blob) => {
            if (blob) {
              const item = new ClipboardItem({ "image/jpeg": blob });
              navigator.clipboard
                .write([item])
                .then(() => {
                  setShowClipboardMessage(true);
                  setTimeout(() => {
                    setShowClipboardMessage(false);
                  }, 1000);
                })
                .catch((err) => {
                  console.error("Failed to copy JPG: ", err);
                });
            }
          }, "image/jpeg");
        };
        img.src = url;
      } else {
        console.error("SVG element not found.");
      }
    } else {
      console.error("Graph reference is null.");
    }
  };

  useEffect(() => {
    if (!graphRef.current) {
      console.error("Graph reference is not set.");
    }
  }, []);

  return (
    <div className="p-4 relative">
      <div ref={graphRef}>
        <Graphviz dot={textDigraph} options={GraphvizOptions} />
      </div>
      <button
        onClick={() => copyToClipboardAsJpg()}
        className="absolute top-2 right-12 group"
      >
        <img
          src="/images/copy-clipboard.png"
          className="w-10 h-10 transform scale-50"
        />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Copy to clipboard
        </span>
      </button>
      {showClipboardMessage && (
        <div className="absolute top-10 right-3 text-xs text-green-400">
          Copied to clipboard
        </div>
      )}
      <button
        onClick={() => closeGraphDiv()}
        className="absolute top-2 right-2 group"
      >
        <img src="/images/close.png" className="w-10 h-10 transform scale-60" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-green-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Close Graph
        </span>
      </button>
    </div>
  );
}

*/
