import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PlusCircle, X } from 'lucide-react';
import { GatewayConfig } from './Step1Configuration';
import { PipelineConfig  } from './model';

interface Column {
    input: String
    output: String
}

interface Step2Config {
    columns: (Column)[]
}

interface Step2ConfigProps {
    pipelineConfig: PipelineConfig
    updatePipelineConfig: Function
}

const Step2Configuration : React.FC<Step2ConfigProps> = ({pipelineConfig, updatePipelineConfig}) => {
  const [config, updateConfig] = useState<Step2Config>({
    columns: []
  });
  const [newColumn, setNewColumn] = useState<Column>({ input: '', output: '' });
  const [inputColumnList, updateInputColumnList] = useState<String[]>(pipelineConfig.columns)
  const [rawColumn, setRawColumn] = useState(pipelineConfig.rawColumnString);

  const nextStep = () => {
    updatePipelineConfig(undefined, undefined, rawColumn, inputColumnList, config, 1)
    console.log('next step')
  }
  const prevStep = () => {
    updatePipelineConfig(undefined, undefined, rawColumn, inputColumnList, config, -1)
    console.log('prev step')
  }

  const addColumn = () => {
    console.log("ADDING COLUMN: ", newColumn)
    if (newColumn.input && newColumn.output) {
      updateConfig({
        columns: [...config.columns, newColumn]
      });
      setNewColumn({ input: '', output: '' });
    }
  };

  const removeColumn = (index : Number) => {
    updateConfig({
      columns: config.columns.filter((_, i) => i !== index)
    });
  };

  const handleColumnInputChange= (e : any) => {
    setRawColumn(e.target.value);
    // Update the config with the new column names
    updateInputColumnList(e.target.value.split(',').map((col : any) => col.trim()).filter(Boolean));
  };

  return (
    <>
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 2: Column Configuration</h2>
      <div className="mb-4">
        <label className="block mb-2">Enter Column Names (comma-separated)</label>
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
            {inputColumnList.map((col : any, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mb-1">
                {col}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Modify Column</label>
        <div className="flex space-x-2">
        <select
            value={newColumn.input as string}
            onChange={(e) => setNewColumn({ input: e.target.value, output: newColumn.output })}
            className="flex-1 p-2 border rounded"
            >
            {inputColumnList.map((col : any, index) => (
                <option key={index} value={col}>
                {col}
                </option>
            ))}
         </select>
          <input
            type="text"
            value={newColumn.output as string}    
            onChange={(e) => setNewColumn({ input: newColumn.input, output: e.target.value})}
            className="flex-1 p-2 border rounded"
            placeholder="Output JS expression"
          />
          <button
            onClick={addColumn}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Configured Columns:</h3>
        {config.columns.map((column, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <span className="flex-1">{column.input} → {column.output}</span>
            <button
              onClick={() => removeColumn(index)}
              className="text-red-500"
            >
              <X size={20} />
            </button>
          </div>
        ))}
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