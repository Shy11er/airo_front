import React from "react";
import styles from "./styles.module.scss";

interface OtchetDto {
  amountRequest: number;
  maxDelay: number;
  averDelay: number;
  maxQueueSize: number;
  averQueueSize: number;
  averPolosa: number;
}

const Main = () => {
  const [simulationStep, setSimulationStep] = React.useState(30);
  const [simulationPeriod, setSimulationPeriod] = React.useState(1);
  const [min_range, setMinRange] = React.useState(0);
  const [max_range, setMaxRange] = React.useState(120);
  const [planeSpawn, setPlaneSpawn] = React.useState(2);

  const [otchetData, setOtchetData] = React.useState<OtchetDto>();
  console.log(otchetData);
  const submit = async () => {
    try {
      const data = {
        step: simulationStep,
        time: simulationPeriod,
        min_range,
        max_range,
        planeSpawn,
      };

      await fetch("http://localhost:8080/simulation/start", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      return console.log(error);
    }
  };

  const work = async () => {
    try {
      await fetch("http://localhost:8080/aero", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      return console.log(error);
    }
  };

  const otchet = async () => {
    try {
      await fetch("http://localhost:8080/aero/otchet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => setOtchetData(response));
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.left}>
        <div className={styles.simulation}>
          <h2>Данные о симуляции</h2>
          <label htmlFor="simulationStep">Шаг моделирования:</label>
          <select
            id="simulationStep"
            value={simulationStep}
            onChange={(ev) => setSimulationStep(+ev.target.value)}
          >
            {[
              Array.from({ length: 26 }, (_, index) => 5 + index).map(
                (value, i) => (
                  <option value={value} key={i}>
                    {value}
                  </option>
                )
              ),
            ]}
          </select>
          <br />
          <label htmlFor="simulationPeriod">Время суток началы работы:</label>
          <select
            id="simulationPeriod"
            value={simulationPeriod}
            onChange={(ev) => setSimulationPeriod(+ev.target.value)}
          >
            {[
              Array.from({ length: 24 }, (_, index) => 1 + index).map(
                (value, i) => (
                  <option value={value} key={i}>
                    {value}
                  </option>
                )
              ),
            ]}
          </select>
          <br />
          <p>
            Диапазон разброса случайной величины отклонения от расписания(мин):
          </p>
          <p>Минимум:</p>
          <input
            type="number"
            onChange={(ev) => setMinRange(+ev.target.value)}
            value={min_range}
          />
          <p>Максимум:</p>
          <input
            type="number"
            onChange={(ev) => setMaxRange(+ev.target.value)}
            value={max_range}
          />
          <p>Частота появления самолетов:</p>
          <input
            type="number"
            onChange={(ev) => setPlaneSpawn(+ev.target.value)}
            value={planeSpawn}
          />
        </div>
        <button onClick={submit}>Начать симуляцию</button>
      </div>
      <div className={styles.right}>
        <button onClick={work}>Начать работу</button>
        <h1>Отчет</h1>
        {otchetData && (
          <>
            <p>Всего заявок: {otchetData.amountRequest}</p>
            <p>Максимальная задержка: {otchetData.maxDelay} мин.</p>
            <p>Средняя задержка: {otchetData.averDelay.toFixed(2)} мин.</p>
            <p>Максимальная длина очереди: {otchetData.maxQueueSize}</p>
            <p>Средняя длина очереди: {otchetData.averQueueSize.toFixed(2)}</p>
            <p>
              Средняя задержка полос: {(otchetData.averPolosa / 10).toFixed(2)}%
            </p>
          </>
        )}
        <button onClick={otchet}>Получить отчет</button>
      </div>
    </div>
  );
};

export default Main;
