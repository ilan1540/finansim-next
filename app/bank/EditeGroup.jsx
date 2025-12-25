"use client";

import React from 'react'
import { useAppContext } from "../context/AppContext";

export default function EditeGroup() {
  const { bank } = useAppContext();
  
  // --- מספר רשומות
  const count = bank?.length || 0;
  console.log("EditByGroup - bank count:", count);
 

  return (
    <div>
      <div>Count: {count}</div> 
    </div>
  )
}
