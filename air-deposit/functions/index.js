const functions = require('firebase-functions');

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();
require('dotenv').config();

const {EMAIL, PASSWORD} = process.env;



const sendEmail = (product)=>{


  const send = require('gmail-send')({
    user: EMAIL,
    pass: PASSWORD,
    to:   'baicuandrei62@gmail.com',
    subject: `Stock Alert on product: ${product.name}`,
  });

  send({ text:  `You only have ${product.foh + product.boh} ${product.name} left in your store.`
},
(err)=>{console.log(err)})


  
}


exports.updateProduct = functions.firestore
    .document('products/{productId}')
    .onUpdate((change, context) => {
    
      const newValue = change.after.data();
      
      const alertAt = newValue.alertAt;

      
      const totalProducts = newValue.boh + newValue.foh;
      
      if(totalProducts < alertAt){
        return sendEmail(newValue);
      }else{
        return;
      }

    });


    
exports.addAlertToProduct = functions.https.onCall((data,context)=>{
 
  const alertAt = data.alertAt;
  const productId = data.id;
 return admin.firestore().collection("products").doc(productId).update("alertAt",alertAt)
  .then(doc =>{
      return true;
  }).catch(err => false)
})
