import React,{useState,useEffect} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom'
import { getCategories, createaProduct } from './helper/adminapicall';
import { isAuthenticated }  from '../auth/helper';


const {user, token} = isAuthenticated()
const AddProduct = () => {
  
    const [values,setValues]= useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        categories:"",
        category:"",
        loading:"false",
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:"",
        errorMessage:false,

    })
     const {name,description,
        price,
        stock,
        categories,
        category,
         loading,
           error,
  createdProduct,
     getaRedirect,
        formData,
    }=values
   
   const preLoad = () =>{
       getCategories().then(data =>{
           if(data.err){
               setValues({...values, error:data.err})
           }else{
               setValues({...values, categories:data ,formData: new FormData()})
               console.log("CATE:" ,categories);
           }
       })
   }

   useEffect(()=>{
       preLoad()
   }, [])

    const handleChange = name =>event =>{
    
        let value= name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value);
        setValues({...values, [name]: value})
    }

    const successMessage = () =>
    (
      <div className="alert alert-success mt-3" 
      style={{ display: createdProduct ? "" : "none" }}>
        <h4>{createdProduct} created successfully!!</h4>

      </div>
    )

    const loadingMessage = () => {
      return (
       loading && (
         setTimeout( <div className="alert alert-info">
         <h2>loading.........</h2>
       </div>, 3000)
        
       )
      );
    };

    const errorMessage = () =>
    (
      <div className="alert alert-danger mt-3" 
      style={{display:error ? "" : "none"}}>
        <h4>{error}</h4>

      </div>
    )
    
    const onSubmit = (event) =>{
        event.preventDefault()
        setValues({...values,error:"",loading:true})
        createaProduct(user._id,token,formData).then(
          data => {
            if(data.err){
              setValues({...values,error:data.err, loading:false})
            }
            else{
                setValues({
                  ...values,
                  name:"",
                  description:"",
                  price:"",
                  stock:"",
                  photo:"",
                  loading:false,
                  createdProduct: data.name,
                  errorMessage:false,
                })
            }
          })
        
    }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((c,index) => (
                <option key={index} value={c._id}>{c.name}</option>
              ) )}
              
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success ">
            Create Product
          </button>
        </form>
      );

    return (
        <Base
        title="Add Product here!!"
        description="Welcome to adding product section"
         className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
               
                    {createProductForm()}
              

                </div>
            </div>
        </Base>
            
        
    );
}

export default AddProduct;