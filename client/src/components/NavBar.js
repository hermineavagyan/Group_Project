import React, { useEffect, useState, useContext } from 'react'
import { AppBar, Container, Toolbar, Typography, Box, Button, IconButton, TextField } from '@material-ui/core'
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from '@mui/material/Link';
import MyContext from './MyContext';
import { useNavigate } from 'react-router-dom';


const NavBar = (props) => {

    const context = useContext(MyContext);
    const {setSearchTerm, user } = props
    const navigate = useNavigate()

    useEffect(()=>{
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/users`,
                {withCredentials: true})
                context.setCartCount(res.data.cartCount);
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    },[])

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

    return (
        <AppBar position='static' style={{marginBottom: '20px'}}>
            <Container maxWidth={false} style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', backgroundColor: '#fe902d', height: "100px"}}>
                <Toolbar disableGutters>
                    <Link
                    style={{fontSize:'40px', color:"white"}}
                    underline='none'
                    noWrap
                    href={"/home"}
                    >MyMusician</Link>
                </Toolbar>
                <form>
                    <TextField 
                    label='Search'
                    name='search'
                    variant='outlined'
                    size='small'
                    sx={{
                        color: 'white'
                    }}
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                    />
                </form>
                    <Box style={{display: 'flex'}}>
                        <Box style={{display: 'flex', alignItems:'center'}}>
                            <Link href={`/users/${user?._id}`} underline='none' color='inherit'>Profile</Link>
                            <IconButton style={{color: 'white'}}> {<ShoppingCartIcon/>}
                                {/* <p style={{fontSize: '16px'}}>{user?.cartCount}</p> */}
                                <p style={{fontSize: '16px'}}>{context.cartCount}</p>
                            </IconButton>
                        </Box>
                        <Button style={{color: 'white'}} onClick={logout}>Log Out</Button>
                    </Box>
            </Container>
        </AppBar>
    )
}

export default NavBar