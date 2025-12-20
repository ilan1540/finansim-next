"use client";
import BankTable from "../BankTable"
import { useAppContext } from "../../context/AppContext";
import GenericTable from "../../components/GenericTable";
export default function BankTablePage() {
  const { bank } = useAppContext();
  //מבנה את הכותרות של הטבלה  
  const header = [
    { key: "edit", label: "✏️", type: "action", link: "/edit" },
    { key: "date", label: "תאריך", type: "date" },
    { key: "group", label: " קבוצה", type: "text" },
    { key: "peola", label: "פעולה", type: "text" },
    // 🔥 חשוב: שמות כפי שהם ב־Firestore
    { key: "deabit", label: "חובה", type: "number", sum: true },
    { key: "creadit", label: "זכות", type: "number", sum: true },
    { key: "yitra", label: "יתרה", type: "number" }
  ];
 // console.log("Bank data:", bank);
  return <GenericTable data={bank}  headers={header} />;
}