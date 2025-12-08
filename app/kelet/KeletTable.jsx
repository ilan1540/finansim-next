'use clinet'
import { useMemo } from 'react';
import { useAppContext } from "../context/AppContext"
import {
   useReactTable,
  getCoreRowModel,
 // getSortedRowModel,
  flexRender,
 // createColumnHelper,  
} from '@tanstack/react-table';


function KeletTable({
  data,
  columns,
}) {
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

   return (
    <div className="max-h-[500px] overflow-y-auto border rounded shadow">
      <table className="min-w-full ">
    <thead className="sticky top-0 z-10 bg-white shadow">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 border-b bg-gray-100 text-right">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
         </thead>
         <tbody>
          {table.getRowModel().rows.map((row) => (
             <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b text-right">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


         

export default KeletTable