'use client';

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc
} from "firebase/firestore";

export default function UpdateByPeola() {

  const [peolaList, setPeolaList] = useState([]);
  const [selectedPeola, setSelectedPeola] = useState("");
  const [group, setGroup] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // group list value

  const groupList = [
    'הכנסות שכר',
    'חיוב מכרטיסי אשראי',
    'הכנסות שכר דירה',
    'קצבה ביטוח לאומי',
    'השקעות',
    'הוצאות בריאות',
    'הוצאות',
    'הוצאות אחר',
    'הכנסות אחר',
  ]

  // 🔹 טעינה ראשונית של רשימת PEOLA
  useEffect(() => {
    const loadPeola = async () => {
      const snapshot = await getDocs(collection(db, "bank"));
      const values = new Set();

      snapshot.docs.forEach(doc => {
        const p = doc.data().peola;
        if (p) values.add(p);
      });

      setPeolaList([...values]);
    };

    loadPeola();
  }, []);

  // 🔹 שליפת רשומות לפי PEOLA
  useEffect(() => {
    if (!selectedPeola) return;

    const loadRows = async () => {
      setLoading(true);

      const q = query(
        collection(db, "bank"),
        where("peola", "==", selectedPeola)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRows(data);
      setLoading(false);
    };

    loadRows();
  }, [selectedPeola]);

  // 🔹 Update Batch
  const handleUpdate = async () => {
    if (!selectedPeola) return alert("בחר פעולה");
    if (!group) return alert("בחר קבוצה");
    if (!rows.length) return alert("לא נמצאו רשומות");

    if (!confirm(`לעדכן ${rows.length} רשומות בקבוצה: ${group}?`)) return;

    const batch = writeBatch(db);

    rows.forEach(row => {
      const ref = doc(db, "bank", row.id);
      console.log(group)
      batch.update(ref, { group });
    });

    await batch.commit();
    alert("✅ עודכן בהצלחה");
  };

  return (
    <div className="max-w-xl p-4 border rounded shadow bg-white space-y-3">

      <h2 className="font-bold text-lg">🔁 עדכון לפי פעולה (PEOLA)</h2>

      {/* PEOLA */}
      <select
        value={selectedPeola}
        onChange={e => setSelectedPeola(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">בחר פעולה</option>
        {peolaList.map((p, i) => (
          <option key={i} value={p}>{p}</option>
        ))}
      </select>

      {/* GROUP */}
      <select
        value={group}
        onChange={e => setGroup(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">בחר קבוצה</option>
        {groupList.map((i) => <option key={i} value={i} >{i}</option>)}
      </select>

      {/* INFO */}
      {selectedPeola && (
        <div className="text-sm text-gray-600">
          נמצאו {rows.length} רשומות
        </div>
      )}

      {/* BUTTON */}
      <button
        disabled={loading}
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "מעדכן..." : "✅ עדכן קבוצה"}
      </button>

    </div>
  );
}
