import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PlusCircle, X } from "lucide-react";
import { GatewayConfig } from "./Step1Configuration";
import { Column, GatewayRecon, PipelineConfig, RazorpayRecon } from "./model";
import Field from "./Field";

interface Step2ConfigProps {
  pipelineConfig: PipelineConfig;
  updatePipelineConfig: Function;
}

function getGatewayConfig(gatewayName: string): GatewayRecon | null {
  if (gatewayName == "razorpay") {
    return new RazorpayRecon();
  } else if (gatewayName == "cashfree") {
    return new RazorpayRecon();
  }
  return null;
}

const Step2Configuration: React.FC<Step2ConfigProps> = ({
  pipelineConfig,
  updatePipelineConfig,
}) => {
  const [rawColumn, setRawColumn] = useState(pipelineConfig.rawColumnString);
  const [inputColumnList, updateInputColumnList] = useState<String[]>([]);

  const gatewayConfig = getGatewayConfig(pipelineConfig.gateway);

    const nextStep = () => {
    //   updatePipelineConfig(undefined, undefined, rawColumn, inputColumnMap, config, 1)
      console.log('next step')
    }
    const prevStep = () => {
    //   updatePipelineConfig(undefined, undefined, rawColumn, inputColumnMap, config, -1)
      console.log('prev step')
    }

  const handleColumnInputChange = (e: any) => {
    setRawColumn(e.target.value);
    // Update the config with the new column names
    updateInputColumnList(
      e.target.value
        .split(",")
        .map((col: any) => col.trim())
        .filter(Boolean)
    );
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Step 2: Column Configuration
        </h2>
        <div className="mb-4">
            <label className="block mb-2">
                The following columns are required for Gateway: 
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {gatewayConfig?.gateway}
                </span>
                <div></div>
                {gatewayConfig?.columns.map((column: Column, index: number) => (
                    <div
                    className="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">
                        <div className="select-none">
                            {column.name} 
                        </div>
                    </div>
                ))}
            </label>

        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Enter Column Names (comma-separated)
          </label>
          <input
            type="text"
            value={rawColumn}
            onChange={handleColumnInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter column names, separated by commas"
          />
          {rawColumn && (
            <div className="mt-2 text-sm text-gray-600">
              Columns:
              {inputColumnList.map((col, index) => (
                <Field
                  name={col as string}
                  inputList={gatewayConfig?.columns}
                  updateCallback={handleColumnInputChange}
                />
              ))}
            </div>
          )}
        </div>
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

export default Step2Configuration;
