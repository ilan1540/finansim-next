"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { db } from "../../../firebase";

import {
  collection,
  query,
  where,
  doc,
  getDocs,
  writeBatch
} from "firebase/firestore";

export default function BankEditByPeola() {
  const { peola } = useParams();
  const router = useRouter();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ peola: "" });
  const [saving, setSaving] = useState(false);

  // --- שליפת כל הרשומות לפי peola
  useEffect(() => {
    if (!peola) return;
    if (!peola) return peola='מכבי'
    const load = async () => {
      const q = query(
        collection(db, "bank"),
        where("peola", "==", decodeURIComponent(peola))
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRows(data);

      // נטעין ערך אחד לטופס (כולם זהים)
      if (data.length) {
        setForm({ peola: data[0].peola || "" });
      }

      setLoading(false);
    };
    
    load();
  }, [peola]);

  // --- שמירת שינוי לכל הרשומות
  const handleSave = async () => {
    if (!form.peola) return alert("חובה ערך peola");

    setSaving(true);

    const batch = writeBatch(db);

    rows.forEach(row => {
      const ref = doc(db, "bank", row.id);
      batch.update(ref, { peola: form.peola });
    });

    await batch.commit();

    alert(`✅ עודכנו ${rows.length} רשומות`);
    router.push("/bank");

    setSaving(false);
  };
//console.log(form)
  if (loading) return <p>טוען נתונים...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">

      <h1 className="text-xl font-bold mb-4">עריכת פעולה (peola) קבוצתית</h1>

      <label className="block mb-2 font-bold">שם פעולה:</label>

      <input
        type="text"
        className="w-full border p-2 rounded"
        value={form.peola}
        onChange={e => setForm({ peola: e.target.value })}
      />

      <p className="mt-2 text-sm text-gray-600">
        מספר רשומות: {rows.length}
      </p>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {saving ? "שומר..." : "עדכן את כל הרשומות"}
      </button>

    </div>
  );
}
