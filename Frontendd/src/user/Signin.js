import React, { useState,setValues } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth/helper"



const Signin = () => {
const [values,setValues] = useState({
  email:"loda@loda.com",
  password:"12345",
  error:"",
  loading:false,
  didRedirect:false
})

const {email,password,error,loading,didRedirect} = values
const {user} = isAuthenticated()

const handleChange = name => event => {
  setValues({ ...values, error: false, [name]: event.target.value });
};


const loadingMessage = () => {
  return (
   loading && (
     <div className="alert alert-info">
       <h2>loading.........</h2>
     </div>
   )
  );
};

const errorMessage = () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );
};

const onSubmit =event=> {
  event.preventDefault()
  setValues({...values,error:false,loading:true})
  signin({email,password})
  .then(data => {
    if(data.err){
      setValues({...values,error:data.err,loading:false})
    }
    else{
      authenticate(data,() => {
        setValues({
          ...values,
          didRedirect:true
        })
      })
    }
  })
  .catch(console.log("signin request failed!!"))

}

const performRedirect =() => {
  if(didRedirect){
    if(user && user.role === 1){
        return <Redirect to="/admin/dashboard" />
    } else {
      return <Redirect to="/user/dashboard" />
    }
  }
  if(isAuthenticated()){
    return <Redirect to="/" />
  }
}


  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" value={email} onChange={handleChange("email")}/>
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password"  onChange={handleChange("password")} value={password}/>
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
    {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
