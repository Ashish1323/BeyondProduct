import React, {useEffect,useState} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import {getProducts} from "./helper/coreapicalls"
import "./Home.css"
import "./slider.js"

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
    <Base>
      <div className="swiper-container">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
      		<div classNameName="col-2">
				<h1>The Subtle Art  <br /> of Not Giving a F*ck</h1>
				<p>In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be "positive" all the time so that we can truly become better, happier people.

"<br /></p>
				<a href="" className="btn">Explore Now &#8594;</a>
		</div>
		<div className="col-2">
			<img src="https://cdn.shopify.com/s/files/1/0285/2821/4050/products/9780062457714_2a0b0e71-9fb9-4ec6-b12c-b017961b7503.jpg?v=1603859050" />
		</div>
      </div>
      <div className="swiper-slide">
      		<div className="col-2">
				<h1>Attitude is Everything Rev Ed <br /></h1>
				<p>Mega-successful motivational speaker profiled in the Wall Street Journal, Keith Harrell shows how to put good atttitude to work to get ahead in all aspects of life.<br /></p>
				<a href="" className="btn">Explore Now &#8594;</a>
		</div>
		<div className="col-2">
			<img src="https://cdn.shopify.com/s/files/1/0285/2821/4050/products/9780060779726_6daeb0f6-6ae6-4c91-9a2b-a9bda666f33e.jpg?v=1603221933" />
		</div>
      </div>
      
    </div>
    
    <div className="swiper-pagination"></div>
   
    <div className="swiper-button-next"></div>
    <div className="swiper-button-prev"></div>
  </div>
      <div classNameName="row text-center">
        <h1 classNameName="text-white text-center"> All of Our Products</h1>
        <div classNameName="row">
          {products.map((product,index) => {
                        return (
                            <div key={index} classNameName="col-4 row-4">
                                <Card product={product}/ >
                            </div>
                        )
                    })}
        </div>
      
      </div>
    </Base>
  );
}
