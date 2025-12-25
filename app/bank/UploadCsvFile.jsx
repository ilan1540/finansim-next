"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import BackButton from "../components/BackButton";




const BANK_FIELDS = [
  { key: "date", label: "תאריך", type: "date", required: true },
  { key: "valueDate", label: "תאריך ערך", type: "date" },
  { key: "peola", label: "פעולה", type: "text", required: true },
  { key: "pratim", label: "פרטים", type: "text" },
  { key: "deabit", label: "חובה", type: "number" },
  { key: "creadit", label: "זכות", type: "number" },
  { key: "yitra", label: "יתרה", type: "number" },
  { key: "group", label: "קבוצה", type: "text" },
  { key: "sog", label: "סוג", type: "text" },
];

const STORAGE_KEY = "bankCsvMapping";

/* ---------- עזרים ---------- */
const parseIsraeliDate = (value) => {
  if (!value) return null;
  const parts = value.toString().trim().split(".");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  const d = new Date(year, month - 1, day);

  return isNaN(d.getTime()) ? null : d;
};

const parseNumber = (value) => {
  if (!value) return null;
  const n = Number(value.toString().replace(/[₪,]/g, "").trim());
  return isNaN(n) ? null : n;
};

/* ---------- קומפוננט ---------- */
export default function UploadCsvFileValidated() {
  const [csvRows, setCsvRows] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [mapping, setMapping] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  /* טעינת מיפוי שמור */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setMapping(JSON.parse(saved));
  }, []);

  /* העלאת CSV */
  const handleFile = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setCsvRows(res.data);
        setCsvHeaders(Object.keys(res.data[0] || {}));
        setErrors([]);
      },
    });
  };

  /* בדיקת נתונים */
  const validateRows = () => {
    const errs = [];

    csvRows.forEach((row, idx) => {
      BANK_FIELDS.forEach((field) => {
        const csvKey = mapping[field.key];
        if (!csvKey) return;

        const raw = row[csvKey];

        if (field.required && !raw) {
          errs.push(`שורה ${idx + 1}: חסר שדה חובה "${field.label}"`);
          return;
        }

        if (field.type === "date" && raw) {
          if (!parseIsraeliDate(raw)) {
            errs.push(`שורה ${idx + 1}: תאריך לא תקין ב־"${field.label}" → ${raw}`);
          }
        }

        if (field.type === "number" && raw) {
          if (parseNumber(raw) === null) {
            errs.push(`שורה ${idx + 1}: מספר לא תקין ב־"${field.label}" → ${raw}`);
          }
        }
      });
    });

    setErrors(errs);
    return errs.length === 0;
  };

  /* שמירת מיפוי */
  const saveMapping = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapping));
    alert("המיפוי נשמר כברירת מחדל");
  };

  /* שמירה ל־Firestore */
  const saveToFirestore = async () => {
    if (!validateRows()) return;

    setLoading(true);

    for (const row of csvRows) {
      const record = {};

      BANK_FIELDS.forEach((field) => {
        const csvKey = mapping[field.key];
        if (!csvKey) {
          record[field.key] = null;
          return;
        }

        const raw = row[csvKey];

        if (field.type === "date") {
          const d = parseIsraeliDate(raw);
          record[field.key] = d ? Timestamp.fromDate(d) : null;
        }

        if (field.type === "number") {
          record[field.key] = parseNumber(raw);
        }

        if (field.type === "text") {
          record[field.key] = raw?.toString().trim() || null;
        }
      });

      await addDoc(collection(db, "bank"), record);
    }

    setLoading(false);
    alert("הייבוא הושלם בהצלחה ✔️");
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-center">ייבוא נתוני בנק מ־CSV</h2>
      <BackButton href="/bank" />
      <input type="file" accept=".csv" onChange={(e) => handleFile(e.target.files[0])} />

      {csvHeaders.length > 0 && (
        <div className="border rounded p-4 space-y-3">
          <h3 className="font-semibold">מיפוי עמודות</h3>

          {BANK_FIELDS.map((f) => (
            <div key={f.key} className="flex gap-3 items-center">
              <span className="w-32">{f.label}</span>
              <select
                className="border rounded px-2 py-1 flex-1"
                value={mapping[f.key] || ""}
                onChange={(e) =>
                  setMapping({ ...mapping, [f.key]: e.target.value })
                }
              >
                <option value="">— לא למפות —</option>
                {csvHeaders.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex gap-4 pt-4">
            <button onClick={saveMapping} className="bg-gray-300 px-4 py-2 rounded">
              שמירת מיפוי
            </button>

            <button
              onClick={saveToFirestore}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "שומר..." : "שמירה ל־Firestore"}
            </button>
          </div>
        </div>
      )}

      {/* דו״ח שגיאות */}
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 p-4 rounded">
          <h4 className="font-bold mb-2">⛔ נמצאו שגיאות – הייבוא נעול</h4>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
