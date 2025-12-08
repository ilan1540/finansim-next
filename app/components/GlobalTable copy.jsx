import { useEffect, useMemo, useState } from 'react';
import {
   useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getRowModel,
  flexRender,
 // createColumnHelper,  
} from '@tanstack/react-table';
import {
  ArrowUpDown,} from "lucide-react";
//import {columns} from './headerCol'
//import BackButton from '../components/BackButton';
//const columnHelper = createColumnHelper();
//console.log(columns)
//mport { useAppContext } from '../context/AppContext';



export default function GlobalTable({ data }) {
  //const [years, setYears] = useState([]);
  //const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
 //const {year,setYear} = useAppContext()


   const columns = useMemo(() => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key,
  }));
}, [data]);



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });
  
 
  
  
  return (
    <>
     
    <div className="p-4 " dir='rtl'> 

       
        {columns && data ? (
  <table className="min-w-full table-auto ">
      <thead className=" bg-white  shadow">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className=' py-2 text-xl font-bold text-black border-b-2 text-right ' >
                      <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center  "
                          : "",
                        onClick: header.column.getToggleSortingHandler(), 
                      }}
                    >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                          )}
                            <ArrowUpDown className="ml-2" size={16} />  
                        </div>
                    </th>
            ))}
            </tr>
        ))}
      </thead>
      <tbody className=''>
        {table.getRowModel().rows.map(row => (
          <tr  key={row.id} className='hover:bg-gray-200'>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className=" px-4 py-0.5 text-right  ">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
          </table>
  ):(null)}
    
          </div>
          
 
    </>
  );



}