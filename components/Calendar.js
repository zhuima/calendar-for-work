/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-07-14 15:36:56
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-07-18 15:35:25
 * @FilePath: /calendar-nextjs-js/components/Calendar.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import React, { Fragment, useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

import events from "@/lib/events";
import Year from "./Year";

import "moment/locale/zh-cn";
moment.locale("zh-cn");

const localizer = momentLocalizer(moment); // or globalizeLocalizer
localizer.format.yearHeaderFormat = "YYYY";

const MyCalendar = () => {
  const [myEvents, setEvents] = useState(events);
  const [alert, setAlert] = useState(null);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback((event) => {
    console.log("event----->", event.title, event.start, event.end);
    window.alert(event.title);
  }, []);

  const addNewEventAlert = (slotInfo) => {
    setAlert(
      <SweetAlert
        input
        showCancel
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="warning"
        confirmBtnText="添加"
        cancelBtnText="取消"
        btnSize="lg"
        title="值班人员"
        placeHolder="请输入值班人员姓名"
        onConfirm={(e) => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
      ></SweetAlert>
    );
  };

  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setAlert(null);
    setEvents(newEvents);
  };
  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <>
      {alert}
      <div className="app">
        <Calendar
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          //   onSelectSlot={handleSelectSlot}
          onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
          selectable
          style={{ height: 700 }}
          popup
          toolbar={true}
          defaultDate={moment().toDate()}
          defaultView="year"
          views={{
            day: true,
            week: true,
            month: true,
            year: Year,
          }}
          messages={{ year: "Year" }}
        />
      </div>
    </>
  );
};

export default MyCalendar;
