import {
  collection,
  //onSnapshot,
  addDoc,
  doc,
  getDocs,
  setDoc,
 // getDoc,
 // deleteDoc,
  query,
  where,
 // orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
//import moment from 'moment'



// get timeStape from firebase
export const getStamp = () => {
  try  {
  const  stamp = serverTimestamp()
    return stamp
  } catch (err) {
  }
}

// get doc from collection

export const readData = async (collName, set) => {
  const data = []
  const allData = await getDocs(collection(db, collName));
  allData.forEach((doc) => {
    data.push({...doc.data(), id:doc.id})
 })
    set(data)
}

//read obe doc from collection with key id

export const readDocById = async (colName, id,set) =>
{
 // console.log(db)
  const ref = collection(db, colName)
  await getDocs(ref).then((snapshot) => {
    let data = []
    snapshot.docs.forEach((doc) => {
      if (doc.id == 'gemelHeders') {
        data= doc.data()
      // console.log(doc.data(),doc.id) 
      }
  //    console.log(data && data.header)
      set(data.header)
    })
   })
//  const q = query(colRef,orderBy('date'))
// await getDocs(ref).then((snapsshot) => {
 //   let data =[]
 //   snapsshot.docs.forEach((doc) => {
   //   data.push({...doc.data(), id:doc.id})
  //  })
}

// setRec
export const upDate = async (colName, id, rec) =>{
 try  {
    await setDoc(doc(db, colName, id), rec)
   // console.log('add123')
    console.log('רשומה נשמרה בהצלחה')
  } catch (err) {
    console.log('err- add123', err)
   // setFirebaseMass({err})
  }
}

// add rec
export const addNewDoc = async (colName, rec, setHandelAdd) => {
  const collctionRef = collection(db, colName)
 // const createAt =  {'createAt':moment().format()}
 // const toSave = {...rec,createAt}
  console.log(colName,rec )
  
  await addDoc(collctionRef, rec).then((docRef) => {
    console.log('doc wrutgth with id', docRef.id)
    setHandelAdd('נקלט בהצלחה')
   }).catch(((error) => {setHandelAdd(error)
    console.error('err on doc:',error)
  }))
  /*
  try {
    await addDoc(collctionRef,rec)
  } catch (err) {
    console.log(err)
  }
}



// update  set rec
export const setRec = async (colName, docId, rec) => {
  try  {
    await setDoc(doc(db, colName, docId), rec)
   // console.log('add123')
    console.log('רשומה נשמרה בהצלחה')
  } catch (err) {
    console.log('err- add123', err)
   // setFirebaseMass({err})
  }
 
}

// deled doc
export const delRec = async (colName,docId) => {
  await deleteDoc(doc(db, colName,docId))
}

// get all dataCollaction

export const getAll = async (colName,set) => {
  const colRef = collection(db, colName)
  const q = query(colRef,orderBy('date'))
 await getDocs(q).then((snapsshot) => {
    let data =[]
    snapsshot.docs.forEach((doc) => {
      data.push({...doc.data(), id:doc.id})
    })
   set(data)
   console.log(data,colName)
  // return(data)
  })
    .catch(err => {
    console.log(err.message)
  })
}

// get taqle data

export const getData = async (colName ,setData) => {
 // console.log('colname=',colName)
  const allData = await getDocs(collection(db, colName));
 // console.log('allData=',allData)
allData.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setData(doc && doc.data())
 //console.log(doc.id, " => ", doc.data());
});




  /*
  const ref = collection(db, 'sogIncome')
  const colRef = collection(db, colName)
  getDocs(ref)
  .then(snapshot => {
     console.log(snapshot)
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })
*/
   const querySnapshot = await getDocs(collection(db, "sogIncomes"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});  
}

//read data collection options from firebase and put in contex
export const readOptions = async (setOptions) => {
  const colName = 'options' 
  const allData = await getDocs(collection(db, colName));
  allData.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setOptions(doc && doc.data())
 //console.log(doc.id, " => ", doc.data());
})  
}



export const queryByYear = async (collName,year, set) => {
  let data = []
  if (year) {
  const y = year.toString()
  const colRef = collection(db, collName)
  const q =  query(colRef, where('year','==', y))
  const res = await getDocs(q)
  res.forEach((doc)=>{data.push({...doc.data(),id:doc.id}) })
    set(data)

  }
 
}

// get data use in sog incme
export const getData = async (colName, setData) => {
   console.log('colname=',colName)
  const allData = await getDocs(collection(db, colName));
   console.log('allData=',allData)
  allData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setData(doc && doc.data())
    console.log(doc.id, " => ", doc.data());
  })
};