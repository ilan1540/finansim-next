"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useContext } from "react";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import GenericButton from "../components/GenericButton";


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
  const [sort, setSort] = useState({ field: null, dir: "asc" });
/*
  useEffect(() => {
  if (!bank || bank.length === 0) return;

  bank.slice(0, 4).forEach((row, i) => {
    console.log(
      `Row ${i}`,
      row.date,
      "parsed:",
      new Date(row.date)
    );
  });
}, [bank]);
*/

  const [search, setSearch] = useState("");
  const [visibleCols, setVisibleCols] = useState(ALL_COLUMNS);

  // פאג'ינציה
  const [page, setPage] = useState(1);
  const pageSize = 30;

  /** ----------  סינון לפי ערכים + חיפוש  ------------------- **/
  const filtered = useMemo(() => {
  let rows = bank || [];

  if (search.trim() !== "") {
    const s = search.trim();
    rows = rows.filter((row) =>
      Object.values(row).some((v) =>
        String(v || "").includes(s)
      )
    );
  }

  if (sort.field) {
    rows = [...rows].sort((a, b) => {
      let av = a[sort.field];
      let bv = b[sort.field];

      if (sort.field === "date") {
        av = av ? new Date(av) : 0;
        bv = bv ? new Date(bv) : 0;
      } else {
        av = String(av || "");
        bv = String(bv || "");
      }

      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }

  return rows;
}, [bank, search, sort]);
 
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
        <div className="flex gap-4">

  <button
    className="px-3 py-1 bg-blue-400 rounded-full hover:bg-blue-500 text-xl"
    onClick={() =>
      setSort({ field: "date", dir: sort.dir === "asc" ? "desc" : "asc" })
    }
  >
    מיון תאריך {sort.field === "date" ? (sort.dir === "asc" ? "↑" : "↓") : ""}
  </button>

  <button
    className="px-3 py-1 bg-blue-400 rounded-full hover:bg-blue-500 text-xl"
    onClick={() =>
      setSort({ field: "peola", dir: sort.dir === "asc" ? "desc" : "asc" })
    }
  >
    מיון פעולה {sort.field === "peola" ? (sort.dir === "asc" ? "↑" : "↓") : ""}
  </button>
 {/* חיפוש */}
        <input
          className="border p-2 rounded-lg w-60"
          placeholder="חיפוש..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          <GenericButton
           label="הבא"
            onClick={() => setPage(p => p + 1)} />
          <GenericButton action="back" label="חזור" />
          <GenericButton action="last" label="סוף" onClick={()=>setPage(totalPages)} />

</div>

        
       

        {/* נראות עמודות */}
        <div className="flex gap-3 mx-auto">
          <label>טבלת תנועות בנק</label>
          {Object.keys(ALL_COLUMNS).map((col) => (
            <label key={col} className="flex items-center gap-2">

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
              className="cursor-pointer text-xl hover:bg-blue-50 transition">

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
    </div>
  );
}
