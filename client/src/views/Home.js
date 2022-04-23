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
    const [user, setUser] = useState({})
    

    const [price, setPrice] = useState("");
    const [productPrice, setProductPrice] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=> {
        const allProducts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/products/all');
                setProductList(res.data);
                const priceResponse = await axios.get('http://localhost:8000/prices/all');
                setPriceList(priceResponse);
                let arr = []
                    for (let i = 0; i < priceResponse.data.data.length; i++){
                        let product_Price = {};
                        const str = priceResponse.data.data[i].unit_amount_decimal
                        var resStr = str.substring(0,str.length-2)+"."+str.substring(str.length-2);
                        product_Price.id = priceResponse.data.data[i].product;
                        product_Price.price = resStr;
                        arr.push(product_Price);
                        // setProductPrice([...productPrice, product_Price]);
                    }
                    setProductPrice(arr)
                }
                catch (err) {
                console.log(err);
            }

        }
        allProducts()
    }, [])

    const logout = async (e) => {
        try{
            const res = await axios.post("http://localhost:8000/api/users/logout",
                    {}, 
                    {withCredentials: true,},)
                    // console.log(res);
                    // console.log(res.data);
                    navigate("/");
            } 
            catch(err) {
                console.log(err);
            };
    };

    const priceSearch = (mapProductId, products) => { 
        const targetProduct = products.filter(product => product.id === mapProductId)
        // console.log(targetProduct[0].price)
        return targetProduct[0]?.price;
        // return targetProduct.length === 1 ? targetProduct[0].price: '';
    }

    return (
        <div>
            {productList.map((product, index) => (
                <Card sx={{ maxWidth: 345 }} elevation={10} key={index}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                    <CardContent>
                        <p>{product.description}</p>
                        <div>{priceSearch(product.id, productPrice)}</div>                  
                    </CardContent>
                </Card>
            ))
            }  
        </div>
    )
}

export default Home;