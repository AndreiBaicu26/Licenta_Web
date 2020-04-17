import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBnd2CziUijN3RzZ9vVa32g4zMKiS8o9UU",
    authDomain: "air-deposit.firebaseapp.com",
    databaseURL: "https://air-deposit.firebaseio.com",
    projectId: "air-deposit",
    storageBucket: "air-deposit.appspot.com",
    messagingSenderId: "1057755749597",
    appId: "1:1057755749597:web:dfb39a8bb96dce1557cf34",
    measurementId: "G-TN2BQ0KC8C"
  };

  firebase.initializeApp(firebaseConfig);


  export const firestore = firebase.firestore();


  
  

  export const saveEmployee = async(employeeData)=>{
    const employeeRef = firestore.doc(`employees/${employeeData.cnp}`)
    
    const snapShot = await employeeRef.get();
    
    var snapId = await firestore.collection("employees").orderBy("id","desc").limit(1).get();
       
    var id = snapId.docs.pop().data().id;
    id++;

    
    if(!snapShot.exists){
      try{
        employeeRef.set({
          ...employeeData,
          id:id
        })
      }catch(err){
        console.log("Error while saving to firebase", err);
      }
    }else{

      throw "Employee exists"
    }
  }

  export const getAllEmployees = async ()=>{
    
    var employees = [];

   var snap = await firestore.collection("employees").get();
   await snap.docs.forEach(doc => employees.push(doc.data()))
      

    return employees;

  }
  export default firebase;