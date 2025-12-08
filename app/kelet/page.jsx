'use client'
import { PageHeader } from '../components/PageHeader'
import DynamicFormTailwind from './DynamicFormTailwind';


export default function kelet() {
  return (
    <div>
      <div className='sticky'>
    <div className="flex text-2xl justify-center ">
      <PageHeader 
        word1={'קלט'}
        word2={'נכסים'} />
      </div>
      </div >
      <div className='mx-auto'>
        <DynamicFormTailwind /> 
        </div>
      </div>
  )
}
