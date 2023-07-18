/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-07-17 14:06:29
 * @FilePath: /calendar-nextjs-js/app/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import MyCalendar from "@/components/Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MyCalendar />
    </main>
  );
}
