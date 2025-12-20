"use client";

import { useMemo, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";

export default function BulkEditBank() {
  const { bank } = useAppContext();

  const [selectedPeola, setSelectedPeola] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [newPratim, setNewPratim] = useState("");
  const [saving, setSaving] = useState(false);

  /* --- רשימת פעולות ייחודיות --- */
  const peolaList = useMemo(() => {
    if (!bank) return [];
    return [...new Set(bank.map(r => r.peola).filter(Boolean))];
  }, [bank]);

  /* --- רשומות מסוננות --- */
  const filtered = useMemo(() => {
    if (!selectedPeola) return [];
    return bank.filter(r => r.peola === selectedPeola);
  }, [bank, selectedPeola]);

  /* --- שמירה --- */
  const handleSave = async () => {
    if (!filtered.length) return alert("אין רשומות לעדכון");
    if (!newGroup && !newPratim) {
      return alert("יש לבחור ערך לעדכון");
    }

    try {
      setSaving(true);
      const batch = writeBatch(db);

      filtered.forEach(row => {
        const ref = doc(db, "bank", row.id);
        const updateData = {};

        if (newGroup) updateData.group = newGroup;
        if (newPratim) updateData.pratim = newPratim;

        batch.update(ref, updateData);
      });

      await batch.commit();
      alert(`עודכנו ${filtered.length} רשומות בהצלחה`);
    } catch (err) {
      console.error(err);
      alert("שגיאה בשמירה");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <h2 className="text-xl font-bold text-center">
        Bulk Edit – עדכון רשומות בנק
      </h2>

      {/* --- בחירת פעולה --- */}
      <div>
        <label className="block font-semibold mb-1">בחר סוג פעולה (peola)</label>
        <select
          value={selectedPeola}
          onChange={e => setSelectedPeola(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">-- בחר פעולה --</option>
          {peolaList.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* --- עדכון קבוצה --- */}
      <div>
        <label className="block font-semibold mb-1">עדכן GROUP (אופציונלי)</label>
        <input
          value={newGroup}
          onChange={e => setNewGroup(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="לדוגמה: הוצאות קבועות"
        />
      </div>

      {/* --- עדכון פרטים --- */}
      <div>
        <label className="block font-semibold mb-1">עדכן PRATIM (אופציונלי)</label>
        <input
          value={newPratim}
          onChange={e => setNewPratim(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="טקסט חדש לשדה pratim"
        />
      </div>

      {/* --- סיכום --- */}
      <div className="bg-blue-50 border rounded p-4">
        <p>מספר רשומות מסוננות: <b>{filtered.length}</b></p>
        {filtered.length > 0 && (
          <p className="text-sm text-gray-600">
            כל הרשומות עם פעולה: <b>{selectedPeola}</b>
          </p>
        )}
      </div>

      {/* --- כפתור שמירה --- */}
      <button
        disabled={saving || !filtered.length}
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-3 rounded-xl
                   hover:bg-blue-700 disabled:opacity-40"
      >
        {saving ? "שומר..." : "עדכן רשומות"}
      </button>
    </div>
  );
}
