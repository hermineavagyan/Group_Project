import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import {Button, Card, Box, CardHeader, CardContent, Grid, Grow} from '@material-ui/core'
import NavBar from "../components/NavBar";
import { textAlign } from "@mui/system";


const Home = () => {

    const [itemList, setItemList] = useState([]);
    const [products, setProducts] = useState({})
    const [user, setUser] = useState({});

=======
import {Button, Card, Box, CardContent, IconButton, CardActions} from '@material-ui/core';
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
>>>>>>> bedec75cff78233681323d06705cceb4f18625c5
    const navigate = useNavigate();

    var cardStyle = {
        
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '30vw',
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
    
    // const deleteCity = (idFromBelow)=>{
    //     axios.delete(`http://localhost:8000/api/items/${idFromBelow}`)
    //         .then((res)=>{
    //             console.log(res);
    //             console.log(res.data);
    //             setItemList(itemList.filter(item => item._id !== idFromBelow))
    //         })
    //         .catch((err)=>console.log(err))
    // }
    useEffect(() => {
        const getALlUsers = async(e)=>{
            try{
                const res = await axios.get("http://localhost:8000/api/users",
                { withCredentials: true }
            )
                console.log(res.data);
                setUser(res.data);
                }
<<<<<<< HEAD
            catch(err)
            {console.log(err)};
=======
                catch (err) {
                console.log(err);
            }

>>>>>>> bedec75cff78233681323d06705cceb4f18625c5
        }
        getALlUsers();
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

<<<<<<< HEAD
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
                        
                        
                        <CardContent>
                        <img 
                        style={{width:'50%', minWidth: '168px', margin: '10px auto', display: 'block'}}
                        src={item.images}
                        alt='product'
                        />
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        </CardContent>
                        <Link to={`/item/${item._id}`}>{item.name}</Link>
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

=======
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
>>>>>>> bedec75cff78233681323d06705cceb4f18625c5
        </div>
        </div>
        
    )
}

export default Home;