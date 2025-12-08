"use client";
import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";

const fmt = n =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(n || 0));

export default function GroupSummary() {

  const { bank, loadingBank } = useAppContext();
  const [open, setOpen] = useState({});

  const groups = useMemo(() => {

    const g = {};

    bank.forEach(row => {
      const key = row.sog || "לא משויך";

      if (!g[key]) {
        g[key] = { rows: [], deabit: 0, creadit: 0, net: 0 };
      }

      g[key].rows.push(row);
      g[key].deabit += Number(row.deabit || 0);
      g[key].creadit += Number(row.creadit || 0);
      g[key].net += Number(row.creadit || 0) - Number(row.deabit || 0);
    });

    return g;

  }, [bank]);

  if (loadingBank) return <div>טוען קיבוצים...</div>;

  return (
    <div className="space-y-3">

      {Object.entries(groups).map(([group, info]) => (

        <div key={group} className="border rounded">

          <div
            onClick={() => setOpen(p => ({ ...p, [group]: !p[group] }))}
            className="cursor-pointer bg-gray-100 p-2 flex justify-between"
          >
            <span className="font-bold">{group}</span>

            <span className="flex gap-5">
              <span className="text-red-600">חובה {fmt(info.deabit)}</span>
              <span className="text-green-600">זכות {fmt(info.creadit)}</span>
              <span className={info.net >= 0 ? "text-green-700" : "text-red-700"}>
                נטו {fmt(info.net)}
              </span>
              <span>{open[group] ? "▲" : "▼"}</span>
            </span>
          </div>

          {open[group] && (
            <div className="p-2">

              <table className="w-full text-sm">
                <tbody>
                  {info.rows.map(r => (
                    <tr key={r.id} className="border-t">
                      <td>{r.peola}</td>
                      <td className="text-red-600">{fmt(r.deabit)}</td>
                      <td className="text-green-600">{fmt(r.creadit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>

      ))}

    </div>
  );
}
