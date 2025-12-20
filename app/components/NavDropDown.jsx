"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function NavDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // סגירה בלחיצה מחוץ ל־dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

       
      
    
      

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = [
   { label: " תנועות בנק", href: "/bank/banktable" },
    { label: "עדכון לפי קבוצה", href: "/bank/EditByGroup" },
   { label: "ייבוא CSV", href: "/bank/uploadcsvfile" },
  ]; 

  return (
    <div ref={ref} className="relative">

      {/* כפתור פתיחה */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="flex items-center gap-1 nav-link select-none"
      >
       בנקים 
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* תפריט */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 hover:bg-blue-50"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
         
        </div>
      )}
    </div>
  );
}
