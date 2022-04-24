import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Button, Card, Box, CardContent, IconButton} from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import NavBar from "../components/NavBar";

const Home = () => {

    const grey = "#9E9E9E"
    const [productList, setProductList] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [user, setUser] = useState({})
    

    const [price, setPrice] = useState("");
    const [productPrice, setProductPrice] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
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
    

    const cardStyle = {
        width: '15%',
        minWidth: '260px',
        padding: '20px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    }

    const imageStyle = {
        width: '100%',
        objectFit: 'contain',
        marginTop: '10px'
    }

    return (
        <div>
            <NavBar setSearchTerm={setSearchTerm}/>
        <div style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center'}}>
            {productList.map((product, index) => (
                <Card sx={{ maxWidth: 345 }} elevation={10} key={index} style={cardStyle}>
                    <Link style={{textDecoration: 'none', color: 'black', fontWeight:'500'}} to={`/product/${product.id}`}>
                    {product.name}
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="260px"
                        image={product.images}
                        style={imageStyle}
                    />
                    </Link>
                    <CardContent style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography fontWeight={700}>${priceSearch(product.id, productPrice)}</Typography>  
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <AddShoppingCartIcon />
                        </IconButton>                
                    </CardContent>

                    <CardActions>
                    <Button size="small">Add to Cart</Button>
                    </CardActions>

                </Card>
            ))
            }  
        </div>
        </div>
        
    )
}

export default Home;