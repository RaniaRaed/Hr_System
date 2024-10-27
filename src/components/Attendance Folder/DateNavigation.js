import React, { useState, useEffect, useRef } from "react";
import "./DateNavigation.css";

const generateDaysOfMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysArray = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i);
    daysArray.push({
      day: day.getDate(),
      label: day.toLocaleString("en-US", { weekday: "short" }),
    });
  }

  return daysArray;
};

const DateNavigation = () => {
  const [currentDay, setCurrentDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [daysOfMonth, setDaysOfMonth] = useState(generateDaysOfMonth());
  const dateBarRef = useRef(null);
  const currentDayRef = useRef(null);

  useEffect(() => {
    const today = new Date().getDate();
    setCurrentDay(today);
    setSelectedDay(today);
  }, []);

  useEffect(() => {
    if (currentDayRef.current && dateBarRef.current) {
      // يحرك الشريط إلى اليوم الحالي عند تحميل الصفحة
      const { offsetLeft, offsetWidth } = currentDayRef.current;
      const dateBarWidth = dateBarRef.current.offsetWidth;
      dateBarRef.current.scrollLeft = offsetLeft - (dateBarWidth / 2) + (offsetWidth / 2);
    }
  }, [daysOfMonth, currentDay]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="date-bar" ref={dateBarRef}>
      {daysOfMonth.map((item) => (
        <div
          key={item.day}
          className={`date 
            ${item.day === selectedDay ? "active" : ""} 
            ${item.day === currentDay ? "current" : ""}`}
          onClick={() => handleDayClick(item.day)}
          ref={item.day === currentDay ? currentDayRef : null} // مرجع لليوم الحالي
        >
          {item.day}
          <br />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DateNavigation;
