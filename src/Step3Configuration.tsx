import React, { useEffect, useState } from "react";
import { PipelineConfig } from "./model";
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface InputRow {
  destinationColumn: string;
  source: string;
  sourceColumn: string;
}

interface Step3ConfigProps {
  pipelineConfig: PipelineConfig;
  updatePipelineConfig: Function;
}

const destinationColumns = [
  {
    destinationColumn: "txn_recon_key",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "entity",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "event_type",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "internal_amount",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "internal_event_time",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "gateway_amount",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "gateway_payment_time",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "gateway_payment_reference",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "currency",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "gateway",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "processing_fee",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
  {
    destinationColumn: "processing_tax",
    source: "",
    sourceColumn: "defined",
  } as InputRow,
];

const Step3Configuration: React.FC<Step3ConfigProps> = ({
  pipelineConfig,
  updatePipelineConfig,
}) => {
  const [rows, setRows] = useState<InputRow[]>(destinationColumns);

  const handleInputChange = (
    index: number,
    field: keyof InputRow,
    value: string
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  useEffect(() => {}, []);

  const nextStep = () => {
    updatePipelineConfig(undefined, undefined, undefined, undefined, undefined, 1)
    console.log('next step')
  }
  const prevStep = () => {
    updatePipelineConfig(undefined, undefined, undefined, undefined, undefined, -1)
    console.log('prev step')
  }

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="font-bold">Destination Column</div>
          <div className="font-bold">Source</div>
          <div className="font-bold">Source Column</div>
        </div>
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-2">
            <div className="relative">
              <select
                value={row.sourceColumn}
                onChange={(e) =>
                  handleInputChange(index, "sourceColumn", e.target.value)
                }
                className="border p-2 rounded w-full appearance-none"
              >
                {destinationColumns.map((inputRow: InputRow, index: number) => (
                  <option key={index}>{inputRow.destinationColumn}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                value={row.source}
                onChange={(e) =>
                  handleInputChange(index, "source", e.target.value)
                }
                className="border p-2 rounded w-full appearance-none"
              >
                <option>MIS FILE</option>
                <option>FlowWise Database</option>
                {/* Add more options as needed */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                value={row.sourceColumn}
                onChange={(e) =>
                  handleInputChange(index, "sourceColumn", e.target.value)
                }
                className="border p-2 rounded w-full appearance-none"
              >
                {pipelineConfig.columns.map((value, index) => (
                  <option key={index}>{value}</option>
                ))}
                {/* Add more options as needed */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center"
        >
          <ChevronLeft size={20} className="mr-2" />
          Previous
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center ml-auto"
        >
          Next
          <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </>
  );
};

export default Step3Configuration;
