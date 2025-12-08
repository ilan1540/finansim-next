'use client';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);     
      const user = result.user;
     //   console.log('User:', user.displayName, user.email);
    //  console.log(user)
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className='font-bold text-black text-2xl hover:text-blue-700 cursor-pointer'
    >כניסה
    </button>
  );
}

