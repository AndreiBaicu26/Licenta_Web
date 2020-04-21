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
     throw Error("Error while deleting employee " + err);
     
    } 

  }

  export const saveProduct = async (product)=>{
   

   try{
     const prodRef = firestore.doc(`products/${product.documentId}`);
    const snap = await prodRef.get();
    if(!snap.exists){
      prodRef.set({
        ...product
      })
      return true;
    }else{
      return false;
    }

  }catch(err){
    throw Error("Error while saving product " + err);
  }
  }

  export const removeProduct = async(product)=>{

    try{
      await firestore.doc(`products/${product.documentId}`).delete();
      return true;
    }catch(err){
      throw Error("Error while deleting product " + err)
     
    }
  }
   



  export default firebase;