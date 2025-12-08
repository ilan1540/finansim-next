'use client';
import { useRouter } from 'next/navigation';
export default function BackButton() {
  const router = useRouter();

  return (
    <div className=''>
      <button
        onClick={() => router.back()}
        className="text-white bg-blue-500 hover:bg-blue-700 rounded-full  px-6 text-center ">חזור</button>
      </div>
  );
}

 