"use client";

import styles from "./CalendarWidget.module.css";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarWidget() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | string)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push("");
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        {now.toLocaleString("default", { month: "long" })} {year}
      </div>
      <div className={styles.grid}>
        {dayNames.map((name) => (
          <div key={name} className={styles.dayName}>
            {name}
          </div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`${styles.day} ${
              day === now.getDate() ? styles.today : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
