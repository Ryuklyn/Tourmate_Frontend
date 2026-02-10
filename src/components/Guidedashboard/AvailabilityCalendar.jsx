import React, { useState } from "react";
import Calendar from "react-calendar";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import "../../assets/styles/calendar.css";

const AvailabilityCalendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="border border-gray-300 rounded-xl bg-white p-6 w-full shadow-sm">
      {/* Header */}
      <div className="flex items-center mb-5">
        <CalendarDays className="w-6 h-6 text-[#0faf94] mr-2" />
        <h2 className="text-xl font-semibold">Availability Calendar</h2>
      </div>

      <div className="flex justify-center">
        <Calendar
          onChange={setValue}
          value={value}
          calendarType="gregory"
          prev2Label={null}
          next2Label={null}
          formatDay={(locale, date) => date.getDate()}
          nextLabel={<ChevronRight className="w-5 h-5" />}
          prevLabel={<ChevronLeft className="w-5 h-5" />}
          navigationLabel={({ date }) => (
            <div className="w-full text-center">
              <span className="text-lg font-semibold">
                {date.toLocaleString("default", { month: "long" })}{" "}
                {date.getFullYear()}
              </span>
            </div>
          )}
          className="custom-calendar rounded-xl w-full max-w-md"
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const isToday = date.toDateString() === new Date().toDateString();

              return `
          text-center p-2 rounded-md transition cursor-pointer
          hover:bg-gray-100
          ${isToday ? "bg-[#0faf94] text-white font-bold" : ""}
        `;
            }
            return "";
          }}
        />
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
