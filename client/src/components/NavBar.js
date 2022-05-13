import React, { useEffect, useState, useContext } from 'react'
import { AppBar, Container, Toolbar, Box, Button, IconButton, TextField, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from '@mui/material/Link';
import MyContext from './MyContext';
import { useNavigate } from 'react-router-dom';



const NavBar = (props) => {

    const context = useContext(MyContext);
    const { setSearchTerm, user, dontDisplaySearch } = props
    const navigate = useNavigate()

    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

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

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const navigateProfile = () => {
        navigate(`/users/${user?._id}`)
    }

    return (
        <AppBar position='static' style={{marginBottom: '20px'}}>
            <Container maxWidth={false} style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', backgroundColor: '#fe8e2ded', height: "100px", position:'fixed', top: 0, zIndex:'1'}} >
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
                <form className={`${dontDisplaySearch}`} style={{width:"260px"}}>
                    <TextField 
                    label='Search'
                    name='search'
                    variant='outlined'
                    size='small'
                    style={{margin: '0 auto', width:'80%'}}
                    InputProps= {{
                        sx: {
                            bgcolor: 'rgba(255, 255, 255, 0.666)',
                        },
                        
                    }}
                    
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                    />
                </form>
                    

                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton style={{color: 'white' }} onClick={() => navigate('/checkout')}>{<ShoppingCartIcon/>}
                                <p style={{fontSize: '16px'}}>{context.cartCount}</p>
                            </IconButton>
                            <Tooltip title="Account settings">
                                <IconButton
                                style={{margin:'0 10px'}}
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                >
                                <MenuIcon sx={{color:'white'}}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={navigateProfile}>
                                <ListItemIcon>
                                    <PersonIcon fontSize='small'/>
                                </ListItemIcon>
                                    Profile
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize='small'/>
                                </ListItemIcon>
                                    Log Out
                            </MenuItem>
                        </Menu>
                        
                        
                    
            </Container>
        </AppBar>
    )
}

export default NavBar