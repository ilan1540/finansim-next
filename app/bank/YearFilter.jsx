"use client";
import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";

export default function YearFilter() {

  const { selectedYear, setSelectedYear, bank } = useAppContext();

  const years = useMemo(() => {

    const set = new Set();

    bank.forEach(r => {
      if (r.date) {
        set.add(new Date(r.date).getFullYear());
      }
    });

    return Array.from(set).sort((a, b) => b - a);

  }, [bank]);

  return (
    <div className="mb-3">

      <select
        value={selectedYear}
        onChange={e => setSelectedYear(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="ALL">כל השנים</option>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

    </div>
  );
}
