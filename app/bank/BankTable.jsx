"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useContext } from "react";
import { useAppContext } from "../context/AppContext";

const ALL_COLUMNS = {
  date: "תאריך",
  peola: "פעולה",
  deabit: "חובה",
  creadit: "זכות",
  yitra: "יתרה",
};

export default function BankTablePro() {
  const { bank } = useAppContext();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [visibleCols, setVisibleCols] = useState(ALL_COLUMNS);

  // פאג'ינציה
  const [page, setPage] = useState(1);
  const pageSize = 30;

  /** ----------  סינון לפי ערכים + חיפוש  ------------------- **/
  const filtered = useMemo(() => {
    let rows = bank || [];

    // סינון לפי עמודה
    Object.keys(filters).forEach((key) => {
      if (filters[key])
        rows = rows.filter((row) =>
          String(row[key] || "").includes(filters[key])
        );
    });

    // חיפוש חופשי
    if (search.trim() !== "") {
      rows = rows.filter((row) =>
        Object.values(row).some((v) =>
          String(v || "").includes(search.trim())
        )
      );
    }

    return rows;
  }, [bank, search, filters]);

  /** ----------   חלוקה לעמודים   ------------------- **/
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  /** ----------   סיכומים   ------------------- **/
  const sum = (field) =>
    filtered.reduce((acc, row) => acc + (row[field] || 0), 0);

  const formatNumber = (n) =>
    n ? n.toLocaleString("he-IL") : "";

  return (
    <div className="w-full p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        
        {/* חיפוש */}
        <input
          className="border p-2 rounded-lg w-60"
          placeholder="חיפוש..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* נראות עמודות */}
        <div className="flex gap-3 mx-auto">
          <label>טבלת תנועות בנק</label>
          {Object.keys(ALL_COLUMNS).map((col) => (
            <label key={col} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={visibleCols[col]}
                onChange={() =>
                  setVisibleCols((prev) => ({
                    ...prev,
                    [col]: !prev[col],
                  }))
                }
              />
              
              {ALL_COLUMNS[col]}
            </label>
          ))}
        </div>
      </div>

      {/* טבלה */}
      <div className="max-h-[65vh] overflow-y-auto border rounded-lg shadow">
        <table className="w-full border-collapse text-sm">

          {/* כותרת */}
          <thead className="bg-gray-200 sticky top-0 z-10">
            
            <tr>
              {Object.entries(visibleCols).map(
                ([key, label]) =>
                  visibleCols[key] && (
                    <th key={key} className="p-2 border">
                      {label}

                      {/* פילטר */}
                      <input
                        className="border rounded p-1 w-full mt-1 text-xs"
                        placeholder={`סינון ${label}`}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                      />
                    </th>
                  )
              )}
            </tr>
          </thead>

          {/* גוף */}
          <tbody>
            {paged.map((row, idx) => (
              <tr key={idx} 
                 onClick={() => router.push(`/bank/${row.id}`)}
              className="cursor-pointer hover:bg-blue-50 transition">

                {visibleCols.date && (
                  <td className="p-2 border">
                    {row.date ? new Date(row.date).toLocaleDateString("he-IL") : ""}
                  </td>
                )}

                {visibleCols.peola && (
                  <td className="p-2 border">{row.peola}</td>
                )}

                {visibleCols.deabit && (
                  <td className="p-2 border text-red-600">
                    {formatNumber(row.deabit)}
                  </td>
                )}

                {visibleCols.creadit && (
                  <td className="p-2 border text-green-700">
                    {formatNumber(row.creadit)}
                  </td>
                )}

                {visibleCols.yitra && (
                  <td className="p-2 border">{formatNumber(row.yitra)}</td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* פאג'ינציה */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-300 rounded-lg hover:bg-blue-400 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← קודם
        </button>

        <span className="font-bold">
          עמוד {page} / {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-blue-300 rounded-lg hover:bg-blue-400 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          הבא →
        </button>
      </div>

      {/* סיכומים מבטל הצגת סיכומים 
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-3">📌 סיכום נתונים (לפי סינון נוכחי)</h3>

        <div className="grid grid-cols-3 gap-4 text-center">

          <div className="bg-white p-3 rounded shadow">
            <p className="font-bold">סה״כ חובה</p>
            <p className="text-red-600 text-xl">{formatNumber(sum("deabit"))}</p>
          </div>

          <div className="bg-white p-3 rounded shadow">
            <p className="font-bold">סה״כ זכות</p>
            <p className="text-green-700 text-xl">{formatNumber(sum("creadit"))}</p>
          </div>

          <div className="bg-white p-3 rounded shadow">
            <p className="font-bold">מספר רשומות</p>
            <p className="text-xl">{filtered.length}</p>
          </div>

        </div>
      </div>
*/}
    </div>
  );
}
