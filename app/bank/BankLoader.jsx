"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";


export default function BankLoader() {
//const {bank, setBank, setLoadingBank } = useAppContext();
  const { setBank, setLoadingBank } = useAppContext();

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
        console.log("BANK LOADED", data[0]);

      } catch (error) {
        console.error("שגיאה טעינת bank:", error);
      } finally {
        setLoadingBank(false);
      }
    };

    loadBank();
  }, []);

  return null; // קומפוננט טוענת בלבד
}
