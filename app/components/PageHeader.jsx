'use client'; 
import React from 'react';

export const PageHeader = ({ word1, word2 }) => {
  return (
    <div className='flex justify-around font-bold border-b-2'>
        <div className=" text-blue-600 mx-2 text-3xl ">{word1}
      </div> 
      <div className=" text-amber-600 mx-2 text-3xl  ">{word2}
       </div>
      </div>
    
  );
};
