import { useState } from 'react';

import './index.css';
import PipelineStepper from './PipelineStepper';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PipelineStepper /> 
    </>
  );
}

export default App;
