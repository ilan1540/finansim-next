"use client";
import { useState } from 'react';
import Link from 'next/link';
//import Image from 'next/image';
//import logo from './logo.svg'
import { useAppContext } from '../context/AppContext';
//import { auth } from '../firebase';
import GoogleLoginButton from './GoogleLoginButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogOutButton';

export default function Navbar() {
 const {user} = useAppContext()
  const [open, setOpen] = useState(false);

  const navLink = [
  {
      href: '/gemel',
      name: 'גמל'
    },
    {
      href: '/upload',
      name: 'upload'
    },
    {
      href: '/kelet',
      name: 'קלט'
    },
    {
      href: '/bank',
      name: 'בנקים'
    },
{
      href: '/asset',
      name: 'נכסים'
    },
    {
      href: '/about',
      name: 'אודות'
    },
    
    
    

  ]
 
  
  return (
    
   <nav className="">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className='w-15 flex-none text-right '>
          {/*login logout button select  */ }
          {user ? (<LogoutButton />):(<LoginButton />)}
        </div>
        
        <div className='shrink'>
          {/* Nav Links */}
        {user ?(<div className="flex font-bold text-black text-base bg-white p-1 rounded-3xl gap-4 ">
          {navLink.map((l) =>
            <Link href={l.href} key={l.href} className=" hover:text-blue-700">{l.name }</Link>)}
        </div>):(null)}
        </div>
        <div className='w-25 flex-none'>
          {/* Logo centered on mobile, left on desktop */}
        <Link href="/" className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="text-xl font-bold">FINANSIM</span>
        </Link>
          </div>
        
      </div>
      </nav>
        )
}
