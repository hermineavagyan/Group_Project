import { AppBar, Container, Toolbar, Typography, Box, Button, IconButton, TextField } from '@material-ui/core'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react'
import Link from '@mui/material/Link';




const NavBar = (props) => {

    const {setSearchTerm, user,} = props
    const [cartNumber, setCartNumber] = useState(0)

    useEffect(()=>{
        const getUser = async () => {
            try {
                const res = axios.get(`http://localhost:8000/api/users`,
                {withCredentials: true})
                setCartNumber(res.data.cartCount)
                console.log(cartNumber)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    },[])

    return (
        <AppBar position='static' style={{marginBottom: '20px'}}>
            <Container maxWidth={false} style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', backgroundColor: 'E0AF3A', height: "100px"}}>
                <Toolbar disableGutters>
                    <Typography
                    variant='h4'
                    noWrap
                    component='div'
                    >MyMusician</Typography>
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
                    <Link href={'#'} underline='none' color='inherit'>Profile</Link>
                    
                        <IconButton style={{color: 'white'}}> {<ShoppingCartIcon/>}
                            <p style={{fontSize: '16px'}}>{user?.cartCount}</p>
                        </IconButton>
                    </Box>
                        
                        <Button style={{color: 'white'}}>Log Out</Button>
                    </Box>
            </Container>

        </AppBar>
    )
}

export default NavBar