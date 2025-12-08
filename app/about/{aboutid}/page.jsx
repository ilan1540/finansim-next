//'use client'; 
export default async  function Gemel({params}) {
//const { params } =  props; // הוספת await
//{aboutid}
  const id = await params.aboutid;
  console.log("gemelid:", id);
 // const id ='401'
//  console.log('params==',params)

  const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&q=${id}`
 
  const resp =  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

 // const data =  resp.json();

  console.log(id);
 
  

  
  return (
    <div>gemel 
     {/* {data && data.result.records.map((i:any, item: any) => (<p>{item.YEAR_TO_DATE_YIELD }
      </p>
      ) 
      )}*/}
    </div>
  )
} 

