import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import AudiotrackIcon from '@material-ui/icons/Audiotrack'

const Registration = () => {

    const [confirmReg, setConfirmReg] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const paperStyle = {
        padding: '20px',
        height: '60vh',
        maxHeight: '500px',
        width: '280px',
        margin: '20px auto'
    }

    const btnStyle = {
        margin:'20px 0',
        backgroundColor: '#c80a6b'
    }

    const avatarStyle = {backgroundColor: '#c80a6b'}

    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/users/register',
        user,
        {
            withCredentails: true
        })
        .then((res)=>{
            console.log(res.data)
            setUser({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setConfirmReg(
                "Thank you for Registering, you can now log in!",
            )
            navigate("/")
        })
        .catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return (
        <Grid>
        <Typography variant='h2' align='center'>MyMusician</Typography>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={register}>
                <Grid align='center'>
                <Avatar style={avatarStyle}><AudiotrackIcon/></Avatar>
                <h2>Registration</h2>
                </Grid>
                    <div className='inputContainer'>
                    {errors.firstName ? (
                        <span>{errors.username.message}</span>
                    ) : null}
                        <TextField
                        label='First Name'
                        placeholder='Enter First Name'
                        fullWidth
                        type="text"
                        name='firstName'
                        value={user.firstName}
                        onChange={handleChange}
                        />
                    {errors.lastName ? (
                        <span>{errors.username.message}</span>
                    ) : null}
                        <TextField
                        label='Last Name'
                        placeholder='Enter First Name'
                        fullWidth
                        type="text"
                        name='lastName'
                        value={user.lastName}
                        onChange={handleChange}
                        />
                        {errors.email ? (
                        <span>{errors.email.message}</span>
                    ) : null}
                        <TextField 
                        label='Email'
                        placeholder='Enter Email'
                        fullWidth
                        type="text"
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                        />
                        {errors.password ? (
                        <span>{errors.password.message}</span>
                    ) : null}
                        <TextField
                        label='Password'
                        placeholder='Enter Password'
                        fullWidth
                        type="password" 
                        name="password" 
                        value={user.password}
                        onChange={handleChange}
                        />
                        {errors.confirmPassword ? (
                        <span>{errors.confirmPassword.message}</span>
                    ) : null}
                        <TextField 
                        label='Confirm Password'
                        placeholder='Enter Confirm Password'
                        fullWidth
                        type="password" 
                        name="confirmPassword" 
                        value={user.confirmPassword}
                        onChange={handleChange} 
                        />
                    </div>
                        <Button color='primary' fullWidth variant='contained' style={btnStyle}>Register</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Registration