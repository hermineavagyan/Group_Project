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

    const navigate = useNavigate();


    
useEffect(()=> {
    const allProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/products/all')
            
            //setProductList(res.data)
            console.log(res.data)
            const priceResponse = await axios.get('http://localhost:8000/prices/all')
            //setPriceList(priceResponse)
            console.log(priceResponse)
           // const str = price.data.data[0].unit_amount_decimal
            // var resStr = str.substring(0,str.length-2)+"."+str.substring(str.length-2);
            // console.log(price.data.data[0].unit_amount_decimal)
            
            //setProductPrice(resStr)
        } catch (err) {
            console.log(err)
        }
    }
    allProducts()
}, [])

    // const deleteItem = async (idFromBelow)=>{
    //     try{ const res = await axios.delete(`http://localhost:8000/api/items/${idFromBelow}`)
    //         console.log(res);
    //         console.log(res.data);
    //         setItemList(itemList.filter(item => item._id !== idFromBelow))
    // }
    // catch(err)
    //     {console.log(err)}
    // }
    

    // useEffect(() => {
    //     const getALlUsers = async(e)=>{
    //         try{
    //             const res = await axios.get("http://localhost:8000/api/users",
    //             { withCredentials: true }
    //         )
    //             console.log(res.data);
    //             setUser(res.data);
    //             }
    //         catch(err)
    //         {console.log(err)};
    //     }
    //     getALlUsers();
    // }, [])

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
           
            {/* {
                itemList.map((item, index) => (
                    <Card sx={{ maxWidth: 345 }} elevation={10}>
                    <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
                        
                        key={item._id}
                        
                        <Link to={`/item/${item._id}`}>{item.name}</Link>
                        
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        </CardContent>
                        <Button onClick={()=>deleteItem(item._id)} >Delete</Button>
                        <Link to={`/item/edit/${item._id}`}>Edit</Link>
                    </Card>

                ))
            } */}

        </div>
    )
}

export default Home;