import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { Column } from "./model";

interface FieldProps {
  name: string;
  inputList: Column[] | undefined;
  updateCallback: Function;
}

const Field: React.FC<FieldProps> = ({ name, inputList, updateCallback }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Column | null>(null);
  const [syncOn, setSyncOn] = useState(true);

  const options = inputList?.map((col) => col.name);
  const isRequired = true;

  useEffect(() => {
    setSyncOn(selectedOption?.isRequired ? true : false)
  }, [selectedOption])

  const handleSyncToggle = () => {
    if (!isRequired) {
      setSyncOn(selectedOption?.isRequired ? true : false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const CompactView = () => (
    <div className="flex items-center justify-between p-2 border rounded-lg shadow-sm">
      <div className="flex items-center">
        <ChevronRight className="mr-2 cursor-pointer" onClick={toggleExpand} />
        <span className="font-bold">{name}</span>
      </div>
      <span className="text-gray-500">
        {selectedOption?.name || "Not set"}
      </span>
    </div>
  );

  const ExpandedView = () => (
    <div className="p-4 border rounded-lg shadow-sm max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-m font-bold text-blue-600">{name}</h4>
        <ChevronLeft className="cursor-pointer" onClick={toggleExpand} />
      </div>

      <div className="relative mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 text-left border rounded flex justify-between items-center"
        >
          {selectedOption?.name || "Select"}
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <ul className="absolute z-10 w-full bg-white border rounded mt-1 shadow-md">
            {inputList?.map((column) => (
              <li
                key={column.name as string}
                className="p-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150"
                onClick={() => {
                  setSelectedOption(column);
                  setIsOpen(false);
                }}
              >
                {column.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedOption && (
        <>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectedOption.isRequired}
              disabled
              className="mr-2 h-5 w-5 text-blue-600 cursor-not-allowed"
            />
            <label className="text-gray-700">Is Required</label>
          </div>

          <div>
            <div>
              <p className="">Example Value: {selectedOption.input_ex}</p>
              <p className="text-gray-700 mt-2">{selectedOption.description}</p>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <span className="mr-2">{syncOn ? "Sync On" : "Sync Off"}</span>
            <div
              className={`w-12 h-6 ${
                syncOn ? "bg-green-500" : "bg-gray-300"
              } rounded-full p-1 cursor-pointer ${
                isRequired ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSyncToggle}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                  syncOn ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return isExpanded ? <ExpandedView /> : <CompactView />;
};

export default Field;
