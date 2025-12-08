//import React from 'react';
import { useForm } from 'react-hook-form';
import { addNewDoc } from '../firebaseFunc';
import { useAppContext } from '../context/AppContext';

export const KeketFrom = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { gemel, setGemel } = useAppContext()
  const onSubmit = async (data) => {
    console.log(data)
    const colName = 'gemel'
    const rec = {
      date: data.date,
      foundID: data.foundID,
      foundName: data.foundName,
      accountNo: data.accountNo,
      gofMemhel: data.gofMemhel,
      motav: data.motav,
      mozar: data.mozar
    }
    try {
      await addNewDoc(colName, rec, setGemel)
    } catch (err) {
      console.log(err)
    }
    
    console.log(gemel);
    console.log(errors)
  };

  const sogKupa = [
    'קופת גמל',
    'קופת גמל להשקעה',
    'קרן השתלמות',
    'פוליסת ביטוח',
  ]

  const gofMenahel = [
    'מור בית השקעות',
    'אלטשולר שחם',
    'ילין לפידות',
    'מיטב דש',
    'כלל חבר לביטוח',
    'הראל חברה לביטוח',
  ]

/*
      <input type={i.type} className='bg-white' placeholder={i.place} {...register(`${i.field}, { required: true,}`)} />
      */

  const inputRec = [(
    <div className='flex flex-row gap-2 items-center'>
      <label></label>
      
   </div>)]

  const inputFilelds = [{
    field: 'accountNo',
    name: 'מספר חשבון',
    type: 'number',
    place: 'הקש מספר חשבון...',
  },
  {
    field: 'foundId',
    name: 'קוד קופה',
    type: 'number',
    place: 'הקש קוד קופה  ...',
  },
  {
    field: 'foundName',
    name: 'שם קופה',
    type: 'text',
    place: 'הקש  שם קופה...',
  },
  {
    field: 'openDate',
    name: 'תאריך פתיחה',
    type: 'text',
    place: 'הקש   תאריך פתיחת הקופה...',
  },
  {
    field: 'kMokeret',
    name: 'קיצבה מוכרת',
    type: 'number',
    place: 'הקש סכום קצבה מוכרת ...',
  },
  {
    field: 'kMezaka',
    name: 'קצבה מזכה',
    type: 'number',
    place: 'הקש סכום קצבה מזכה...',
  },
  {field: 'pratim',
    name: 'פרטים',
    type: 'text',
    place: 'הקש פרטים נוספים  ...',
    }, 
  ]

  /*
<div  key={i} className='flex flex-row gap-2 items-center'>
              <label>{i.name }</label>
          <input type={i.type} className='bg-white' placeholder={i.place} {...register(`${i.field}, { required: true,}`)} />
            </div>
  */
  
  return (
    <div className='w-170 mx-auto border-2 rounded-2xl'>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className='p-5 flex flex-row '>
        <div className='flex flex-col m-2'>
          <label>מוטב</label>
        <div className='mx-2  flex flex-col'>
            <div>
              <input className='mx-1' {...register("motav", { required: true })} type="radio" value="אילן" />
            <label>קופה על שם אילן</label>
              </div>
              <div>
              <input className='mx-1' {...register("motav", { required: true })} type="radio" value="הדס" />
            <label>קופה על שם הדס</label>
              </div>
            </div>
 <div className='flex flex-row'> 
        <label>בחר סוג קופה</label>
            <select {...register("sogKupa", { required: true })}>
              {sogKupa.map((sog)=> <option key={sog} value={sog}>{sog}</option>)}
        </select>   
          <label>בחר בית השקעות מנהל</label>
            <select {...register("gofMemhel", { required: true })}>
              {gofMenahel.map((gof)=> <option key={gof} value={gof}>{gof}</option>)}
              </select>
             
        </div>
             <div>1111
              {inputRec.map((i) => {
              <div  key={i} className='flex flex-row gap-2 items-center'>
              <label>{inputFilelds[i].name }</label>
          <input type={inputFilelds[i].type} className='bg-white' placeholder={inputFilelds[i].place} {...register(`${inputFilelds[i].field}, { required: true,}`)} />
            </div>
              })} 
                </div>
        
        </div>
        

        
      </div>
        <div className='flex justify-around items-center mb-2'>
         <button 
        onClick={onSubmit}
            className="bg-blue-600   hover:bg-blue-800 text-2xl text-white font-semibold py-2 px-4 rounded shadow">שמור נתונים</button>
         
        </div>
      </form>
      </div>
  );
}


