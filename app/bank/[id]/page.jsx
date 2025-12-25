"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useAppContext } from "./../../context/AppContext";
import { db } from "../../firebase";
import { numberWithCommas } from "../../context/globalFunc";
import { formatDate } from "../../context/globalFunc";  
import moment from 'moment';
import BackButton from '../../components/BackButton';


export default function EditBankRow() {
 
  const { id } = useParams();
  const router = useRouter();
  const { bank } = useAppContext();
  const row = bank.find(r => r.id === id);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (row) setForm(row);
    /*
    const rec = {
      deabit: formatNumber(row?.deabit || 0) ,
      creadit: formatNumber(row?.creadit || 0) ,
    };
    */
  //  setForm({...rec });
 // console.log("Row to edit:", row,form);
    
  }, [row]);


  if (!form) return <div>Loading...</div>;
  const handleSave = async () => {
    setSaving(true);
    const ref = doc(db, "bank", id);
    await updateDoc(ref, form);
    setSaving(false);
    router.push("/bank"); 
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }

return (
  <div className="max-w-xl m-1 p-6 space-y-4">
    <div className="gap-2 flex">
    <BackButton />
      <h2 className="text-xl font-bold">עריכת תנועת בנק</h2>
    </div>
    <div>
      <h2 className="mx-auto">פרטי הרשומה</h2>
      <div>
        <p>תאריך: {formatDate(form?.date)}</p>
        <p>תאריך: {moment(form?.date).format("DD-MM-YYYY")}</p>
        <p>חובה: {numberWithCommas(form.deabit)}</p>
        <p>זכות: {numberWithCommas(form.creadit)}</p>
        <p>יתרה: {numberWithCommas(form.yitra)}</p>   
      </div>
     </div>
    <input
      className="input"
      value={form.peola || ""}
      onChange={e => handleChange("peola", e.target.value)}
      placeholder="פעולה"
    />

    <input
      className="input"
      value={form.group || ""}
      onChange={e => handleChange("group", e.target.value)}
      placeholder="קבוצה"
    />

    <input
      className="input"
      value={form.sog || ""}
      onChange={e => handleChange("sog", e.target.value)}
      placeholder="סוג"
    />

    <textarea
      className="input"
      value={form.pratim || ""}
      onChange={e => handleChange("pratim", e.target.value)}
      placeholder="פרטים"
    />

    <div className="flex gap-3 pt-4">
      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary"
      >
        {saving ? "שומר..." : "שמירה"}
      </button>

      <button
        onClick={() => router.back()}
        className="btn-secondary"
      >
        חזרה ללא שמירה
      </button>
    </div>

  </div>
);


  
}
