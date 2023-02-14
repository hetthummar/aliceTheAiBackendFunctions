const admin = require('firebase-admin');
import Stripe from 'stripe';
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);
const stripe = require('stripe')('sk_test_51MZdQDDg1EIAMOfL0zUTqquDAvpdQcR5AHmZsO0OHJqJGGVUWBHdFJSyiAjbTtrVnmso11AG5K1O95sAlP4Ogu1500HGJhOnwS');
// const stripe = require('stripe')('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');

exports.newUserCreated = functions.auth.user().onCreate(async (user) => {
    
    const userID = user.uid;
    const userEmail = user.email;
    const userName = user.displayName;

    let stripeId = "";
    const customer: Stripe.Customer = await stripe.customers.create({
        email: 'customer@example.com',
      });
      
      stripeId = customer.id;

      console.log("stripeId : " + stripeId);


    let userObject = {
        name:userName,
        email:userEmail,
        currentPlan : {
            totalToken:2000,
            usedToken :0
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        stripeId:stripeId
    }

    return admin.firestore().collection("Users").doc(userID).set(userObject);
});
