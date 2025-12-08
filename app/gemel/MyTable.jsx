
import { useEffect, useMemo, useState } from 'react';
import {
   useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,  
} from '@tanstack/react-table';
import {
  ArrowUpDown,} from "lucide-react";
import {columns} from './headerCol'
import BackButton from '../components/BackButton';
//const columnHelper = createColumnHelper();
//console.log(columns)
import { useAppContext } from '../context/AppContext';



export default function MyTable({ data }) {
  const [years, setYears] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
 const {year,setYear} = useAppContext()


   const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    return data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  }, [data, globalFilter]);


  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    
  });
  // ריכוז השנים לטבלה
 const  {FUND_ID, FUND_NAME} =  data?.[0] || {}
 
 
  
  useEffect(() => {
    const year1 = "2024";

  const filteredData = data?.filter(
  item => item.REPORT_PERIOD?.toString().slice(0, 4) == year1
);
 //   console.log(year,data,filteredData)
  },[data,year])
  return (
    <>
      {data  ? (
        <div className="p-4 " dir='rtl'> 

          <div className='flex underline'>
            <h1 className='mx-auto text-2xl'>{` מספר קופה-${FUND_ID}  ${FUND_NAME} לשנת ${year}`}</h1>
            <BackButton />
          </div> 
 
       {/*  <input
        type="text"
        placeholder="חפש..."
        className="mb-4 p-2 border rounded w-full"
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
      />
 */}
  
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
          </div>
          
   ):(null)}
    </>
  );



}