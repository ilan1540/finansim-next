"use client";

import { useAppContext } from "../context/AppContext";
import { useState, useMemo } from "react";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditByGroup() {
  const { bank } = useAppContext();
  const [group, setGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // --- מספר רשומות
  const count = bank?.length || 0;

  // --- peola ייחודי מתוך הסינון
  const peola = useMemo(() => {
    const set = new Set(bank && bank.map(b => b.peola));
    return [...set].join(", ");
  }, [bank]);

  // --- עדכון קבוצתי ב־Firestore
  const updateGroup = async () => {
    if (!group) {
      alert("יש לבחור קבוצה");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const batch = writeBatch(db);

      bank.forEach(row => {
        const ref = doc(db, "bank", row.id);
        batch.update(ref, { group: group });
      });

      await batch.commit();

      setMessage(`✅ עודכנו ${count} רשומות בהצלחה`);
    } catch (err) {
      console.error(err);
      setMessage("❌ שגיאה בעדכון הנתונים");
    }

    setLoading(false);
  };

  if (!count) return null; // אין סינון – לא מציג טופס
  // group list
  const groupList = [
    'בריאות מכבי',
    "קיצבה מכלל",
    "הדס מנורה",
    "הדס איכילוב",
    "אילן שכר מקובי",
    "קיצבה ביטוחמ לאומי",
    "שכר דירה",
    "חיוב מכרטיסי אשראי"
  ]


  return (
    <div className="border rounded p-4 shadow bg-white max-w-md mt-4">

      <h2 className="font-bold mb-3 text-lg">🗂 שיוך קבוצתי</h2>

      {/* שורה 1 – מספר רשומות */}
      <div className="mb-2">
        <span className="font-semibold">📄 רשומות מסוננות:</span>{" "}
        <span>{count}</span>
      </div>

      {/* שורה 2 – peola */}
      <div className="mb-2">
        <span className="font-semibold">🔍 פעולה:</span>{" "}
        <span className="text-blue-600">{peola || "לא נבחר"}</span>
      </div>

      {/* שורה 3 – בחירת קבוצה */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">🏷 בחר קבוצה</label>
        <select
          value={group}
          onChange={e => setGroup(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">בחר קבוצה...</option>
          {groupList.map((group) => <option key={group} value={group}>{ group}</option> )}
        </select>
      </div>

      {/* כפתור */}
      <button
        onClick={updateGroup}
        disabled={loading}
        className={`w-full rounded py-2 text-white transition ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "מעדכן..." : "עדכן קבוצה"}
      </button>

      {/* הודעה */}
      {message && (
        <div className="mt-3 text-center font-medium">{message}</div>
      )}
    </div>
  );
}
