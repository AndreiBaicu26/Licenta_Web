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
    
    if(!snapShot.exists || snapId.empty){
      try{
        if(snapId.empty){
          employeeRef.set({
            ...employeeData,
            id:1000
          })
        }else{
          var id = snapId.docs.pop().data().id;
          id++;
          employeeRef.set({
            ...employeeData,
            id:id
          })
        }
        
      }catch(err){
        console.log("Error while saving to firebase", err);
      }
    }else{
      throw Error("Employee exists")
    }
  }


  export const removeEmployee= async(dataEmployee)=>{
    
    try{
       await firestore.doc(`employees/${dataEmployee.cnp}`).delete();
       return true;
    }catch(err){
      console.log("Error while deleting " + err);
      return false;
    } 

  }

  export const saveProduct = async (product)=>{
   
   try{
    const employeeSnap = await firestore.collection("products").add({
      ...product
    })
  }catch(err){
    throw Error("Error while saving product " + err);
  }
  }



  export default firebase;