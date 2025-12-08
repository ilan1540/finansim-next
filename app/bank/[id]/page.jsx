"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";  
import moment from "moment";
import { data } from "autoprefixer";

export default function BankEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResults] = useState(null);
  const [rows, setRows] = useState([]);

  // --- טעינת נתון
  useEffect(() => {
  const loadData = async () => {
    const ref = doc(db, "bank", id);
    const snap = await getDoc(ref);   // ✅ getDoc

    if (snap.exists()) {
      const data = snap.data();

      setForm({
        ...data,
        date: data.date?.toDate?.() || "",
        valueDate: data.valueDate?.toDate?.() || ""
      });

      setResults({ id: snap.id, ...data }); // ✅ גם id אם צריך
    }

    setLoading(false);
  };

  loadData();
}, [id]);


// קריאה קבוצתית
useEffect(() => {
  if (!result?.peola) return;

  const load = async () => {
    const q = query(
      collection(db, "bank"),
      where("peola", "==", result.peola)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setRows(data);
    setLoading(false);
  };

  load();
}, [result?.peola]);



console.log(rows)
console.log(result&& result.peola)  // --- שינוי
console.log(result ) 
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- שמירה
  const handleSave = async () => {
    const ref = doc(db, "bank", id);

    const payload = {
      ...form,
      date: moment(form.date).toDate(),
      valueDate: moment(form.valueDate).toDate(),
      deabit: Number(form.deabit || 0),
      creadit: Number(form.creadit || 0),
      yitra: Number(form.yitra || 0)
    };

    await updateDoc(ref, payload);

    alert("✅ נתונים נשמרו");
    router.push("/bank");
  };

  if (loading) return <p>טוען נתונים...</p>;
  if (!form) return <p>רשומה לא נמצאה</p>;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-3">
      
      <h2 className="text-xl font-bold">✏️ עריכת פעולה</h2>
      <label>תאריך</label>
      <input
        type="date"
        name="date"
        value={moment(form.date).format("YYYY-MM-DD")}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label>תאריך ערך</label>
      <input
        type="date"
        name="valueDate"
        value={moment(form.valueDate).format("YYYY-MM-DD")}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label>פעולה</label>
      <input
        name="peola"
        value={form.peola || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label>סוג קבוצה</label>
      <input
        name="sog"
        value={form.sog || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label>חובה</label>
      <input
        name="deabit"
        type="number"
        value={form.deabit || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label>זכות</label>
      <input
        name="creadit"
        type="number"
        value={form.creadit || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label>יתרה</label>
      <input
        name="yitra"
        type="number"
        value={form.yitra || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <div className="flex gap-4 pt-3">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          שמור
        </button>

        <button
          onClick={() => router.push("/bank")}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          ביטול
        </button>
      </div>

    </div>
  );
}
