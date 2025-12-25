"use client";

import { useAppContext } from "../context/AppContext";
import { useState, useMemo } from "react";
import { writeBatch, doc,setDoc } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

export default function EditByGroup() {
  const { bank, bankGroup } = useAppContext();
  const [group, setGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPeola, setSelectedPeola] = useState(""); 
  const [filteredBank, setFilteredBank] = useState([]);

  // --- מספר רשומות
  const count = bank?.length || 0;
 // console.log("EditByGroup - bank count:", count);
// --- סינון לפי פעולה
  const filterRecToUpdate = useMemo(() => {
  if (!selectedPeola) return bank || [];

  return setFilteredBank( bank.filter(row => row.peola === selectedPeola));
}, [bank, selectedPeola]);

 console.log("Filtered Bank:", filteredBank.slice(0, 5)); // הצגת 10 רשומות ראשונות בלבד לבדיקה

  // --- peola ייחודי מתוך הסינון
  const peolaList = useMemo(() => {
  if (!bank) return [];

  return [...new Set(bank.map(b => b.peola).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "he"));
  }, [bank]);
  
  // --- עדכון קבוצתי ב־Firestore
  const updateGroup = async () => {
    if (!group) {
      alert("יש לבחור קבוצה");
      return;
    }
    if (!filteredBank) {alert("אין רשומות לעדכון"); return;} 

    setLoading(true);
    setMessage("");

    try {
      const batch = writeBatch(db);

      filteredBank.forEach(row => {
        const ref = doc(db, "bank", row.id);
        batch.update(ref, { group: group });
      });

      await batch.commit();

      setMessage(`✅ עודכנו ${filteredBank.length} רשומות בהצלחה`);
    } catch (err) {
      console.error(err);
      setMessage("❌ שגיאה בעדכון הנתונים");
    }

    setLoading(false);
  };

  if (!count) return null; // אין סינון – לא מציג טופס
  // group list
  const groupList = bankGroup;

  const updateGroupHandler = () => async () => {
try {
    console.log(groupList);

    await setDoc(
      doc(db, "setting", "bankgroup"),
      { groupList },
      { merge: true } // חשוב – לא מוחק שדות אחרים
    );

    console.log("group created");
  } catch (err) {
    console.error("שגיאה בעדכון group:", err);
  }

  }
  console.log("banjkGroup:", bankGroup);
      return (
    <div>
      <div className=" flex font-bold mb-4">
  
      <div className="mt-4 border rounded p-4 shadow bg-white max-w-2xl">
        <h3 className="font-bold mb-2">עדכון וטיפול ברשומות קבוצה Group:</h3> 
         <button onClick={updateGroupHandler()}  >שמור Firestor</button>
          </div>
 <div className="border rounded mx-auto p-4 shadow bg-white max-w-md mt-4">

      <h2 className="font-bold mb-3 text-lg">🗂 שיוך קבוצתי</h2>

      {/* שורה 1 – מספר רשומות */}
      <div className="mb-2">
        <span className="font-semibold">📄 רשומות מסוננות:</span>{" "}
        <span>{count}</span>
      </div>

      {/* שורה 2 – peola */}
      <div className="mb-2  ">
        <span className="font-semibold">🔍 פעולה:</span>{" "}
        
      </div>
      <div className="mb-4 flex gap-2">
  <select
  value={selectedPeola}
  onChange={(e) => setSelectedPeola(e.target.value)}
  className="border rounded px-2 py-1"
>
  <option value="">— כל הפעולות —</option>

  {peolaList.map(p => (
    <option key={p} value={p}>{p}</option>
  ))}
        </select>
        <p>מספר רשומות שנבחרו: {filteredBank.length}</p>
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
      </div>
     
      
      
// הצגה של רשומות מסוננות
      <div className="mt-4">
        <h3 className="font-bold mb-2">רשומות מסוננות:</h3> 
        {filteredBank.length === 0 ? (
          <p>אין רשומות להצגה.</p>
        ) : (<div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">תאריך</th>
                <th className="border border-gray-300 px-2 py-1">חובה</th>
                  <th className="border border-gray-300 px-2 py-1">זכות</th>
                  <th className="border border-gray-300 px-2 py-1">פעולה</th>
                <th className="border border-gray-300 px-2 py-1">קבוצה</th>
              </tr>
            </thead>
            <tbody>
              {filteredBank.map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-300 px-2 py-1">{moment(row.date).format("DD/MM/YYYY")}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.deabit}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.creadit}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.peola}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.group}</td>
                </tr>
              ))}
            </tbody>
          </table>  
        </div>)}

    </div>
      
  </div>    
    
  );
}
