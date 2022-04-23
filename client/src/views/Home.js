import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Button, Card, Box, CardHeader, CardContent, Grid, Grow} from '@material-ui/core'
import NavBar from "../components/NavBar";
import { textAlign } from "@mui/system";


const Home = () => {

    const [itemList, setItemList] = useState([]);
    const [products, setProducts] = useState({})
import {Button, Card, Box, CardHeader, CardContent} from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Home = () => {

    const [productList, setProductList] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [user, setUser] = useState({});
    const [price, setPrice] = useState("");
    const [productPrice, setProductPrice] = useState([]);
    const navigate = useNavigate();

    var cardStyle = {
        
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '40vw',
        marginTop: '20px',
        marginLeft:'18px'
    }

    useEffect(() => {
       const getAllItems = async (e)=>{
           try {
            const res = await axios.get("http://localhost:8000/products/all")
            
                console.log(res);
                console.log(res.data);
                setItemList(res.data);
            }
           catch(err)
           {console.log(err)}
    }
    getAllItems();
},[])
    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/items")
    //         .then((res) => {
    //             console.log(res);
    //             console.log(res.data);
    //             setItemList(res.data);
    //         })
    //         .catch((err) => console.log(err))
    // }, [])
    const deleteItem = async (idFromBelow)=>{
        try{ const res = await axios.delete(`http://localhost:8000/api/items/${idFromBelow}`)
            console.log(res);
            console.log(res.data);
            setItemList(itemList.filter(item => item._id !== idFromBelow))
    }
    catch(err)
        {console.log(err)}
    }
    
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

    // const Item = (({theme})=>({
    //     textAlign: 'center'
    // }))


    return (
        <div>
            <NavBar/>
            <Box sx={{flexGrow:1}}>

            <Grid container spacing={{sx:2, md:3}} columns={{xs:4, sm:8, md:12}}>

{Array.from(Array(6)).map((_,index)=>(
    <Grid  alignItems="center" item xs={2} sm={4} md={4} key={index}>


            {
                
                itemList.map((item, index) => (
                    <Card elevation={10} style={cardStyle}
                    sx={{ maxHeight: 275}}
                        key={item._id}>
                        
                        <Link to={`/item/${item._id}`}>{item.name}</Link>
                        
                        <CardContent>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        <img 
                        style={{width:'50%', minWidth: '168px', margin: '-3px auto', display: 'block'}}
                        src={item.images}
                        alt='product'
                        />
                        </CardContent>
                        <Button onClick={()=>deleteItem(item._id)} >Delete</Button>
                        <Link to={`/item/edit/${item._id}`}>Edit</Link>
                        <hr/>
                    </Card>

))
}

</Grid>
                            ))}
                            </Grid>
                            </Box>

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