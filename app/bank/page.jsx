"use client";
import Link from 'next/link';

import React, {useEffect,useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";
import GroupSummary from '../components/GroupSummary';
import GenericTable from '../components/GenericTable';
import YearFilter from './YearFilter';

export default function BankLoader() {
  const [showAll, setShowAll] = useState(false); // show all rec
  const [showFilter, setShowFilter] = useState(false); // show filterd rec
  const [editFilter, seteditFilter] = useState(false); // edit filterd rec
  const {bank, setBank, setLoadingBank } = useAppContext();


  const navLink = [
  {
      href: `/bankLoader`,
      name: 'כל הרשומות'
    },
    {
      href: '/group',
      name: 'הצג חלוקה לקבוצות'
    },
    {
      href: '/edit',
      name: 'עריכה'
    },
           
  ]
  const header = [
  { key: "edit", label: "✏️", type: "action", link: "/edit" },
  { key: "date", label: "תאריך", type: "date" },
  { key: "valueDate", label: "תאריך ערך", type: "date" },
  { key: "peola", label: "פעולה", type: "text" },
  { key: "sog", label: "סוג קבוצה", type: "text" },

  // 🔥 חשוב: שמות כפי שהם ב־Firestore
  { key: "deabit", label: "חובה", type: "number", sum: true },
  { key: "creadit", label: "זכות", type: "number", sum: true },

  { key: "yitra", label: "יתרה", type: "number" }
];
/*
  useEffect(() => {
    const loadBank = async () => {
      try {
        setLoadingBank(true);

        const snap = await getDocs(collection(db, "bank"));

        const data = snap.docs.map(doc => {
          const r = doc.data();

          return {
            id: doc.id,

            // ✅ התאמה לשמות האמיתיים ב־Firestore
            date: r.date?.toDate?.() || null,
            valueDate: r.valueDate?.toDate?.() || null,

            peola: r.peola || "",
            sog: r.sog || "",
            yitra: Number(r.yitra || 0),

            deabit: Number(r.deabit || 0),
            creadit: Number(r.creadit || 0)
          };
        });
        setBank(data);
    //    console.log("BANK LOADED", data[0]); // הדפסת רשומה 0

      } catch (error) {
        console.error("שגיאה טעינת bank:", error);
      } finally {
        setLoadingBank(false);
      }
    };

    loadBank();
  }, []);

*/
  return (
    <>
      <nav className="">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around p-3">    
          <div className='shrink'>
            
          {/* Nav Links */}
            <div className="flex font-bold text-black text-base bg-white p-1 rounded-3xl gap-4 ">
              {navLink.map((i) => <Link href={i.href} key={i.href} className='hover:text-blue-700' >{i.name}</Link>)}
              <p> מסםר רשומות {bank && bank.length }</p>
            </div>
            
          </div>
        </div>
      </nav>
      <YearFilter />
      <GenericTable headers={header} />
      <GroupSummary />
    </>
  )
}



/*
import React, {useEffect, useState } from "react";
//import DatePicker from "react-datepicker";
//import { getMonth, getYear } from 'date-fns';
//import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../context/AppContext";
import moment from "moment";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import { SelectDate } from "../components/SelectDate";
//import GlobalTable from "../components/GlobalTable";
//import { Table } from "./toDel/Table";
import GenericTable from "../components/GenericTable";
import  EditByGroup  from "./EditByGroup";
import GroupSummary from "../components/GroupSummary";

export default function BankDateFilter() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null)  ;
  const [results, setResults] = useState(null);
  const [scom, setScom] = useState(null); // בחר קומפוננט להצגה
  const { bank, setBank } = useAppContext()
  const [showBygroup, setShowByGroup] = useState(false); // show by group
  const [showBydate, setShowBydate] = useState(false); // show beetwin date
  const [showEdite, setShowEdite] = useState(false); // edite by peola
  

  

  const loadData = async () => {
    if (!fromDate || !toDate) {
      alert("בחר תאריך התחלה וסיום");
      return;
    }

    const from = moment(fromDate).startOf("day").toDate();
    const to = moment(toDate).endOf("day").toDate();

    const colRef = collection(db, "bank");

    const q = query(
      colRef,
      where("date", ">=", from),
      where("date", "<=", to),
      orderBy("date", "desc")
    );

   const snapshot = await getDocs(q);
   const data = snapshot.docs.map(doc => {
   const row = doc.data();

  return {
    id: doc.id,
    peola: row.peola || "", 
    sog: row.sog || "", 
    deabit: Number(row.deabit || 0),
    creadit: Number(row.creadit || 0),
    yitra: Number(row.yitra || 0),
    date: row.date?.toDate?.(),   // ✅ המרה ל־Date אמיתי
    valueDate: row.valueDate?.toDate?.() ?? null   // ✅ זה היה חסר!
  };
});
//console.log(data[0].valueDate, data[0].valueDate instanceof Date);

setResults(data);
setBank(data)
   
   setResults(data);
   //   console.log(results )
  };
  //  console.log(results )
  useEffect(() => {
    
  },[bank])


  const header = [
  { key: "edit", label: "✏️", type: "action", link: "/edit" },
  { key: "date", label: "תאריך", type: "date" },
  { key: "valueDate", label: "תאריך ערך", type: "date" },
  { key: "peola", label: "פעולה", type: "text" },
  { key: "sog", label: "סוג קבוצה", type: "text" },

  // 🔥 חשוב: שמות כפי שהם ב־Firestore
  { key: "deabit", label: "חובה", type: "number", sum: true },
  { key: "creadit", label: "זכות", type: "number", sum: true },

  { key: "yitra", label: "יתרה", type: "number" }
];




  return (
    <>
      <div className="flex justify-around" >
        <div>
          <button onClick={() => setShowBydate(!showBydate)}>by date</button>
        </div>
        <div>
          <button onClick={() => setShowByGroup(!showBygroup)}>by group</button> </div>
        <div>
          <button onClick={()=> setShowEdite(!showEdite)}>edit group</button></div>
      </div>
      {showBydate ? (
      <div className="flex  w-100 gap-5 p-1" >
        <SelectDate 
          lable="מתאריך" 
          value={fromDate}
        setValue={setFromDate} 
      />
      <SelectDate 
          lable="עד תאריך" 
          value={toDate}
        setValue={setToDate} 
        />  
        <button className="btn  bg-blue-300 rounded-2xl px-6 cursor-pointer hover:bg-blue-500" onClick={loadData}>הצג</button>
      </div>
      ):(null)}
      
    
        <div className="p-1" dir="rtl">
        <h2 className="font-bold text-center text-xl ">תנועות בנק הפועלים</h2>
        {showBygroup ? (<GroupSummary />):(null)}
        {showEdite ? ( <EditByGroup />):(null)}
         
          {results && results.length > 0 && (<div> 
            <GenericTable headers={header} data={results} />
          </div>
          ) }
          </div>
         
    </>
  );
}


*/