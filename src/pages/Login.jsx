import { useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import PageTopBanner from "../components/PageTopBanner";
import { useDispatch,useSelector } from "react-redux";
import * as Yup from "yup"
import { useFormik } from "formik";
import { login } from "../features/auth/authSlice";
import setToken from "../utils/token";

const Login = () => {
 
  const dispatch = useDispatch()
  const {user}=useSelector((state)=>state.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user){
      setToken(user.token)
      setTimeout(()=>{
        navigate("/store")
      },2000)
    }
  },[user,navigate])

  const formik=useFormik({
    initialValues:{
      password:"",
      email:""
    },
    validationSchema:Yup.object({
      email:Yup.string().email().required("Email is Required"),
      password:Yup.string().required("Password is Required")
    }),
    onSubmit:(values)=>{
      dispatch(login(values))
    }
  })

  return (
    <>
      <PageTopBanner pagename="Account" />
      <div className="main-container login-container">
      <div className="login-form-container">
          <h1>Login</h1>
          <form className="login-form" onSubmit={formik.handleSubmit}>

          {formik.touched.email && formik.errors.email ? (
            <div className="formik-error">{formik.errors.email}</div>
          ) : null}

          <input className="account-input" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange("email")}/>

          {formik.touched.password && formik.errors.password ? (
            <div className="formik-error">{formik.errors.password}</div>
          ) : null}

          <input className="account-input" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange("password")}/>
            <Link to="/reset-password">Forgot Password?</Link>
            <span className="btn-container">
              <button type="submit" className="slide-btn">Login</button>
              <button className="slide-btn-1" onClick={()=>{
                navigate("/signup")
              }}>Sign Up</button>

            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
