import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {token} from "../utils/token"
import {ToastContainer,toast} from "react-toastify"
import { placeOrder } from '../features/auth/authSlice'
import { baseUrl } from '../utils/baseURL'

const CheckOut = () => {

  const {user,cart,subTotal} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const orderItems = cart.map((item)=>{
    const Item={
      product:item.productId._id,
      color:item.color._id,
      quantity:item.qty,
      price:item.productId.price
    }
    return Item
  })

  
  const loadScript = (src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement("script")
      script.src = src;
      script.onload=()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const checkOutHandler = async(values)=>{
    const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if(!response){
      toast.error("RazorPay SDK Failed to Load")
      return;
    }

    const result = await axios.post(`${baseUrl}user/order/checkout`,{amount:subTotal+5},{headers:{"Authorization":`Bearer ${token}`}})

    if(!result){
      toast.error("Something went wrong")
      return;
    }

    const {amount,currency,id} = result.data
    console.log(result.data)

    const options = {
      key: "rzp_test_UqgHf2WJ8UtlZ8", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "DigiCom.",
      description: "Test Transaction",
      image:"../../public/images/favicon_32x32.png",
      order_id:id,
      handler: async function (response) {
          const data = {
              orderCreationId: id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

      const result = await axios.post(`${baseUrl}user/order/paymentVerification`, data,{headers:{"Authorization":`Bearer ${token}`}});
         
      console.log(result.data)

      dispatch(placeOrder({
        orderItems,
        shippingInfo:values,
        paymentInfo:{
          razorpayOrderId:result.data.razorpayOrderId,
          razorpayPaymentId:result.data.razorpayPaymentId
        },
        totalPrice:subTotal+5,
        totalPriceAfterDiscount:subTotal+5
      }))

      console.log({
        orderItems,
        shippingInfo:values,
        paymentInfo:{
          razorpayOrderId:result.data.razorpayOrderId,
          razorpayPaymentId:result.data.razorpayPaymentId
        },
        totalPrice:subTotal+5,
        totalPriceAfterDiscount:subTotal+5
      })
      
      setTimeout(()=>{
        navigate("/orders")
      },3000)

      },
      prefill: {
          name: "DigiCom.",
          email: "mukhtarhamza294@gmail.com",
          contact: "+923064799034",
      },
      notes: {
          address: "Shujabad, Multan, Punjab Pakistan",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = await new window.Razorpay(options);
  paymentObject.open();


  }

  const formik = useFormik({
    initialValues:{
      firstName:user?.firstname,
      lastName:user?.lastname,
      address:"",
      city:"",
      province:"",
      pinCode:"",
    },
    validationSchema:Yup.object({
      firstName:Yup.string().required("First Name is Required"),
      lastName:Yup.string().required("Last Name is Required"),
      address:Yup.string().required("Please Provide Address"),
      city:Yup.string().required("Please Provide City"),
      pinCode:Yup.number().required("Please Enter PinCode Of Your Area")
    }),
    onSubmit:(values)=>{
      checkOutHandler(values)
    }
  })


  return (
    <>
    <ToastContainer/>
       <div className='checkout-container'>
        <div className='checkout-form'>
            <h1>Digitic</h1>
            <div className='contact-info'>
              <h3>Contact</h3>
              <p>{user?.firstname}({user?.email})</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <h3>Shipping Address</h3>
              <div className='names'>

              {formik.touched.firstName && formik.errors.firstName ? (
            <div className="formik-error" style={{margin:"10px"}}>{formik.errors.firstName}</div>
          ) : null}

                <input type='text' placeholder='First Name *' value={formik.values.firstName} onChange={formik.handleChange("firstName")} className='checkout-input'/>
                
                &nbsp;
                &nbsp;
                &nbsp;

                {formik.touched.lastName && formik.errors.lastName ? (
            <div className="formik-error" style={{margin:"10px"}}>{formik.errors.lastName}</div>
          ) : null}

                <input type='text' placeholder='Last Name *' value={formik.values.lastName} onChange={formik.handleChange("lastName")} className='checkout-input'/>

              </div>

              {formik.touched.address && formik.errors.address ? (
            <div className="formik-error" style={{margin:"10px"}}>{formik.errors.address}</div>
          ) : null}

              <input type='text' placeholder='Address *' className='checkout-input' value={formik.values.address} onChange={formik.handleChange("address")}/> 

              <div className='names'>

              {formik.touched.city && formik.errors.city ? (
            <div className="formik-error" style={{margin:"10px"}}>{formik.errors.city}</div>
          ) : null}

                <input type='text' placeholder='City *' value={formik.values.city} onChange={formik.handleChange("city")} className='checkout-input'/>
                &nbsp;
                &nbsp;
                &nbsp;

                {formik.touched.province && formik.errors.province ? (
            <div className="formik-error" style={{margin:"10px"}}>{formik.errors.province}</div>
          ) : null}

                <input type='text' placeholder='Province *' value={formik.values.province} onChange={formik.handleChange("province")} className='checkout-input'/>

                &nbsp;
                &nbsp;
                &nbsp;

                {formik.touched.pinCode && formik.errors.pinCode ? (
            <div className="formik-error" style={{margin:"10px"}}>{formik.errors.pinCode}</div>
          ) : null}

                <input type='text' placeholder='ZIP Code *' value={formik.values.pinCode} onChange={formik.handleChange("pinCode")} className='checkout-input'/>
              </div>

              <button type="submit" className='slide-btn' style={{float:"right",marginTop:"30px"}}>Place Order</button>

            </form>
        </div>
        <div className='line'></div>
        <div className='checkout-dashboard'>
          <ul className='checkout-items'>
          {
            cart.map((item)=>(
              <li key={item._id} className='item'>
                <div className='item-image'>
                  <img src={`${item.productId.images[0]}`} alt=''/>
                  <span>{item.qty}</span>
                </div>
                <div className='item-title'>
                  <p>{item.productId.title}</p>
                  <span>Color:<p style={{backgroundColor:`${item.color.value}`,width:"30px",height:"30px",borderRadius:"50%"}}></p></span>
                </div>
                <div className='item-total'>
                  <p>${item.total}</p>
                </div>
              </li>
            ))
          }
          </ul>
          <hr/>
          <ul className='checkout-bill'>
            <li>
              <p>Subtotal</p>
              <p>${subTotal}</p>
            </li>
            <li>
              <p>Shipping</p>
              <p>$5</p>
            </li>
            <li>
              <p>Total</p>
              <p>${subTotal+5}</p>
            </li>
          </ul>
        </div>
    </div>
    </>
   
  )
}

export default CheckOut