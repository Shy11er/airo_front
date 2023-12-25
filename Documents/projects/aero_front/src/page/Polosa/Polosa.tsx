import React from "react";
import styles from "./styles.module.scss";

interface PolosaTable {
  id: number;
  covering: String;
  isBusy: Boolean;
  polosaType: String;
  request: any;
}

enum PolosaType {
  Vzletnaya,
  Posadochnaya,
}

const date = new Date();
date.toLocaleString("ru-RU", {
  hour12: false,
});

const Polosa = () => {
  const [selForm, setSelForm] = React.useState("Создать");
  const [count, setCount] = React.useState<number | undefined>();
  const [polosa_id, setPolosaId] = React.useState<number | undefined>();
  const [isBusy, setIsBusy] = React.useState("Нет");
  const [polosaType, setPolosaType] = React.useState("Посадочная");

  const [clicked, setClicked] = React.useState(false);
  const [poloses, setPoloses] = React.useState<PolosaTable[]>([]);

  const submit = async () => {
    try {
      const data = {
        id: polosa_id,
        isBusy: isBusy === "Нет" ? false : true,
        polosaType,
      };

      switch (selForm) {
        case "Создать":
          await fetch(`http://localhost:8080/polosa/create/${count}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => setPoloses(response));
          break;

        case "Удалить":
          await fetch(`http://localhost:8080/polosa/delete/${polosa_id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;

        case "Обновить":
          await fetch(`http://localhost:8080/polosa/update/${polosa_id}`, {
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
        await fetch("http://localhost:8080/polosa/findAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((DATA) => setPoloses(DATA));
      } catch (error) {
        return console.log(error);
      }
    })();
  }, [clicked]);

  console.log(poloses);

  return (
    <div className={styles.main}>
      <h1>Полосы</h1>
      <div className={styles.form}>
        <ul>
          {["Создать", "Удалить", "Обновить"].map((item, key) => (
            <li onClick={() => setSelForm(item)} key={key}>
              {item}
            </li>
          ))}
        </ul>
        <div className={styles.container}>
          {selForm === "Создать" ? (
            <>
              <label>Кол-во полос</label>
              <select
                value={count}
                onChange={(ev) => setCount(+ev.target.value)}
              >
                {[
                  Array.from({ length: 9 }, (_, index) => 2 + index).map(
                    (value, i) => (
                      <option value={value} key={i}>
                        {value}
                      </option>
                    )
                  ),
                ]}
              </select>
            </>
          ) : (
            <input
              type="number"
              required
              placeholder="id полосы"
              value={polosa_id}
              onChange={(ev) => setPolosaId(+ev.target.value)}
            />
          )}
          {selForm === "Обновить" && (
            <>
              <select
                value={polosaType}
                onChange={(ev) => setPolosaType(ev.target.value)}
              >
                <option value="Взлётная">Взлётная</option>
                <option value="Посадочная">Посадочная</option>
              </select>
            </>
          )}
          <button onClick={submit}>{selForm}</button>
        </div>
      </div>
      <h1>Посадочные полосы</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Покрытие</th>
            <th>Занята</th>
            <th>Тип полосы</th>
            <th>Заявка</th>
          </tr>
        </thead>
        <tbody>
          {poloses
            .filter((item) => item.polosaType === "Posadochnaya")
            .map((data: PolosaTable, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.covering}</td>
                <td>{data.isBusy === false ? "Нет" : "Да"} </td>
                <td>Посадочная</td>
                <td>{data.request ?? "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h1>Взлётные полосы</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Покрытие</th>
            <th>Занята</th>
            <th>Тип полосы</th>
            <th>Заявка</th>
          </tr>
        </thead>
        <tbody>
          {poloses
            .filter((item) => item.polosaType === "Vzletnaya")
            .map((data: PolosaTable, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.covering}</td>
                <td>{data.isBusy === false ? "Нет" : "Да"} </td>
                <td>
                  {data.polosaType == "Posadochnaya"
                    ? "Посадочная"
                    : "Взлётная"}
                </td>
                <td>{data.request ?? "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => setClicked(!clicked)}>Обновить</button>
    </div>
  );
};

export default Polosa;
