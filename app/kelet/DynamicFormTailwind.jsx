
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from '../context/AppContext';
import { addNewDoc } from "../firebaseFunc";



const fields = [
  { name: "accountNo", label: "מספר חשבון", type: 'number', placeholder: "מספר חשבון" },
  { name: "foundId", label: "קוד קופה", type: 'number', placeholder: "קוד קופה" },
  { name: "foundName", label: "שם קופה", type: 'text', placeholder: "שם קופה..." },
  { name: "openDate", label: "תאריך פתיחה", type: 'text', placeholder: "dd/mm/yyyy" },
  { name: "kMezaka", label: "קצבה מזכה", type: 'number', placeholder: "סכום מזכה..." },
  { name: "kMokeret", label: "קצבה מוכרת", type: 'number', placeholder: "סכום מוכרת..." },
  { name: "pratim", label: "פרטים", type: 'textarea', placeholder: "פרטים נוספים..." },
];

const gofMenahel = [
  'מור בית השקעות',
  'הפניקס אקסלנס',
  'אלטשולר שחם',
  'ילין לפידות',
  'מיטב דש',
  'כלל חבר לביטוח',
  'הראל חברה לביטוח',
];
const sogKopa = [
    'קופת גמל',
    'קופת גמל להשקעה',
    'קרן השתלמות',
    'פוליסת ביטוח',
  ]

export default function DynamicFormWithSelect() {
  const { register, handleSubmit, reset, formState: { errors,isValid } } = useForm({mode:'onSubmit'});
  const [showError, setShowError] = useState(true);

  const {message, setMessage} = useAppContext()

/*
const saveDataToFirestore = async (data) => {
  try {
    const colName = "gemel";
    const recToSave = {
      accountNo:data.accountNo,
      kMezaka: data.kMezaka,
      kMokere: data.kmokeret,
      manager:data.manager,
      motav: data.motav,
      openDate: data.openDate,
      pratim: data.pratim,
      sogkopa: data.sogKopa,
    }
    await
      addNewDoc(colName,recToSave,setMessage)
    console.log(message);
  } catch (error) {
    console.error("שגיאה בהוספה ל-Firestore:",message, error);
  }
};
*/


  const onSubmit = (data) => {
     setShowError(false);
    console.log("Form Data: success", data);
    addNewDoc('gemel',data,setMessage)


  };

  const onError = () => {
    setShowError(true);
  };

  


  return (
      <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit, onError)}
        className="max-w-7xl min-h-65 mx-auto p-2 bg-white rounded-lg shadow-md space-y-1 border-2">
        <div className="flex flex-6 gap-4">
         {/*col-1 */} 
        <div className="w-50 h-50">
         {/*  שדה גוף מנהל */}
      <div className="flex flex-col">
        <label htmlFor="manager" className="mb-1 font-medium text-gray-700">
          גוף מנהל
        </label>
        <select
          id="manager"
          {...register("manager", { required: "יש לבחור גוף מנהל" })}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- בחר --</option>
          {gofMenahel.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
              </select>
  {/*  מבטל הערה 
  {errors.manager && (<span className="text-red-500 text-xl mt-1">{errors.manager.message}</span>
        )}
  */}            
      </div>
            <div key={fields[0].name} className="flex flex-col">
          <label htmlFor={fields[0].name} className="mb-1 font-medium text-gray-700">
            {fields[0].label}
          </label>
          <input
            type={fields[0].type}
            {...register(fields[0].name, { required: true })}
            placeholder={fields[0].placeholder}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[fields.name] && <span className="text-red-500 text-xl">שדה חובה</span>}
            </div>
            <div  className="flex flex-col">
          <label htmlFor={fields[3].name} className="mb-1 font-medium text-gray-700">
            {fields[3].label}
          </label>
          <input
            type={fields[3].type}
            {...register(fields[3].name, { required: true })}
            placeholder={fields[3].placeholder}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[fields.name] && <span className="text-red-500 text-xl">שדה חובה</span>}
        </div>
          </div>
          {/*col-2 */} 
          <div className="w-50 h-50">
            {/* שדה סוג קופה */}
      <div className="flex flex-col">
        <label htmlFor="manager" className="mb-1 font-medium text-gray-700">
          סוג קופה 
        </label>
        <select
          id="sogkopa"
          {...register("sogkopa", { required: "יש לבחור סוג קופה" })}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- בחר --</option>
          {sogKopa.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
            </select>
       {/* מבטל הערה
       {errors.sogkopa && (<span className="text-red-500 text-xl mt-1">{errors.sogkopa.message}</span>
              )}
       */}    
 
               <div  className="flex flex-col">
          <label htmlFor={fields[4].name} className="mb-1 font-medium text-gray-700">
            {fields[4].label}
          </label>
          <input
            type={fields[4].type}
            {...register(fields[4].name, { required: true })}
            placeholder={fields[4].placeholder}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[fields.name] && <span className="text-red-500 text-xl">שדה חובה</span>}
              </div>
               <div  className="flex flex-col">
          <label htmlFor={fields[5].name} className="mb-1 font-medium text-gray-700">
            {fields[5].label}
          </label>
          <input
            type={fields[5].type}
            {...register(fields[5].name, { required: true })}
            placeholder={fields[5].placeholder}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[fields.name] && <span className="text-red-500 text-xl">שדה חובה</span>}
        </div>
          </div>
          </div>
          {/*col-3 */} 
          <div className="w-100 h-50">
            <div  className="flex flex-col">
          <label htmlFor='discription' className="mb-1 font-medium text-gray-700">
            פרטים נוספים
          </label>
            <textarea className="border  border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             id='discription'
            rows={7}
             placeholder='הערות'
            {...register('pratim')}>            
          </textarea> 
        </div>
          </div>
          {/*col-4 */} 
        {/* שדה מוטב */}      
          <div className="w-50 h-50 flex flex-col gap-5 ">
            <div className="text-center ">
            <label>מוטב</label>
            </div>  
            <label>
            <input
           type="radio"
            value="אילן"
            {...register("motav", { required: "יש לבחור מוטב" })}
        className="accent-blue-500 mx-2 "
      />
       גמל אילן
      </label>
      <label>
      <input
        type="radio"
        value="הדס"
        {...register("motav", { required: "יש לבחור מוטב" })}
        className="accent-blue-500 mx-2"
      />
       גמל הדס
       </label>
      {/* מבטל הערה
      {errors.motav && (
      <span className="text-red-500 text-xl mt-1">{errors.motav.message}</span>
            )}
      */}      

          </div>
          {/*col-5 */}
          <div className="flex flex-col gap-5 w-50 h-50" >
            <div className="text-center ">
            <label>{showError ? (<p className="text-red-500 mt-2 font-bold">יש למלא שדות חובה</p>
              ) : (<p className="text-green-500 mt-2 font-bold">{'succss'}</p>)}</label>
            </div> 
            {!showError ? ( <button
        type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">נשמר
            </button>) : (
                 <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">בדיקה</button>
        )}
        
        <button
        type="button"
              onClick={() => { reset(); setShowError(fields)}}
         className="w-full bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition-colors mt-2">נקה טופס
            </button>
         </div>        
        </div>
      </form>
      </div>
  );
}



   