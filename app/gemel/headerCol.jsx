import {
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const headerTav = [
  {
  field: 'FUND_ID',
  teor: 'מספר קופה'
  },
   {
  field: 'REPORT_PERIOD',
  teor: 'תקופת הדיווח'
  },
    {
  field: 'MONTHLY_YIELD',
  teor: 'תשואה חודשית'
  },
     {
  field: 'YEAR_TO_DATE_YIELD',
  teor: 'תשואה מצטברת מתחילת שנה'
  },
     {
  field: 'YIELD_TRAILING_3_YRS',
  teor: 'תשואה מצטברת ב3-שנים'
},
]

  


export const columns = [
  columnHelper.accessor("FUND_ID", {id:'FUND_ID',
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >שם קופה</div>
      </span>
    ),
  }),
  columnHelper.accessor("REPORT_PERIOD", {id:'REPORT_PERIOD',
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >תקופת דיווח</div>
      </span>
    ),
  }),
  columnHelper.accessor("MONTHLY_YIELD", {id:'MONTHLY_YIELD',
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >תשואה חודשית</div>
      </span>
    ),
  }),
  columnHelper.accessor("YEAR_TO_DATE_YIELD", {id:'YEAR_TO_DATE_YIELD',
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >תשואה מצטברת מתחילת שנה</div>
      </span>
    ),
  }),
  columnHelper.accessor("YIELD_TRAILING_3_YRS", {id:'YIELD_TRAILING_3_YRS',
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
  'תשואה מצטברת ב3-שנים'
      </span>
    ),
  }),
  
]
/*
export const salaryColumns = [
  columnHelper.accessor("month", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >חודש</div>
      </span>
    ),
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >תאריך</div>
      </span>
    ),
  }),
  columnHelper.accessor("broto", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >ברוטו</div>
      </span>
    ),
  }),
  columnHelper.accessor("gmavid", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >גמל מעביד</div>
      </span>
    ),
  }),
  columnHelper.accessor("pmavid", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >פיצויים מעביד</div>
      </span>
    ),
    }),
   columnHelper.accessor("hismavid", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >קרן השתלמות מעביד</div>
      </span>
    ),
   }), 
   columnHelper.accessor("blmavid", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >ביטוח לאומי מעביד</div>
      </span>
    ),
   }),
   columnHelper.accessor("totalmavid", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >סך עלות מעביד</div>
      </span>
    ),
    }),
 columnHelper.accessor("tax", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >מס הכנסה</div>
      </span>
    ),
 }),
 columnHelper.accessor("bl", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  > ביטוח לאומי</div>
      </span>
    ),
 }),
 columnHelper.accessor("br", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  > מס בריאות</div>
      </span>
    ),
 }),
 columnHelper.accessor("genel", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >ניכוי גמל</div>
      </span>
    ),
 }),
 columnHelper.accessor("histlmot", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  >קרן השתלמות</div>
      </span>
    ),
 }),
 columnHelper.accessor("neto", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  > שכר נטו</div>
      </span>
    ),
 }),
 columnHelper.accessor("pratim", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <div className="mr-2" size={16}  > פרטים</div>
      </span>
    ),
    }),
]
*/