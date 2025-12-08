// לא בשימוש משתמש ב REACT QWERY

const resource_id='a30dcbea-a1d2-482c-ae29-8f781f5025fb'

export const getByFoundId  = async (id)  =>  {
  // const id ="401"
  const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&q=id`;
  try { 
    const res = await fetch(url);
    if (!res.ok) 
      throw new Error(`API Error:{res.status} res.statusText`);
     const data = await res.json();

    // בדוק אם יש תוצאה
    if (!data.result || !data.result.records || data.result.records.length === 0) 
      throw new Error('לא נמצאו תוצאות עבור המזהה');

  } catch (err) {
  
}



  /*
  try { 
    //const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&q=${id}`
    
    
    
 console.log('id==',url) 
 const resp = await fetch(url)
  const data = await resp.json()
    console.log(data)
    set(data)
  } catch (err) {
   console.error('Error fetching data:', err);
  }
*/  
}

export const getGemelData  = async ()  =>  {
 // const id ="401"
//  console.log('id==',id)
  try { 
const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb`
  
 const resp = await fetch(url)
  const data = await resp.json()
    console.log(data)
  //  set(data)
  } catch (err) {
   console.error('Error fetching data:', err);
}   
}

