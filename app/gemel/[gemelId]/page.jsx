//'use client'; 
import GemelSearch from "../GemelSearch";
import { PageHeader } from "../../components/PageHeader";
export default async  function Gemel({params}) {
  const  id  = await params.gemelId;

  
  return (
    <div>
      <div className="w-80 mx-auto ">
            <PageHeader 
              word1={'נתוני גמל נט'}
              word2={'משרד האוצר'}
            />
            </div>
      <GemelSearch id={id} />
    </div>
  )
} 

