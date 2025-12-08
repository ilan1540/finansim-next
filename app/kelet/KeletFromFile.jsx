'use client'

import UploadCSV from './UploadCsvFile'
import { PageHeader } from '../components/PageHeader'
import { useAppContext } from '../context/AppContext';
import KeletTable from './KeletTable';
import { useMemo, useState } from 'react';
import { addNewDoc,upDate } from '../firebaseFunc';

export default function kelet() {
const { csvFile, setCsvFile } = useAppContext()
  const [data, setData] = useState()
  const [columns, setColumns] = useState()
  const [add, setAdd] = useState()
  
  useMemo(() => {
    setData(csvFile.data);
    if (!data || data.length === 0) return [];
    const col = Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: () => <span className="font-bold">{key}</span>,
    cell: (info) => info.getValue()
    }));
    setColumns(col)
   },[csvFile,data])  
   
  const onSaveButtonClick = () => {
    console.log(data)
    const colName = 'gemel'
    if (!data || data.length === 0) {
      console.log('no data')
    } else {
      data.map((rec) => {
        addNewDoc(colName,rec,setAdd)
      })
       console.log(add) 
      }
    
  }
  
  const onSaveGemelAsset = () => {
    console.log(data)
    /*
    const colName = 'gemelAsset'
    if (!data || data.length === 0) {
      console.log('no data')
    } else {
      data.map((rec) => {
     //  const  id= rec.id
        const recToSave = {
         
             foundId,
             accuntNumber,
            foundName,
            gofMemhel,
            mozarName,
            motav,
            ytrot: {
            date,
            total, 
          },

        
      }
         addNewDoc(colName,recToSave,setAdd)
       // console.log('id=',id,  'rec=', recToSave)
      })
       console.log(add) 
      }
      */
  }
  // console.log('id=',id,  'rec=', recToSave)
  return (
    <div>
      <div className='sticky'>
    <div className="flex text-2xl justify-center ">
      <PageHeader 
        word1={'קלט'}
        word2={'קבצים'} />
      </div>
      
      <div className='flex justify-start items-center ' >
        <UploadCSV />
          <span> שם קובץ:{csvFile?.fileName}</span>
          <button className='bg-blue-500 rounded-2xl p-3 cursor-pointer'
      onClick={onSaveButtonClick}
          >save</button>
          <button className='bg-blue-500 rounded-2xl p-3 cursor-pointer'
      onClick={onSaveGemelAsset}
      >save gemel asset</button>
        </div>
        </div>
      {data ? (
       <KeletTable
      data={data}
      columns={columns}
     /> 
      ):(null) }
      
      </div>
  )
}
