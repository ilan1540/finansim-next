"use client";
import { useState } from 'react';
import Link from 'next/link';
//import Image from 'next/image';
//import logo from './logo.svg'
import { useAppContext } from '../context/AppContext';
//import { auth } from '../firebase';
import GoogleLoginButton from './GoogleLoginButton';

export default function Navbar() {
 const {user} = useAppContext()
  const [open, setOpen] = useState(false);
 // const user = auth.currentUser
 //console.log(user, currentUser)
 // console.log(user)
  
  return (
    
   <nav className="m-1">
     <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo centered on mobile, left on desktop */}
        <Link href="/" className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="text-xl font-bold">FINANSIM</span>
        </Link>

        {/* Nav Links */}
        <div className="flex font-bold text-black text-2xl bg-white p-1 rounded-3xl  space-x-5">
          <Link href="/about" className=" hover:text-blue-700">About</Link>
          <Link href="/currency" className=" hover:text-blue-700">Currency</Link>
          <Link href="/madd" className="hover:text-blue-700 ">Madd</Link>
          <Link href="/post" className="hover:text-blue-700">Post</Link>
          {!user ? (<GoogleLoginButton  className='hover:text-blue-700'         
               btnName= 'Google Login'/>) : (<p>nolog</p>)}
          {user ? <Link href="/logout" className="hover:text-blue-700">Logout</Link> : <Link href="/login" className="hover:text-blue-700">Login</Link>}
          
          
          
        </div>
      </div>
      </nav>
        )
}


/*
<header className='bg-white'>
      <nav className="flex justify-between items-center w-[92%]  mx-auto">
      <div>
                <img className="w-16 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png" alt="..."/>
        </div>
        <div  className=" ">
                <ul className="flex gap-3 ">
                    <li>
                        <Link className="hover:text-gray-500" href="/post">Post</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="/login">Login</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="/currency">Currency</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="/madd">Madd</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="/">Home</Link>
                    </li>
                </ul>
            </div>
        </nav>
      </header>
*/