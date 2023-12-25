import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const nav_items = [
  { title: "Заявки", to: "/request" },
  { title: "Полосы", to: "/polosa" },
  { title: "Самолеты", to: "/plane" },
  { title: "Расписание", to: "/raspisanie" },
];

const Navbar: React.FC = () => {
  const [activeTitle, setActiveTitle] = React.useState<String | null>("Отель");

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img
          style={{ cursor: "pointer" }}
          src="https://upload.wikimedia.org/wikipedia/ru/thumb/c/ce/Sydney_Airport_logo.svg/2560px-Sydney_Airport_logo.svg.png"
          alt=""
        />
      </Link>
      <ul>
        {nav_items.map((item, key) => (
          <li
            key={key}
            className={activeTitle === item.title ? styles.active : ""}
            onClick={() => setActiveTitle(item.title)}
          >
            <Link to={item.to}>
              <h1>{item.title}</h1>
              <div className={styles.line}></div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
