import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Step1Configuration, {GatewayConfig} from './Step1Configuration';
import Step2Configuration from './Step2Configuration';
import Step3Configuration from './Step3Configuration';
import { PipelineConfig  } from './model';


const PipelineStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pipelineConfig, setPipelineConfig] = useState<PipelineConfig>({
    name: '',
    gateway: '',
    reconType: '',
    rawColumnString: '',
    columns: [],
    inputTransforms: []
  });

  const updateConfig = (newConfig : GatewayConfig) => {
    setPipelineConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const updatePipelineConfig = (name: string, gateway: string, reconType: string, rawColumnString: string, columns: [], inputTransformations: [], next: number) => {
    const newPipelineConfig = {
        name: name ? name : pipelineConfig.name,
        gateway: gateway ? gateway : pipelineConfig.gateway,
        reconType: reconType ? reconType : pipelineConfig.reconType,
        rawColumnString : rawColumnString ? rawColumnString : pipelineConfig.rawColumnString,
        columns : columns ? columns : pipelineConfig.columns,
        inputTransforms : inputTransformations ? inputTransformations : pipelineConfig.inputTransforms
    }
    setPipelineConfig(newPipelineConfig)
    if(next > 0){
        nextStep()
    } else {
        prevStep()
    }
  }


  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Configuration pipelineConfig={pipelineConfig} updatePipelineConfig={updatePipelineConfig} />;
      case 2:
        return <Step2Configuration pipelineConfig={pipelineConfig} updatePipelineConfig={updatePipelineConfig}/>;
      case 3:
        return <Step3Configuration pipelineConfig={pipelineConfig} updatePipelineConfig={updatePipelineConfig} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Pipeline Configuration</h1>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-1/3 text-center py-2 ${
                currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              Step {step}
            </div>
          ))}
        </div>
      </div>
      {renderStep()}
      {/* {currentStep != 2 &&
      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded flex items-center"
          >
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center ml-auto"
          >
            Next
            <ChevronRight size={20} className="ml-2" />
          </button>
        )}
      </div>
        } */}
    </div>
  );
};

export default PipelineStepper;