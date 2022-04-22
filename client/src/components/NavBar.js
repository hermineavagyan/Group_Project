import { AppBar, Container, Toolbar, Typography, Box, Button, IconButton } from '@material-ui/core'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react'

const NavBar = () => {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        }));

        const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }));

        const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
            width: '20ch',
            },
        },
        }));

    return (
        <AppBar position='static'>
            <Container maxWidth style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', backgroundColor: '', height: "100px"}}>
                <Toolbar disableGutters>
                    <Typography
                    variant='h4'
                    noWrap
                    component='div'
                    
                    >MyMusican</Typography>
                </Toolbar>

                <Box >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    </Search>
                    </Box>
                    <Box>
                        <IconButton style={{color: 'white'}}>{<ShoppingCartIcon/>}</IconButton>
                        <Button style={{color: 'white'}}>Log Out</Button>
                    </Box>
            </Container>

        </AppBar>
    )
}

export default NavBar