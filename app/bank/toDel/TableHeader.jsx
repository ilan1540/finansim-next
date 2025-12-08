import { flexRender } from "@tanstack/react-table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export default function TableHeader({ table }) {
  return (
    <thead className="bg-gradient-to-r from-blue-100 to-blue-200 sticky top-0 z-10">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            const sorted = header.column.getIsSorted();
            const canSort = header.column.getCanSort();

            return (
              <th
                key={header.id}
                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                className={`
                  px-4 py-3 text-right font-bold text-gray-800
                  ${canSort ? "cursor-pointer hover:bg-blue-300" : ""}
                  select-none transition
                `}
                aria-sort={
                  sorted === "asc" ? "ascending" :
                  sorted === "desc" ? "descending" :
                  "none"
                }
              >
                <div className="flex items-center justify-end gap-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {canSort && (
                    <>
                      {sorted === "asc" && <ChevronUp size={16} />}
                      {sorted === "desc" && <ChevronDown size={16} />}
                      {!sorted && (
                        <ChevronsUpDown size={14} className="opacity-50" />
                      )}
                    </>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
