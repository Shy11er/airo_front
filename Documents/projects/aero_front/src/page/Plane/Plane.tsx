import React from "react";
import styles from "./styles.module.scss";

export interface planeDto {
  id: number;
  planeType: string;
  company: string;
  title: string;
  time_to_fly: number;
  passager_amount: number;
  cargo_amount: number;
}

const Plane = () => {
  const [selForm, setSelForm] = React.useState("Создать");
  const [id, setId] = React.useState<number | undefined>();
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");

  const [planeType, setPlaneType] = React.useState("Пассажирский");
  const [passagerCount, setPassagerCount] = React.useState<
    number | undefined
  >();
  const [cargoAmount, setCargoAmount] = React.useState<number | undefined>();
  const [time_to_fly, setTime_to_fly] = React.useState<number | undefined>();
  const [clicked, setClicked] = React.useState(false);
  const [planes, setPlanes] = React.useState([]);

  const submit = async () => {
    try {
      const data = {
        planeType: planeType === "Пассажирский" ? "Airliner" : "Transport",
        company,
        title,
        time_to_fly,
        passager_amount: passagerCount,
        cargo_amount: cargoAmount,
      };

      switch (selForm) {
        case "Создать":
          await fetch("http://localhost:8080/plane/create", {
            method: "POST",
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;

        case "Удалить":
          await fetch(`http://localhost:8080/plane/delete/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;

        case "Обновить":
          await fetch(`http://localhost:8080/plane/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
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

  React.useEffect(() => {
    (async () => {
      try {
        await fetch("http://localhost:8080/plane/findAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((DATA) => setPlanes(DATA));
      } catch (error) {
        return console.log(error);
      }
    })();
  }, [clicked]);

  return (
    <div className={styles.main}>
      <h1>Самолеты</h1>
      <div className={styles.form}>
        <ul>
          {["Создать", "Удалить", "Обновить"].map((item, key) => (
            <li onClick={() => setSelForm(item)} key={key}>
              {item}
            </li>
          ))}
        </ul>
        <div className={styles.container}>
          {selForm != "Создать" && (
            <input
              type="number"
              placeholder="id"
              required
              value={id}
              onChange={(ev) => setId(+ev.target.value)}
            />
          )}
          {selForm != "Удалить" && (
            <>
              <input
                type="text"
                placeholder="Название самолета"
                required
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Название компании"
                required
                value={company}
                onChange={(ev) => setCompany(ev.target.value)}
              />
              <input
                type="number"
                placeholder="Время для взлета или посадки(мин)"
                required
                value={time_to_fly}
                onChange={(ev) => setTime_to_fly(+ev.target.value)}
              />
              <select
                value={planeType}
                onChange={(ev) => setPlaneType(ev.target.value)}
              >
                <option value="Пассажирский">Пассажирский</option>
                <option value="Грузовой">Грузовой</option>
              </select>
              {planeType === "Пассажирский" ? (
                <input
                  type="number"
                  placeholder="Кол-во пассажиров"
                  required
                  value={passagerCount}
                  onChange={(ev) => setPassagerCount(+ev.target.value)}
                />
              ) : (
                <input
                  type="number"
                  placeholder="Кол-во груза"
                  required
                  value={cargoAmount}
                  onChange={(ev) => setCargoAmount(+ev.target.value)}
                />
              )}
            </>
          )}
          <button onClick={submit}>{selForm}</button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Название</th>
            <th>Компания</th>
            <th>Тип самолета</th>
            <th>Кол-во пассажиров</th>
            <th>Кол-во груза</th>
            <th>Время для взлета или посадки</th>
          </tr>
        </thead>
        <tbody>
          {planes.map((data: planeDto, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.company}</td>
              <td>
                {data.planeType == "Transport" ? "Грузовой" : "Пассажирский"}
              </td>
              <td>
                {data.passager_amount === null ? "-" : data.passager_amount}
              </td>
              <td>{data.cargo_amount === null ? "-" : data.cargo_amount}</td>
              <td>{data.time_to_fly}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setClicked(!clicked)}>Обновить</button>
    </div>
  );
};

export default Plane;
