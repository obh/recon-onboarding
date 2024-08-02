import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PipelineConfig  } from './model';

export interface GatewayConfig {
  name: string
  gateway: string
}

interface Step1ConfigProps {
  pipelineConfig: PipelineConfig
  updatePipelineConfig: Function
}

const Step1Configuration : React.FC<Step1ConfigProps> = ({ pipelineConfig, updatePipelineConfig }) => {
  
  const [name, updateName] = useState<String>(pipelineConfig.name ? pipelineConfig.name : '')
  const [gateway, updateGateway] = useState<String>(pipelineConfig.gateway ? pipelineConfig.gateway : '')
  const [reconType, updateReconType] = useState<String>(pipelineConfig.reconType ? pipelineConfig.reconType : '')

  const gateways = ['cashfree', 'payu', 'razorpay']; // Replace with actual gateway options

  const nextStep = () => {
    updatePipelineConfig(name, gateway, reconType, undefined, undefined, undefined, 1)
    console.log('next step')
  }
  const prevStep = () => {
    updatePipelineConfig(name, gateway, reconType, undefined, undefined, undefined, -1)
    console.log('prev step')
  }

  return (
    <>
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 1: Basic Configuration</h2>
      <div className="mb-4">
        <label className="block mb-2">Pipeline Name</label>
        <input
          type="text"
          value={name as string}
          onChange={(e) => updateName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter pipeline name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Gateway</label>
        <select
          value={gateway as string}
          onChange={(e) => updateGateway(e.target.value )}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a gateway</option>
          {gateways.map((gateway) => (
            <option key={gateway} value={gateway}>
              {gateway}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Recon Type</label>
        <select
          value={gateway as string}
          onChange={(e) => updateReconType(e.target.value )}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Recon Type</option>
          <option key="settlement_recon" value="settlement_recon">Settlement Recon</option>
        </select>
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

export default Step1Configuration;