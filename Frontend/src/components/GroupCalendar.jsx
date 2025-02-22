import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function GroupCalendar() {
  const [date, setDate] = useState(new Date());

  // Sample Study Sessions (Later, Fetch from Backend)
  const studySessions = [
    { date: "2025-02-25", topic: "Data Structures", time: "5:00 PM" },
    { date: "2025-03-02", topic: "Operating Systems", time: "6:00 PM" },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg w-full">
      <h2 className="text-xl font-bold text-green-400">📅 Upcoming Study Sessions</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className="w-full bg-gray-900 p-4 rounded-lg mt-4 text-black"
      />
      <ul className="mt-4 text-gray-300">
        {studySessions.map((session, index) => (
          <li key={index} className="p-2 bg-gray-700 rounded-md mt-2">
            📖 {session.topic} - {session.date} at {session.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
