'use client'   
import {useState, useEffect} from 'react'
import { PageHeader } from '../components/PageHeader'
import UploadCSV from '../kelet/UploadCsvFile'
<import>UploadCsvF</import>
import { addOneNewDoc } from '../firebaseFunc'
import { useAppContext } from '../context/AppContext'
import { convertRowTypes } from '../globalFunc' 


export default function upload() {
  const [tosave, setTosave] = useState()
  const  {  csvFile}  = useAppContext()
//  console.log(csvFile)

 // csvFile.data && console.log('first row:', csvFile.data[0]) 
  
     



  useEffect(() => {
    // This will run when csvFile changes
   const toSave = csvFile.data && csvFile.data.map((row) => convertRowTypes(row))
 // console.log('converted data:', toSave) 
  setTosave(toSave)
  }, [csvFile]);

console.log('tosave state:', tosave)

const [fileName, setFileName] = useState('bank')

  const saveToFirebase = () => {
   try {
 // console.log(csvFile)
} catch (error) {
  console.log(error)
} finally {
     tosave && tosave.map((rec) => {
       console.log(rec)
       addOneNewDoc(fileName,rec)
       
  })
}
  
}

  return (
    <>
    <div  className='flex justify-around p-2'>
      <PageHeader word1='קלט' word2='קבצים' />
      </div>
      <div>
        <label>colaction name</label>
        <input 
            defaultValue={fileName}
          onChange={(e) => { setFileName(e.target.value) }}
          placeholder='הקש שם טבלה'
        />
        <UploadCSV />
        {csvFile &&  <div>
          <h3>File: {csvFile.data && csvFile.data.name}</h3>
          <p>Rows: {csvFile.data && csvFile.data.length}</p>
        </div> || <p>No file uploaded</p>}
        <button className='bg-blue-400 text-2xl p-4'
        onClick={saveToFirebase}
        >Save to fireStore</button>
      </div>
      </>
  )
}
