'use client'
import { useState } from "react"
import { PageHeader } from "../components/PageHeader"
//import { getGemelData, getByFoundId } from "./apiGemelFunc"
//import { useAppContext } from "../context/AppContext"
import Link from "next/link"
import BackButton from "../components/BackButton"
import { YearsSlider } from '../components/YearsSlider';

export default function page() {
  const [id, setId] = useState(null)
 // const [result, setResult] = useState(null)
 // const { gemel } = useAppContext()
  
  const onChangeId =  (e) => {
  const  id = e.target.value
    setId(id)
  }

 // console.log(gemel)

  return (
    <div dir='rtl' className="flex justify-between text-2xl">
      <div className="border-b-2" >
        <span className="flex gap-1 ">
          <div className="card-title">
            <h2>פרטי קופה:</h2>
          </div>
          <input type="text"
          className="w-30   text-center border-none focus:outline-none"
          placeholder="מספר קופה"
          onChange={onChangeId} />
        <div>
            <Link type="button" className="text-white bg-blue-500 hover:bg-blue-700 rounded-full  px-6 text-center" href={`/gemel/${id}`} >הצג</Link>
        </div> 
      </span>
      </div>
        <PageHeader 
        word1={'נתוני גמל נט'}
        word2={'משרד האוצר'} />
       <YearsSlider />
        <BackButton />
      </div>
  )
}
