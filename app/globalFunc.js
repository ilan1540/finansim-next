
// פונקציה להמרת טיפוסי הנתונים

import moment from "moment";

// המרת מספרים עם פסיקים למספר
const parseNumber = (str) => {
  if (!str || str.trim() === "") return null;
  return Number(str.replace(/,/g, ""));
};

const convertRowTypes = (row) => {
  return {
    asmcta: parseInt(row.asmcta, 10) || null,

    creadit: parseNumber(row.creadit),
    deabit: parseNumber(row.deabit),
    yitra: parseNumber(row.yitra),

    date: row.date
      ? moment(row.date, "DD.MM.YYYY").toDate()
      : null,

    valueDate: row.valueDate
      ? moment(row.valueDate, "DD.MM.YYYY").toDate()
      : null,

    forMotav: row.forMotav || "",
   // id: row.id || "",
    peola: row.peola || "",
    pratim: row.pratim || "",
    sog: row.sog || "",
  };
};
export { parseNumber, convertRowTypes };    