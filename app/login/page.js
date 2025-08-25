'use client'
import React, { useState } from 'react'
//import Button from '../../components/Button';
import { redirect } from 'next/navigation'
import { useAppContext } from '../context/AppContext'
import { auth } from '../firebase';




export default function Login() {
  const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [isRegister, setIsRegister] = useState(false)
 
  const {currentUser,setCurrentUser,login } = useAppContext()
  
    const onChangeHendel = (e) => {

        console.log(e.target.name)
    }
    
    
     async function handleSubmit() {
         if (!email || !password || password.length < 6) {
             return
         }
         try {  
                 await login(email, password)
             console.log(currentUser)
         } catch (err) {
             console.log(err.message)
         } 
    }
    

 
    
    
    
    return (
        <div className='flex flex-col flex-1 justify-center items-center  gap-4'>
            <h3 className={'text-4xl sm:text-5xl md:text-6xl'}>
                {isRegister ? 'Register' : 'Log In'}</h3>
             <input value={email} onChange={(e) => {
                 setEmail(e.target.value)}}
                className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Email' />
             <input value={password} onChange={(e) => {
                 setPassword(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Password' type='password' />
            <button onClick={handleSubmit}>login btn</button>
            
          </div>   
        
     )
}

/*

            {!currentUser ? (
             <p className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}<button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600'>{isRegister ? 'Sign in' : 'Sign up'}</button></p>
            </div>):(redirect('/'))}

            */

            /*
const InpoutField = ({type,placeholder,value,name}) => {
     return (
      <input
       type={type}
      value={value}
      name={name}       
             placeholder={placeholder}
             onChange={onChangeHendel}
      className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'/>
        )}
            */