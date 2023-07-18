import React, { useState, useEffect } from "react";
import moment from "moment";

import * as dates from "react-big-calendar/lib/utils/dates";
import { navigate } from "react-big-calendar/lib/utils/constants";



function useCalendar(currentDate) {
  const [calendar, setCalendar] = useState();

  useEffect(() => {
    if (!currentDate) {
      currentDate = moment().toDate();
    } else {
      currentDate = moment(currentDate);
    }

    const first = currentDate.clone().startOf("month");
    const last = currentDate.clone().endOf("month");
    const weeksCount = Math.ceil((first.day() + last.date()) / 7);

    const newCalendar = Object.assign([], { currentDate, first, last });

    for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
      const week = [];
      newCalendar.push(week);
      newCalendar.year = currentDate.year();
      newCalendar.month = currentDate.month();

      for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
        const date = currentDate.clone().set("date", day + 1 - first.day());
        date.calendar = newCalendar;
        week.push(date);
      }
    }

    setCalendar(newCalendar);
  }, [currentDate]);

  return calendar;
}

function CalendarDate({ dateToRender, dateOfMonth, onClick }) {
  const today =
    dateToRender.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ? "today"
      : "";

  if (dateToRender.month() < dateOfMonth.month()) {
    return (
      <button disabled={true} className="date prev-month">
        {dateToRender.date()}
      </button>
    );
  }

  if (dateToRender.month() > dateOfMonth.month()) {
    return (
      <button disabled={true} className="date next-month">
        {dateToRender.date()}
      </button>
    );
  }

  return (
    <button
      className={`date in-month ${today}`}
      onClick={() => onClick(dateToRender)}
    >
      {dateToRender.date()}
    </button>
  );
}

function Calendar({ date }) {
  const calendar = useCalendar(date);

  if (!calendar) {
    return null;
  }

  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md mt-3 mx-4 my-6">
      <div className="font-bold text-xl mb-2">
        {calendar.currentDate.format("MMMM").toUpperCase()}
      </div>

      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <span key={index} className="day">
          {day}
        </span>
      ))}

      {calendar.map((week, index) => (
        <div key={index}>
          {week.map((date) => (
            <CalendarDate
              key={date.date()}
              dateToRender={date}
              dateOfMonth={calendar.currentDate}
              onClick={(date) => {
                alert(date.format("YYYY-MM-DD"));
                // return dates.startOf(date, "month");
                // return dates.startOf(new Date(date), "day");
                // alert(date.format("YYYY-MM-DD"));
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Year({ date }) {
  const [view, setView] = useState("month"); // ['month', 'year'
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const months = [];
    const firstMonth = dates.startOf(date, "year");

    for (let i = 0; i < 12; i++) {
      months.push(
        <Calendar
          key={i + 1}
          date={dates.add(firstMonth, i, "month")}
        />
      );
    }

    setCalendar(months);
  }, [date]);

  return <div className="year">{calendar}</div>;
}

Year.range = (date) => {
  return [dates.startOf(date, "year")];
};

Year.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, "year");

    case navigate.NEXT:
      return dates.add(date, 1, "year");

    default:
      return date;
  }
};

Year.title = (date, { localizer }) => localizer.format(date, "YYYY" + " 年");

export default Year;
