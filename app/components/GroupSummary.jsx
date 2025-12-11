'use client';
import { useAppContext } from "../context/AppContext";
import { useMemo, useState } from "react";
import moment from "moment";

// פורמט מספרים
const formatNumber = (num) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(num || 0));

// פורמט תאריך
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${d.getFullYear()}`;
};

export default function GroupSummary() {
  const { bank } = useAppContext();
  const [openGroups, setOpenGroups] = useState({});

  // קיבוץ לפי group
  const groupedData = useMemo(() => {
    const result = {};
    bank.forEach((row) => {
      const groupName = row.group || "לא משוייך";
      if (!result[groupName]) result[groupName] = [];
      result[groupName].push(row);
    });
    return result;
  }, [bank]);

  // חישוב סיכומים לכל קבוצה
  const groupTotals = useMemo(() => {
    const totals = {};
    Object.entries(groupedData).forEach(([group, rows]) => {
      const deabitSum = rows.reduce((sum, r) => sum + Number(r.deabit || 0), 0);
      const creaditSum = rows.reduce(
        (sum, r) => sum + Number(r.creadit || 0),
        0
      );
      totals[group] = { deabit: deabitSum, creadit: creaditSum };
    });
    return totals;
  }, [groupedData]);

  const toggleGroup = (groupName) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <div className="space-y-4">
      {Object.keys(groupedData).map((group) => (
        <div
          key={group}
          className="border rounded shadow p-3 bg-gray-50"
        >
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => toggleGroup(group)}
          >
            <div className="font-bold">{group}</div>
            <div>
              סך חובה: {formatNumber(groupTotals[group].deabit)} | סך זכות:{" "}
              {formatNumber(groupTotals[group].creadit)} | רשומות:{" "}
              {groupedData[group].length} {openGroups[group] ? "▲" : "▼"}
            </div>
          </div>

          {openGroups[group] && (
            <table className="min-w-full text-sm mt-2 border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-3 py-1 border">תאריך</th>
                  <th className="px-3 py-1 border">פעולה</th>
                  <th className="px-3 py-1 border text-right">חובה</th>
                  <th className="px-3 py-1 border text-right">זכות</th>
                </tr>
              </thead>
              <tbody>
                {groupedData[group].map((row, idx) => (
                  <tr key={idx} className="even:bg-gray-50">
                    <td className="px-3 py-1 border">{formatDate(row.date)}</td>
                    <td className="px-3 py-1 border">{row.peola}</td>
                    <td className="px-3 py-1 border text-right">
                      {formatNumber(row.deabit)}
                    </td>
                    <td className="px-3 py-1 border text-right">
                      {formatNumber(row.creadit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
