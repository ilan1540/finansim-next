"use client";
import React, { useState, useMemo } from "react";
import YearFilter from "./YearFilter";
export default function GroupSummaryTable({ bank = [] }) {
  const rowsPerPage = 10;
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);

  const groups = useMemo(() => {
    return bank.reduce((acc, row) => {
      const g = row.group || "לא משויך";
      if (!acc[g]) acc[g] = [];
      acc[g].push(row);
      return acc;
    }, {});
  }, [bank]);

  const groupNames = Object.keys(groups);
  const pageCount = Math.ceil(groupNames.length / rowsPerPage);

  const currentGroups = groupNames.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const toggleExpand = (g) =>
    setExpanded((p) => ({ ...p, [g]: !p[g] }));

  const formatNumber = (num) =>
    Number(num || 0).toLocaleString("he-IL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="space-y-4 ">

      {/* TITLE */}
      <div className="flex mx-auto ">
      <h2 className="text-lg font-semibold text-center mx-2">
        סיכום תנועות לפי קבוצת הוצאה לשנת   
      </h2>
        <YearFilter />
        </div>
      {/* TABLE */}
      <div className="overflow-auto rounded-lg border shadow max-h-[70vh]">
        <table className="min-w-full  text-sm" dir="rtl">

          {/* HEADER */}
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-right">קבוצה</th>
              <th className="px-4 py-2 text-right">חובה</th>
              <th className="px-4 py-2 text-right">זכות</th>
              <th className="px-4 py-2 text-right">רשומות</th>
              <th className="px-4 py-2 text-center w-12"></th>
            </tr>
          </thead>

          <tbody>
            {currentGroups.map((g) => {
              const records = groups[g];
              const totalDebit = records.reduce(
                (s, r) => s + Number(r.deabit || 0),
                0
              );
              const totalCredit = records.reduce(
                (s, r) => s + Number(r.creadit || 0),
                0
              );

              return (
                <React.Fragment key={g}>
                  {/* GROUP ROW */}
                  <tr
                    onClick={() => toggleExpand(g)}
                    className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
                  >
                    <td className="px-4 py-2 font-medium">{g}</td>
                    <td className="px-4 py-2 tabular-nums">
                      {formatNumber(totalDebit)}
                    </td>
                    <td className="px-4 py-2 tabular-nums">
                      {formatNumber(totalCredit)}
                    </td>
                    <td className="px-4 py-2">{records.length}</td>
                    <td className="px-4 py-2 text-center">
                      {expanded[g] ? "▲" : "▼"}
                    </td>
                  </tr>

                  {/* DETAILS */}
                  {expanded[g] && (
                    <tr>
                      <td colSpan={5} className="bg-gray-50 p-3">
                        <div className="max-h-64 overflow-auto border rounded">

                          <table className="min-w-full text-xs" dir="rtl">
                            <thead className="bg-gray-300 sticky top-0">
                              <tr>
                                <th className="px-2 py-1 text-right">תאריך</th>
                                <th className="px-2 py-1 text-right">פעולה</th>
                                <th className="px-2 py-1 text-right">חובה</th>
                                <th className="px-2 py-1 text-right">זכות</th>
                              </tr>
                            </thead>

                            <tbody>
                              {records.map((r, i) => (
                                <tr
                                  key={i}
                                  className="even:bg-white hover:bg-gray-100"
                                >
                                  <td className="px-2 py-1">
                                    {r.date?.toLocaleDateString("he-IL")}
                                  </td>
                                  <td className="px-2 py-1">{r.peola}</td>
                                  <td className="px-2 py-1 tabular-nums">
                                    {formatNumber(r.deabit)}
                                  </td>
                                  <td className="px-2 py-1 tabular-nums">
                                    {formatNumber(r.creadit)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
        >
          הקודם
        </button>

        <span className="text-sm">
          עמוד {page} מתוך {pageCount}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === pageCount}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
        >
          הבא
        </button>
      </div>
    </div>
  );
}
