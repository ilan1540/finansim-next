'use client'
import { useState } from 'react';
import Papa from 'papaparse';
import { useAppContext } from '../context/AppContext';
export default function UploadCSV() {
  const [jsonData, setJsonData] = useState([]);

  const {csvFile, setCsvFile} = useAppContext()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
      //console.log('JSON Data:', results.data);
        const fileData = {
          fileName: e.target.files[0].name,
          data: results.data, 
        }
        setJsonData(results.data);
        setCsvFile(fileData)
      //console.log(csvFile)
      },
      error: function (err) {
        console.error('CSV parsing error:', err);
      }
    });
  };
//console.log(csvFile)
  return (
    <div className="p-4">
      <label
        htmlFor="csv-upload"
        className="bg-blue-500 block text-white font-bold px-4 py-2 rounded-2xl cursor-pointer text-center w-40"
      >
        בחר קובץ
        <input
          type="file"
          accept=".csv"
          id="csv-upload"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
