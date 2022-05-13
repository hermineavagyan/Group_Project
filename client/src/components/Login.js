import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'



const Login = (props) => {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const paperStyle = {
        padding: '30px',
        height: '28vh',
        minHeight: '425px',
        width: '300px',
        margin: '20px auto'
    }

    const btnStyle = {
        margin:'20px 0 40px 0',
        backgroundColor: '#9f29ad'
    }

    const avatarStyle = {backgroundColor: '#fe902d'}

    const loginInputs = {
        padding:'10px 0',
    }


    const login = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post("http://localhost:8000/api/users/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true,
                },
            )
            console.log(res.data)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message)
        }
    }


    return (



        <Grid style={{margin:"0 auto"}}>
            <Grid style={{width:'400px',display:'block', margin:'60px auto'}}>
            <img src={require('../img/mymusician-black.png')} alt="logo" style={{width:'90%', margin:'0 auto', display:'block'}}/>
            </Grid>
                
            {/* <Typography variant='h2' align='center' style={{margin: '50px 0'}}>MyMusician</Typography> */}
                <Paper elevation={10} style={paperStyle}>
                
                    <form onSubmit={login}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><AudiotrackIcon/></Avatar>
                        <h2 className='title'>Login</h2>
                        <Typography style={{color:'red'}}>{errorMessage ? errorMessage : ''}</Typography>
                    </Grid>
                        <TextField 
                        variant='standard'
                        label='Email'
                        placeholder='Enter Email'
                        fullWidth
                        type="text"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        style={loginInputs}
                        />
                        <TextField
                        variant='standard'
                        label='Password'
                        placeholder='Enter Password'
                        fullWidth
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        style={loginInputs}
                        />
                        <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Sign In</Button>
                        <Typography align='center'>
                            <Link style={{color:'black',}} to={"/registration"}>Create An Account</Link>
                        </Typography>
                    
                    </form>
                </Paper>
            
        </Grid>
    )
}

export default Login