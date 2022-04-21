import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Button, Card, Box, CardHeader, CardContent} from '@material-ui/core'


const Home = () => {

    const [itemList, setItemList] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    var cardStyle = {
        
        display: 'block',
        width: '30vw',
        transitionDuration: '0.3s',
        height: '45vw'
    }

    useEffect(() => {
       const getAllItems = async (e)=>{
           try {
            const res = await axios.get("http://localhost:8000/api/items")
            
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
    return (
        <div>
            {
                itemList.map((item, index) => (
                    <Card elevation={10} style={cardStyle} 
                        
                        key={item._id}>
                        
                        <Link to={`/item/${item._id}`}>{item.name}</Link>
                        
                        <CardContent>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        </CardContent>
                        <Button onClick={()=>deleteItem(item._id)} >Delete</Button>
                        <Link to={`/item/edit/${item._id}`}>Edit</Link>
                        <hr/>
                    </Card>

                ))
            }

        </div>
    )
}

export default Home;