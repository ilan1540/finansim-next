'use client'
import {useState} from 'react'
import { readData } from '../firebaseFunc'
//import Link from 'next/link'
export default function Asset() {
  const [data, setData] = useState()
  

  
  const onClickReadButton = () => {
    const colName = 'gemel'
    readData(colName, setData)
  }

console.log(data)
  return (
    <div >
      <div className='flex justify-between mb-1'>
      <div>
          <button className="text-white text-2xl rounded-3xl 
         px-3
          bg-sky-700 cursor-pointer hover:bg-sky-800"
      onClick={onClickReadButton}
      >read</button></div>
        <div>
         <button className="text-white text-2xl rounded-3xl 
         px-3
          bg-sky-700 cursor-pointer hover:bg-sky-800"
      onClick={onClickReadButton}
      >קלט נכסים</button> 
      </div>
      <div>3</div>
      </div>
      <div className="bg-amber-100 ">
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
{    data && data.map((item,i) => (
     <div key={data[i].id} className="bg-white rounded-lg shadow p-4 border">
     <div className='text-lg font-semibold  border-b  flex justify-around '>
      <h2 className="">{item.menal}</h2>
      <h2 className="">מוטב</h2>
      <h2 className="">{item.motv}</h2>
</div>
    <div  className='grid grid-cols-2 grid-row-4 gap-1'>
      <h2>תאריך הפקדה:</h2>
      <h2>{item.date}</h2>
      <h2> קצבה מזכה:</h2>
      <h2>{item.mezka}</h2>
      <h2> קצבה מוכרת:</h2>
      <h2>{item.mokert}</h2>
      <h2> סך הפקדה :</h2>
      <h2>{item.total}</h2>
    </div>
   </div>
))}
   </div>
  </div>
  </div>
  )
}

