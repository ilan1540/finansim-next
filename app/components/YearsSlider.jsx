'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const YearsSlider = () => {
const {year,setYear} = useAppContext()

  const incrementYear = () => setYear(prev => prev + 1);
  const decrementYear = () => setYear(prev => prev - 1);

  return (
    <div className='flex border-b-2 items-center gap-3 cursor-pointer'>
      <ArrowRight onClick={decrementYear} className='hover:text-blue-600' />
      <span className="font-semibold">{year}</span>
      <ArrowLeft onClick={incrementYear} className='hover:text-blue-600' />
    </div>
  );
};


