"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender
} from "@tanstack/react-table";
import { useAppContext } from "../context/AppContext";

/* פורמט מספר */
const formatNumber = n =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(n || 0));

/* פורמט תאריך */
const formatDate = d => {
  if (!d) return "";
  const t = new Date(d);
  return `${String(t.getDate()).padStart(2, "0")}-${String(
    t.getMonth() + 1
  ).padStart(2, "0")}-${t.getFullYear()}`;
};

export default function GenericTable({ headers }) {

  const { bank, loadingBank } = useAppContext();
  const data = bank || [];

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  /* בניית עמודות */
  const columns = useMemo(
    () =>
      headers.map(col => {
        if (col.type === "action") {
          return {
            id: col.key,
            header: col.label,
            enableSorting: false,
            cell: ({ row }) => (
              <Link
                href={`/bank/${encodeURIComponent(row.original.id)}`}
                className="hover:text-blue-600"
              >
                ✏️
              </Link>
            )
          };
        }

        return {
          accessorKey: col.key,
          header: col.label,
          cell: info => {
            const v = info.getValue();
            if (col.type === "date") return formatDate(v);
            if (col.type === "number") return formatNumber(v);
            return v || "—";
          }
        };
      }),
    [headers]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  /* סיכומים רק על המסונן */
  const totals = useMemo(() => {
    const result = {};
    const rows = table.getFilteredRowModel().rows.map(r => r.original);

    headers.forEach(h => {
      if (h.sum) {
        result[h.key] = rows.reduce(
          (sum, row) => sum + Number(row[h.key] || 0),
          0
        );
      }
    });

    return result;
  }, [bank, globalFilter, headers]);

  if (loadingBank) return <div>טוען נתוני בנק...</div>;

  return (
    <div>

      <input
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="חיפוש"
        className="border p-1 mb-2 rounded"
      />

      <table className="min-w-full border" dir="rtl">

        <thead className="bg-gray-200">
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => {
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-3 py-1 text-right"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {sorted === "asc" && " ▲"}
                    {sorted === "desc" && " ▼"}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="even:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-2 py-1 border text-right">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot className="bg-gray-100 font-bold">
          <tr>
            {headers.map((h, i) => (
              <td key={i} className="px-2 py-1 text-right">
                {h.sum ? formatNumber(totals[h.key]) : ""}
              </td>
            ))}
          </tr>
        </tfoot>

      </table>
    </div>
  );
}
