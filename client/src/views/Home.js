import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Button, Card, Box, CardHeader, CardContent, Grid, Grow} from '@material-ui/core'
import NavBar from "../components/NavBar";
import { textAlign } from "@mui/system";


const Home = () => {

    const [itemList, setItemList] = useState([]);
    const [products, setProducts] = useState({})
    const [user, setUser] = useState({});

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
            catch(err)
            {console.log(err)};
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
                        style={{width:'50%', minWidth: '168px', margin: '10px auto', display: 'block'}}
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

        </div>
    )
}

export default Home;