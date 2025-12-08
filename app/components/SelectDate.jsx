"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

export const SelectDate = ({ label, value, setValue }) => {
  return (
    <div className="flex  gap-2">
     
      <div className="relative w-full">
        {/* אייקון קלנדר */}
        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

        {/* פיקר תאריך */}
        <DatePicker
          selected={value}
          onChange={(date) => setValue(date)}
          dateFormat="dd.MM.yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          className="w-full pl-10 pr-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};
