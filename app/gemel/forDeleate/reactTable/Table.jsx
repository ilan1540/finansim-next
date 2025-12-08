import {useState,useEffect} from 'react'
import {
  createColumnHelper,
  flexRender,
 // getHeaderGroups,
  getPaginationRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  // Mail,
 // Phone,
  Search,
  Eraser, 
  //User,
} from "lucide-react";

const columnHelper = createColumnHelper();

export const Table = ({data, header}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columns, setColumns] = useState([]);

  console.log(header,data)

  const heandelColumns = () => {
    let arr = []
    header.map((i) => arr.push(
      columnHelper.accessor(i.field, {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2">{i.name}</div>
      </span>
    ),
      }),
      
    ))
   setColumns(arr) 
  }

  useEffect(() => {
    heandelColumns()
  }
  ,[header])
  
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
   getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
 
   onGlobalFilterChange: setGlobalFilter,
   getFilteredRowModel: getFilteredRowModel(),
  })

  


  return (
    <div className='flex flex-col   mx-auto   sm:px-6 lg:px-8'>ReactTable
      <div className="mb-4 relative">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button onClick={()=>console.log('clear')}>
          <Eraser
          className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400 cursor-pointer"
          size={20}
          
        />
        </button>
        
      </div>

      <div className=" bg-white shadow-md rounded-lg">
        {data ?(<table className="min-w-full divide-y divide-gray-200">
          {columns ? (
            <thead className='bg-gray-50 overflow-y-auto'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className='' >
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className='px-6 py-2 text-right text-xs font-bold text-gray-500 ' >
                      <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center "
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
          ) : (null)}
          
          {data ? (
          <tbody className='bg-white divide-y divide-gray-200' >
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='hover:bg-gray-100'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-1 py-1 whitespace-nowrap text-sm text-right text-gray-500'>
                    {flexRender(cell.column.columnDef.cell,
                      cell.getContext())}
                  </td>
                ))}
              </tr>
            ) )
            }
          </tbody>
          ) :(null)}
       </table>):(null)}
        
      </div>
      <div className='flex justify-between mt-2 bg-gray-300'>
        <div className='text-center'>
          <span className="m-2">רשומות לדף</span>
          <select
            className="w-20 border text-center border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
        </select>
        </div>
       <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

           <span className="flex items-center">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span> 

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button> 
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        

        
      </div>
    </div>
  )
}


