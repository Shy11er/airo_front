import React from "react";
import styles from "./styles.module.scss";

const date = new Date();
date.toLocaleString("ru-RU", {
  hour12: false,
});

const Request = () => {
  const [selForm, setSelForm] = React.useState("Создать");
  const [plane_id, setPlane_id] = React.useState<number | undefined>();
  const [request_id, setRequestId] = React.useState<number | undefined>();
  const [departure, setDeparture] = React.useState<Date>(date);
  const [arrival, setArrival] = React.useState<Date>(date);
  const [requestType, setRequestType] = React.useState("Посадка");

  const submit = async () => {
    try {
      const data = {
        plane_id,
        request_id,
        requestType: requestType === "Посадка" ? "Posadka" : "Vzlet",
        arrival,
        departure,
        time_changed: false,
      };

      switch (selForm) {
        case "Создать":
          await fetch("http://localhost:8080/request/create", {
            method: "POST",
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;

        case "Удалить":
          await fetch(`http://localhost:8080/request/delete/${request_id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;

        case "Обновить":
          await fetch(`http://localhost:8080/request/update/${request_id}`, {
            method: "PUT",
            body: JSON.stringify({ ...data, time_changed: true }),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Заявки</h1>
      <div className={styles.form}>
        <ul>
          {["Создать", "Удалить", "Обновить"].map((item, key) => (
            <li onClick={() => setSelForm(item)} key={key}>
              {item}
            </li>
          ))}
        </ul>
        <div className={styles.container}>
          {selForm !== "Создать" ? (
            <input
              type="number"
              placeholder="id заявки"
              required
              value={request_id}
              onChange={(ev) => setRequestId(+ev.target.value)}
            />
          ) : (
            <input
              type="number"
              placeholder="id самолета"
              required
              value={plane_id}
              onChange={(ev) => setPlane_id(+ev.target.value)}
            />
          )}
          {selForm != "Удалить" && (
            <>
              <select
                value={requestType}
                onChange={(ev) => setRequestType(ev.target.value)}
              >
                <option value="Взлет">Взлет</option>
                <option value="Посадка">Посадка</option>
              </select>
              {requestType === "Взлет" ? (
                <input
                  type="datetime-local"
                  required
                  onChange={(ev) => setDeparture(new Date(ev.target.value))}
                />
              ) : (
                <input
                  type="datetime-local"
                  required
                  onChange={(ev) => setArrival(new Date(ev.target.value))}
                />
              )}
            </>
          )}
          <button onClick={submit}>{selForm}</button>
        </div>
      </div>
    </div>
  );
};

export default Request;
