import React from "react";

const Main = () => {
  const [simulationStep, setSimulationStep] = useState(1);
  const [simulationPeriod, setSimulationPeriod] = useState(1);

  const handleStepChange = (event) => {
    setSimulationStep(parseInt(event.target.value, 10));
  };

  const handlePeriodChange = (event) => {
    setSimulationPeriod(parseInt(event.target.value, 10));
  };

  return (
    <div className="app">
      <div className="simulation-block">
        <h2>Данные о симуляции</h2>
        <label htmlFor="simulationStep">Шаг симуляции:</label>
        <select
          id="simulationStep"
          value={simulationStep}
          onChange={handleStepChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
        </select>
        <br />
        <label htmlFor="simulationPeriod">Период:</label>
        <select
          id="simulationPeriod"
          value={simulationPeriod}
          onChange={handlePeriodChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div className="centered-block">Блок симуляции</div>
    </div>
  );
};

export default Main;
