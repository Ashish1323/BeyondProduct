import React,{useState} from 'react';
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { isAuthenticated }  from '../auth/helper';
import {createCategory} from './helper/adminapicall'


const AddCategory = () => {
   const [name,setName]= useState();
   const[error,setError]= useState(false)
   const[success,setSuccess]= useState(false);

   const {user,token}= isAuthenticated();

   const handleChange = event =>{
    
         setError("")
         setName(event.target.value)
    
   };

   const onSubmit = (event) =>{
       event.preventDefault();
       setError("");
       setSuccess(false);
   
    createCategory(user._id, token, {name})
      .then(data =>{
          if(data.err){
              setError(true)
          }else{
              setError("")
              setSuccess(true)
              setName("")
          }
      }) 

    }
    //   const onSubmit = event => {
    //     event.preventDefault();
    //     setError("");
    //     setSuccess(false);
    
    //     //backend request fired
    //     createCategory(user._id, token, { name }).then(data => {
    //       if (data.error) {
    //         setError(true);
    //       } else {
    //         setError("");
    //         setSuccess(true);
    //         setName("");
    //       }
    //     });
    // }    
  




    const goBack=()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard" >Admin Home</Link>
        </div>
    )
    const successMessage=()=>{
              if(success){
                  return(
                      <h4 className="text-success">Category Created Successfully</h4>
                  )
              }
    }
const warningMessage=()=>{
         if(error){
             return(
                <h4 className="text-success">Category Failed to Create</h4>
             )
         }
        
    }
   const myCategoryForm = () =>(
   <form>
       <div className="fom-group">
           <p className="lead">Enter the category </p>
           <input type="text" className="form-control my-2" 
           autofocus required 
           placeholder="Ex Summer t-shirts"
           onChange={handleChange}
           value={name}
            />
           <button className="btn btn-outline-info mb-2 "
             onClick={ onSubmit}>CreateCategory</button>
       </div>
   </form>
   )

    return (
        <Base 
        title="Add Category Here" 
        description="Here You can add T-shirts category"
        className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default AddCategory;
