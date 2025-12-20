import { useState } from "react";
import BankTable from "./BankTable";
import GroupSummaryTable from "./GroupSummaryTable";
import UpdateByPeola from './UpdateByPeola';
import YearFilter from './YearFilter';
import UploadCsvFile from "./UploadCsvFile";
import Link from "next/link";
export default function TopBar({ bank }) {
  const [active, setActive] = useState("table");

  return (
    <div dir="rtl" className="w-full max-h-screen  bg-white shadow-md rounded-xl p-4 mb-4">

      {/* Header row */}
      <div className="flex items-center justify-between">

        {/* מספר רשומות */}
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-semibold">
          מספר רשומות: {bank ? bank.length : 0}
        </div>

        {/* כפתורי ניווט */}
        <div className="flex space-x-0 space-x-reverse">

          <button
            onClick={() => setActive("table")}
            className={`px-4 py-2 mx-2 rounded-xl transition-all 
              ${active === "table"
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-200 hover:bg-blue-300"
              }`}
          >
            הצגת טבלה
          </button>

          <button
            onClick={() => setActive("groups")}
            className={`px-4 py-2 mx-2 rounded-xl transition-all
              ${active === "groups"
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-200 hover:bg-blue-300"
              }`}
          >
            הצגה לפי קבוצה
          </button>

          <button
            onClick={() => setActive("update")}
            className={`px-4 py-2 mx-2 rounded-xl transition-all
              ${active === "update"
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-200 hover:bg-blue-300"
              }`}
          >
            עידכון קבוצה לפי סוג פעולה
          </button>
          <button
            onClick={() => setActive("upload")}
            className={`px-4 py-2 mx-2 rounded-xl transition-all
              ${active === "upload"
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-200 hover:bg-blue-300"
              }`}
          >
           קלט קובץ CSV 
          </button>
              <Link
        href="/bank/uploadcsvfile"
        className="px-4 py-2 mx-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all"
      >
        ייבוא CSV
          </Link>
          

        </div>

      </div>

      {/* קומפוננטות בהתאם לכפתור */}
      <div className="mt-4 p-4  bg-gray-50 rounded-xl shadow-inner">

        {active === "table" && (
         
          <div>     
             <BankTable data={bank} />
          </div>
        )}

        {active === "groups" && (
          <div>    
            <GroupSummaryTable  bank={bank} />
          </div>
        )}
        {active === "upload" && (
          <div>    
            <UploadCsvFile />
          </div>
        )}

        {active === "update" && (
          <div className="flex justify-center mx-3">    
            <UpdateByPeola /> 
          </div>
        )}
      
      </div>
      </div>    
  );
}
