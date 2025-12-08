import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender
} from "@tanstack/react-table";

import TableHeader from "./TableHeader";
import { columns } from "./columns";

export const Table = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  console.log(columns)
  console.log(data)
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  // ✅ ה-return חייב להיות בתוך הפונקציה
  return (
    <div className="overflow-auto rounded-lg border shadow">
      {data?.length > 0 && (
        <table className="min-w-full text-sm" dir="rtl">
          <TableHeader columns={table} />

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="even:bg-gray-50 hover:bg-blue-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 text-right border-b">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
