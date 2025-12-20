/**
 * מיון מערך אובייקטים לפי שדה
 * @param {Array} data - מערך אובייקטים
 * @param {string} field - שם השדה למיון
 * @param {"asc" | "desc"} direction - כיוון מיון
 * @returns {Array}
 */
export function sortByField(data, field, direction = "asc") {
  const dir = direction === "desc" ? -1 : 1;
  return [...data].sort((a, b) => {
    let v1 = a?.[field];
    let v2 = b?.[field];

    // null / undefined תמיד בסוף
    if (v1 == null) return 1;
    if (v2 == null) return -1;

    // Firestore Timestamp
    if (v1?.seconds !== undefined && v2?.seconds !== undefined) {
      return (v1.seconds - v2.seconds) * dir;
    }

    // Date
    if (v1 instanceof Date && v2 instanceof Date) {
      return (v1.getTime() - v2.getTime()) * dir;
    }

    // מספרים
    if (typeof v1 === "number" && typeof v2 === "number") {
      return (v1 - v2) * dir;
    }

    // טקסט
    return v1.toString().localeCompare(v2.toString(), "he", {
      numeric: true,
      sensitivity: "base",
    }) * dir;
  });
}
