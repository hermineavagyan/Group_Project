import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Card,CardContent,Container, Grid} from '@material-ui/core';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';



const Home = () => {

    const grey = "#9E9E9E"
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
    var cardStyle = {
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '40vw',
        marginTop: '20px',
        marginLeft: '18px'
    }

    return (
    
        <Grid container spacing={2}>
        
            {productList.map((product, index) => (
                <Card elevation = {3} style = {cardStyle} sx = {{maxHeight:275}} key={index}>
                    <h6 style = {{margin: '20px'}}><Link to={`/product/${product._id}`}>{product.name}</Link></h6> 
                
                    <CardContent>
                        <img style = {{height: '50%', maxHeight: '60%', width: '70%', boxShadow: `5px 3px 5px ${grey} `, border: '2px solid black'}} src = {product.name} alt = '{product.name}'/>
                        <div style = {{textAlign: "center", marginTop: "30px"}}>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        </div >

                            <FormHelperText>
                                Price: {priceSearch(product.id, productPrice)}
                            </FormHelperText>
                    </CardContent>

                    <CardActions>
                    <Button size="small">Add to Cart</Button>
                    </CardActions>

                </Card>
            ))
            }  
        </Grid>
    )
}

export default Home;