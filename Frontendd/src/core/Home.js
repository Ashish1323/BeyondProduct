import React, {useEffect,useState} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import {getProducts} from "./helper/coreapicalls"

export default function Home() {
const [products, setProducts] = useState([])
const [error, setError] = useState(false)

const LoadAllProducts = () =>{
    getProducts().then(data=>{
      if(data.err){
        setError(data.err);
      }
      else(
        setProducts(data)
      )
    })
}

useEffect(() => {
  LoadAllProducts()
}, [])

  return (
    <Base title="Beyond Product" description="Welcome to the Book Store">
      <div className="row text-center">
        <h1 className="text-white text-center"> All of Our Products</h1>
        <div className="row">
          {products.map((product,index) => {
                        return (
                            <div key={index} className="col-4 row-4">
                                <Card product={product}/ >
                            </div>
                        )
                    })}
        </div>
      
      </div>
    </Base>
  );
}
