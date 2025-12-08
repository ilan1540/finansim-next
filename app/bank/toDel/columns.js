const fields = [
  { field: "date", header: "תאריך" },
  { field: "debit", header: "חובה" },
  { field: "credit", header: "זכות" },
  { field: "balance", header: "יתרה" },
  { field: "peola", header: "פעולה" },
];

export const columns = fields.map(f => ({
  accessorKey: f.field,
  header: f.header,
  
}));
