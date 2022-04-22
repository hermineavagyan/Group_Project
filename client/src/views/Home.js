import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Button, Card, Box, CardHeader, CardContent} from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const Home = () => {

    const [productList, setProductList] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [user, setUser] = useState({});
    const [price, setPrice] = useState("")
    const [productPrice, setProductPrice] = useState('')
    

    const navigate = useNavigate();


    
useEffect(()=> {
    const allProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/products/all')
            
            setProductList(res.data)
            // console.log(productList)
            const priceResponse = await axios.get('http://localhost:8000/prices/all')
            setPriceList(priceResponse)
            //console.log(priceResponse.data.data)
            let arr = []
            for (let i = 0; i < priceResponse.data.data.length; i++){
                let product_Price = {}
            // for (let i = 0; i < priceResponse.data.data.length; i++){
                const str = priceResponse.data.data[i].unit_amount_decimal
                var resStr = str.substring(0,str.length-2)+"."+str.substring(str.length-2);
                    // product_Price.push(`${priceResponse.data.data[i].product}: ${priceResponse.data.data[i].unit_amount_decimal}`)
                
                    // product_Price.push(`${priceResponse.data.data[i].product}: ${resStr}`)
                    product_Price[priceResponse.data.data[i].product] = resStr
                    // console.log(product_Price)
                    arr.push(product_Price) 
                    
                    // product_price.push([priceResponse.data.data[i].product, resStr])
                    // setPrice(resStr)
                    // console.log('this is resStr' + ' ' + resStr)
                }
                setProductPrice(arr)
                // console.log(arr)
                // console.log(product_Price.prod_LWpn0GCVtlQ92C)
                

            } 
            //setProductPrice(resStr)
            catch (err) {
            console.log(err)
        }
    }
    allProducts()
}, [])

    const logout = async (e) => {
        try{
        const res = await axios.post("http://localhost:8000/api/users/logout",
                {}, 
                {
                    withCredentials: true,
                },
            )
                console.log(res);
                console.log(res.data);
                navigate("/");
        } 
                catch(err) {
                    console.log(err);
                };
    };


    
    const priceSearch = (mapProductId, productPriceObj) => {
        console.log(productPriceObj)
        // console.log(mapProductId)

        // for(var i = 0; i < priceList.length; i++){
        //     if(mapProductId === productPriceObj[i].mapProductId){

        //     }
        // }

        // if(productPriceObj[0].prod_LYLFQIhSP81Ffl === prod_LYLFQIhSP81Ffl){
        //     console.log("true")
        // }


        // let myVar = mapProductId
        // const filteredProduct = productPriceObj.filter(priceId => priceId.myVar === mapProductId ) 
        // console.log(filteredProduct)

        // for(var i = 0; i < priceList.length; i++ ){
        //     let filteredProductId = productPriceObj.filter((sinlgeProductId)=>{
        //         return sinlgeProductId.mapProductId === mapProductId
                
        //     })
        //     console.log(filteredProductId)
            // if(mapProductId === productPriceObj[i]){ // We must access productPriceObj through i
                
            //     // return productPrice[i][0]
            //     // console.log(productPrice[i][0])
            //     console.log('true')
            // } else {
            //     console.log('false')
            // }
        // }
    //     if(typeof mapProductId === 'string' || typeof productPriceObj[0][0] === 'string'){
    //         // console.log('its a string')
    //     } else{

    //         // console.log('its not')
    // }


        // priceArr.push(<p>{mapProductId}</p>)
        // console.log("This is price arr" + priceArr[0])

        // Don't forget to add return!!!
    }

    // console.log("Product List" + productList[0])
    // console.log(productPrice)

    return (
        <div>
        
            {
                productList.map((product, index) => (
                    <Card sx={{ maxWidth: 345 }} elevation={10} key={index}>
                    <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        />
                        
                        {/* key={product._id} */}
                        
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                        
                        <CardContent>

    
        <p>{product.description}</p>
        
            <div>
            
                
                {priceSearch(product.id, productPrice)}
            
            </div>
            
            
        
        
                        
                        </CardContent>

                    </Card>

                ))
            }  

        </div>
    )
}

export default Home;