"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavDropdown from "./NavDropDown";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          <Link href="/" className="text-xl font-bold text-blue-600">
            BankApp
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/bank" className="nav-link">טבלת בנק</Link>
            <Link href="/groups" className="nav-link">סיכום קבוצות</Link>

            <NavDropdown
              label="ניהול"
              items={[
                { label: "ייבוא CSV", href: "/bank/UploadCsvFile" },
                { label: " עדכון לפי קבוצה", href: "/bank/EditByGroup" },
                { label: "הגדרות", href: "/settings" },
              ]}
            />
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          <Link href="/bank" className="block nav-link">טבלת בנק</Link>
          <Link href="/groups" className="block nav-link">סיכום קבוצות</Link>
          <Link href="/bank/uploadcsvfile">ייבוא CSV</Link>
<Link href="/bank/EditByGroup">עדכון לפי קבוצה</Link>
<Link href="/settings">הגדרות</Link>


          <NavDropdown
    label="ניהול בנק"
    items={[
      { label: "ייבוא CSV", href: "/bank/uploadcsvfile" },
      { label: "עדכון לפי קבוצה", href: "/bank/EditByGroup" },
      { label: "הגדרות", href: "/settings" },
    ]}
  />
  
        </div>
      )}
    </nav>
  );
}
