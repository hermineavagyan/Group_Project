import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import AudiotrackIcon from '@material-ui/icons/Audiotrack'



const Login = (props) => {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const paperStyle = {
        padding: '20px',
        height: '50vh',
        maxHeight: '440px',
        width: '280px',
        margin: '20px auto'
    }

    const btnStyle = {
        margin:'20px 0',
        backgroundColor: '#c80a6b'
    }

    const avatarStyle = {backgroundColor: '#c80a6b'}


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



        <Grid>
            <Typography variant='h2' align='center' style={{margin: '50px 0'}}>MyMusician</Typography>
                <Paper elevation={10} style={paperStyle}>
                <p>{errorMessage ? errorMessage : ''}</p>
                    <form onSubmit={login}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><AudiotrackIcon/></Avatar>
                        <h2 className='title'>Login</h2>
                    </Grid>
                        <TextField 
                        label='Email'
                        placeholder='Enter Email'
                        fullWidth
                        type="text"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField
                        label='Password'
                        placeholder='Enter Password'
                        fullWidth
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Sign In</Button>
                        <Typography align='center'>
                            <Link to={"/registration"}>Create An Account</Link>
                        </Typography>
                    
                    </form>
                </Paper>
            
        </Grid>
    )
}

export default Login