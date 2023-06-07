import { useEffect } from "react";
import PageTopBanner from "../components/PageTopBanner";
import {useFormik} from "formik"
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import * as Yup from "yup"
import { register } from "../features/auth/authSlice";
const SignUp = () => {

  const dispatch = useDispatch()
  const {message}=useSelector((state)=>state.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(message){
      setTimeout(()=>{
        navigate("/login")
      },2000)
    }
  },[message,navigate])

  const formik=useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      mobile:"",
      password:"",
      email:""
    },
    validationSchema:Yup.object({
      firstname:Yup.string().required("FirsName is Required"),
      lastname:Yup.string().required("Last Name is Required"),
      email:Yup.string().email().required("Email is Required"),
      mobile:Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required('A phone number is required'),
      password:Yup.string().min(8).required("Password is Required")
    }),
    onSubmit:(values)=>{
      dispatch(register(values))
    }
  })


  return (
    <>
      <PageTopBanner pagename="Create Account" />
      <div className="main-container login-container">
        <div className="login-form-container">
          <h1>Create Account</h1>
          <form className="login-form" onSubmit={formik.handleSubmit}>

          {formik.touched.firstname && formik.errors.firstname ? (
            <div className="formik-error">{formik.errors.firstname}</div>
          ) : null}

          <input className="account-input" type="text" placeholder="First Name" value={formik.values.firstname} onChange={formik.handleChange("firstname")}/>

          {formik.touched.lastname && formik.errors.lastname ? (
            <div className="formik-error">{formik.errors.lastname}</div>
          ) : null}

          <input className="account-input" type="text" placeholder="Last Name" value={formik.values.lastname} onChange={formik.handleChange("lastname")}/>

          {formik.touched.mobile && formik.errors.mobile ? (
            <div className="formik-error">{formik.errors.mobile}</div>
          ) : null}

          <input className="account-input" type="tel" placeholder="Mobile Number" value={formik.values.mobile} onChange={formik.handleChange("mobile")}/>

          {formik.touched.email && formik.errors.email ? (
            <div className="formik-error">{formik.errors.email}</div>
          ) : null}

          <input className="account-input" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange("email")}/>

          {formik.touched.password && formik.errors.password ? (
            <div className="formik-error">{formik.errors.password}</div>
          ) : null}

          <input className="account-input" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange("password")}/>

            <span className="create-btn">
              <button type="submit" className="slide-btn">Sign Up</button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
