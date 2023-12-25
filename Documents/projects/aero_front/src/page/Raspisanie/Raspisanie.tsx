import React from "react";
import styles from "./styles.module.scss";
import { planeDto } from "../Plane/Plane";

interface tableDto {
  id: number;
  departure: Date;
  arrival: Date;
  polosa: any;
  requestType: String;
  time_changed: boolean;
  plane: planeDto;
  status: String;
  start: String;
  finish: String;
}

const Raspisanie = () => {
  const [requests, setRequests] = React.useState<tableDto[]>([]);
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        await fetch("http://localhost:8080/raspisanie", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((DATA) => setRequests(DATA.requests));
      } catch (error) {
        return console.log(error);
      }
    })();
  }, [clicked]);

  console.log(requests);
  return (
    <div className={styles.main}>
      <h1>Расписание вылетов</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Тип заявки</th>
            <th>Id самолета</th>
            <th>Прилетет раньше, задержался</th>
            <th>Тип самолета</th>
            <th>Начало вылета</th>
            <th>Конец вылета</th>
            <th>Статус</th>
            <th>Вылет</th>
            <th>Прилёт</th>
          </tr>
        </thead>
        <tbody>
          {requests
            .filter((item) => item.requestType === "Vzlet")
            .map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>Взлёт</td>
                <td>{data.plane?.id}</td>
                <td>{data.time_changed === false ? "Нет" : "Да"} </td>
                <td>
                  {data.plane.planeType == "Transport"
                    ? "Грузовой"
                    : "Пассажирский"}
                </td>
                <td>{data.start?.replace("T", " ").slice(0, -7) ?? "-"}</td>
                <td>{data.finish?.replace("T", " ").slice(0, -7) ?? "-"}</td>
                <td>
                  {data.status === "Finished"
                    ? "Закончено"
                    : data.status === "Working"
                    ? "В работе"
                    : "Ждет"}
                </td>
                <td>{data.departure.toString().replace("T", " ")}</td>
                <td>-</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h1>Расписание прилетов</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Тип заявки</th>
            <th>Id самолета</th>
            <th>Прилетет раньше, задержался</th>
            <th>Тип самолета</th>
            <th>Начало прилета</th>
            <th>Конец прилета</th>
            <th>Статус</th>
            <th>Вылет</th>
            <th>Прилёт</th>
          </tr>
        </thead>
        <tbody>
          {requests
            .filter((item) => item.requestType === "Posadka")
            .map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>Посадка</td>
                <td>{data.plane?.id}</td>
                <td>{data.time_changed === false ? "Нет" : "Да"} </td>
                <td>
                  {data.plane.planeType == "Transport"
                    ? "Грузовой"
                    : "Пассажирский"}
                </td>
                <td>{data.start?.replace("T", " ").slice(0, -7) ?? "-"}</td>
                <td>{data.finish?.replace("T", " ").slice(0, -7) ?? "-"}</td>
                <td>
                  {data.status === "Finished"
                    ? "Закончено"
                    : data.status === "Working"
                    ? "В работе"
                    : "Ждет"}
                </td>
                <td>-</td>

                <td>{data.arrival.toString().replace("T", " ")}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => setClicked(!clicked)}>Обновить</button>
    </div>
  );
};

export default Raspisanie;
