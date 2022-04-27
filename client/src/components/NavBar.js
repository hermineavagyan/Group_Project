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
            await axios.post("http://localhost:8000/api/users/logout",
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
            <Container maxWidth={false} style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', backgroundColor: '#fe902d', height: "120px"}}>
                <Toolbar disableGutters>
                    <Link
                    style={{width:'260px'}}
                    underline='none'
                    noWrap
                    href={"/home"}
                    >
                    <img src={require('../img/mymusician.png')} alt="logo" style={{width:'100%'}} />
                    </Link>
                </Toolbar>
                <form style={{width:"260px"}}>
                    <TextField 
                    label='Search'
                    name='search'
                    variant='outlined'
                    size='small'
                    style={{margin: '0 auto', width:'80%'}}
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                    />
                </form>
                    
                        <Box style={{display: 'flex', alignItems:'center', justifyContent: 'space-between', width: '260px', flexWrap:'wrap'}}>
                            <Link href={`/users/${user?._id}`} underline='none' color='inherit'>Profile</Link>
                            <IconButton style={{color: 'white'}}> {<ShoppingCartIcon/>}
                                <p style={{fontSize: '16px'}}>{context.cartCount}</p>
                            </IconButton>
                            <Button style={{color: 'white', width:'75px', fontSize:'12px', height: '30px'}} onClick={logout}>Log Out</Button>
                        </Box>
                    
            </Container>
        </AppBar>
    )
}

export default NavBar