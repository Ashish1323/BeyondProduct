import React ,{useState,useEffect }from 'react';
import { Link } from 'react-router-dom';
import {isAuthenticated} from '../auth/helper';
import {cartEmpty,loadCart } from './helper/cartHelper';
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';



const StripeCheckout = (
    {products,
    setReload = f => f,
    reload = undefined
    }
) => {
  
     const [data,setData] = useState({
         loading:false,
         success:false,
         error:"",
         address:""

     });

     const token = isAuthenticated() && isAuthenticated().token 
     const userId = isAuthenticated() && isAuthenticated().user._id

     const getFinalAmount = () =>{
         let amount = 0
         products.map(p => {
             amount = amount + p.price
         })
         return amount
     }
      const makePayment = token =>{
          const body={
              token,
              products
          }
          const headers ={
              "Content-Type":"Application/json"
          }
          return fetch(`${API}/stripepayment`,{
              method:"POST",
              headers,
              body:JSON.stringify(body)
          }).then(response=>{
              console.log(response)

          }).catch(error=>console.log(error))
      }

     const showStripeButton = () =>{
        return isAuthenticated() ? (



            <StripeCheckoutButton
            stripeKey="pk_test_51HjK5EEXntxgqIuJW5qFZrqSBIbtDMy1m7m4J0P33ERlVIVJripdV5BznuVx4vu8aj9DZPwTysFkeJAxlO97LSep00VBKkckTE"
            token={makePayment}
            amount={getFinalAmount() * 100 }
            shippingAddress
            billingAddress
            
            >

            <button className= "btn btn-success">Pay with Stripe</button>

            </StripeCheckoutButton>
        ) : (
            <Link to="signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )   
     }

    return (
        <div>
            <h3 className="text-white">StripCheckout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;
