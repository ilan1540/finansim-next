'use client';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'next/navigation';


export default function LogoutButton() {
  const { logout } = useAppContext();
  const router = useRouter();

  return (
    <div className='flex space-x-5 font-bold text-black text-2xl '>
     <button
      onClick={logout}
      className='hover:text-blue-700 cursor-pointer'
    >
      יציאה
      </button>
  </div>
    
  );
}
