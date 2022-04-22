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

    const navigate = useNavigate();


    
useEffect(()=> {
    const allProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/products/all')
            
            setProductList(res.data)
            //console.log(res.data)
            const priceResponse = await axios.get('http://localhost:8000/prices/all')
            setPriceList(priceResponse)
            //console.log(priceResponse.data.data)
            let product_Price = []
            for (let i = 0; i < priceResponse.data.data.length; i++){
            // for (let i = 0; i < priceResponse.data.data.length; i++){
                const str = priceResponse.data.data[i].unit_amount_decimal
                var resStr = str.substring(0,str.length-2)+"."+str.substring(str.length-2);
                    // product_Price.push(`${priceResponse.data.data[i].product}: ${priceResponse.data.data[i].unit_amount_decimal}`)
                    product_Price.push(`${priceResponse.data.data[i].product}: ${resStr}`)
                }
                setPrice(resStr)
                console.log(product_Price)

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
    return (
        <div>
           
            {
              productList.map((product, index) => (
                    <Card sx={{ maxWidth: 345 }} elevation={10}>
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
        
          
                <p>This is the price {product.price}</p>
         
        
                        
                        </CardContent>

                    </Card>

                ))
            }  

        </div>
    )
}

export default Home;