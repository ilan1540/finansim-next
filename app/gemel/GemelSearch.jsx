'use client'
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGemelById } from './apiGemelQuery';
import { useAppContext } from '../context/AppContext';
import MyTable from './MyTable';
import { columns } from './headerCol';

export default function GemelSearch({id}) {  
  
 const {year} = useAppContext() 
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gemel', id],
    queryFn: () => fetchGemelById(id),
    enabled: !!id, // רק אם יש ID
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(item => item.REPORT_PERIOD?.toString().slice(0, 4) === year.toString());
  }, [data, year]);


if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה: {error.message}</p>;

  return (
      <div className=''>
        <MyTable />
       {data ?(<MyTable
          data={filteredData}
          header={columns}
        />):(null)  }
      </div>
  );
}