


import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/functions'


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

  export const functions = firebase.functions();

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
    
   // const product = Object.assign({}, productToBeAssigned)
   try{
     const prodRef = firestore.doc(`products/${product.documentId}`);
    const snap = await prodRef.get();
    if(!snap.exists){
      prodRef.set(
        Object.assign({},product)
      )
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
   
  export const getEmployee =async (employeeID)=>{
    console.log("got in firebase", employeeID)
   
    const response = firestore.collection("employees").where("id", "==",Number.parseInt(employeeID))
    .get()
    .then(function(querySnapshot) {
      console.log(querySnapshot)
        var currentLogged;
        var isManager = false;

        querySnapshot.forEach(function(doc) {
          console.log("-----",doc.data());
          if(doc.data().manager === true){
            isManager = true;
            currentLogged = doc.data();
          }
          
           
        });

        if(isManager) return currentLogged
          else
           return false;
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


    return response;
  }

  export const promoteEmployee = async (employee) =>{
   
    try{

     await firestore.doc(`employees/${employee.cnp}`).update("manager", true);
    return true;
    }catch(err){
      return false;
    }

  }


  export const getSales = async (month)=>{

  
   const snap = await  firestore.collection("sales").get();

   var salesToBeReturned = [];
    snap.docs.forEach(map =>{

      // var date = map.data().dateCreated.toDate().getMonth();
     
      // if(date === month){
      //   salesToBeReturned.push(map.data())
      // }
      salesToBeReturned.push(map.data());
    })


    return salesToBeReturned; 
  }

  

  export const getProducts = async ()=>{

  
    const snap = await  firestore.collection("products").get();
 
    var productsToBeReturned = [];
     snap.docs.forEach(doc=>{
      productsToBeReturned.push(doc.data().name)
     })
 
 
     return productsToBeReturned; 
   }

  export const demoteEmployee = async (employee) =>{
   
    try{

      const a = await firestore.collection("employees").where("manager", "==" ,true ).get();
      let count = 0;
      a.forEach(doc =>{
        if(doc.exists){
          count++;
        }
      });

      if(count > 1 ){
        await firestore.doc(`employees/${employee.cnp}`).update("manager", false);
        return true;
      }else{
        return false;
      }
    }catch(err){
      throw Error("Error while updating employee");
    }

  }

 
  export const saveProvider = async(provider) =>{
    try{
      
      const providerRef = firestore.doc(`providers/${provider.name}`);
      const snap = await providerRef.get();
     if(!snap.exists){
       providerRef.set(
         Object.assign({},provider)
       )
       return true;
     }else{
       return false;
     }
 
   }catch(err){
     throw Error ("Error while saving")
   }
  }

  export default firebase;