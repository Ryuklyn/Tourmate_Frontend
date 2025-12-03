// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import { CalendarDays } from "lucide-react";

// const AvailabilityCalendar = () => {
//   const [date, setDate] = useState(new Date());

//   return (
//     <div className="border border-gray-300 rounded-xl bg-white p-6 w-full shadow-sm">
//       <div className="flex items-center gap-2 mb-4 border-b pb-2">
//         <CalendarDays className="w-6 h-6 text-green-700" />
//         <h2 className="text-lg font-semibold text-gray-700">
//           Availability Calendar
//         </h2>
//       </div>

//       <Calendar
//         onChange={setDate}
//         value={date}
//         prev2Label={null}
//         next2Label={null}
//         className="
//           w-full
//           [&_.react-calendar__navigation]:flex [&_.react-calendar__navigation]:justify-between [&_.react-calendar__navigation]:mb-4
//           [&_.react-calendar__navigation button]:text-sm [&_.react-calendar__navigation button]:px-3 [&_.react-calendar__navigation button]:py-1
//           [&_.react-calendar__navigation button]:rounded-lg [&_.react-calendar__navigation button]:hover:bg-gray-200

//           [&_.react-calendar__month-view__weekdays]:text-center [&_.react-calendar__month-view__weekdays]:text-sm [&_.react-calendar__month-view__weekdays_abbr]:no-underline [&_.react-calendar__month-view__weekdays]:text-gray-500

//           [&_.react-calendar__tile]:text-center [&_.react-calendar__tile]:py-3 [&_.react-calendar__tile]:text-sm [&_.react-calendar__tile]:rounded-lg
//           [&_.react-calendar__tile]:transition-all [&_.react-calendar__tile]:duration-150
//           [&_.react-calendar__tile:hover]:bg-blue-100
//           [&_.react-calendar__tile--active]:bg-blue-600 [&_.react-calendar__tile--active]:text-white [&_.react-calendar__tile--active:hover]:bg-blue-700

//           [&_.react-calendar__tile--now]:bg-gray-100 [&_.react-calendar__tile--now]:text-gray-900
//         "
//       />
//     </div>
//   );
// };

// export default AvailabilityCalendar;

import React, { useState } from "react";
import Calendar from "react-calendar";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const AvailabilityCalendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="border border-gray-300 rounded-xl bg-white p-6 w-full shadow-sm">
      {/* Header */}
      <div className="flex items-center mb-5">
        <CalendarDays className="w-6 h-6 text-[#0faf94] mr-2" />
        <h2 className="text-xl font-semibold">Availability Calendar</h2>
      </div>

      {/* Calendar */}
      {/* <Calendar
        onChange={setValue}
        value={value}
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => date.getDate()} // keep numbers only
        nextLabel={<ChevronRight className="w-5 h-5" />}
        prevLabel={<ChevronLeft className="w-5 h-5" />}
        className="w-full custom-calendar"
       <div className="flex justify-center items-center">
  <span className="text-lg font-semibold">
    {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
  </span>
</div>

        tileClassName={({ activeStartDate, date, view }) =>
          view === "month"
            ? "text-center p-2 rounded-md transition hover:bg-gray-100 cursor-pointer"
            : ""
        }
      /> */}
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
          <div className="flex justify-center items-center w-full">
            <span className="text-lg font-semibold">
              {date.toLocaleString("default", { month: "long" })}{" "}
              {date.getFullYear()}
            </span>
          </div>
        )}
        className="w-full custom-calendar"
        tileClassName={({ view }) =>
          view === "month"
            ? "text-center p-2 rounded-md transition hover:bg-gray-100 cursor-pointer"
            : ""
        }
      />
    </div>
  );
};

export default AvailabilityCalendar;
