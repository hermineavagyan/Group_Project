import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Grid, Paper, TextField, Typography, Select, MenuItem } from '@material-ui/core'
import AudiotrackIcon from '@material-ui/icons/Audiotrack'
import { State }  from 'country-state-city';

const Registration = () => {
    
    const [selectedState, setSelectedState] = useState("")
    const [userId, setUserId] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const usArray = State.getStatesOfCountry('US')
    let states = [];
    for (let i = 0; i < usArray.length; i++){
        states.push(usArray[i].isoCode);
    }

    const handleStateSelect = (e)=> {
        console.log("Selected state", e.target.value);
        const statesSel = e.target.value;
        setSelectedState(statesSel);
    }

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        city: '',
        country: '',
        state: '',
        street: '',
        postalCode: '',
    })

    const paperStyle = {
        padding: '40px',
        height: '50vh',
        minHeight: '850px',
        width: '300px',
        margin: '20px auto'
    }

    const btnStyle = {
        margin:'40px 0',
        backgroundColor: '#9f29ad'
    }

    const avatarStyle = {backgroundColor: '#fe902d'}

    const regInputs = {
        padding:'2px 0',
    }

    const handleChange = (e) =>{
        console.log(e)
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
        console.log("sup")
    }

    const register = async (e) => {
        try {
        e.preventDefault()
        console.log("sdasas")
        const stripeCustomer = await axios.post('http://localhost:8000/create-customer',
        {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phone: user.phoneNumber,
            address: {
                city: user.city,
                country: "US",
                line1: user.street,
                line2: '',
                postal_code: user.postalCode,
                state: selectedState,
            }
        },  {withCredentails: true})
        console.log(stripeCustomer.data)
        setUserId(stripeCustomer.data)
        // console.log(userId)
        
        if(userId !== null){
            console.log(stripeCustomer.data)
            const dataBase = await axios.post('http://localhost:8000/api/users/register',
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword,
                phoneNumber: user.phoneNumber,
                address: {
                    city: user.city,
                    country: "US",
                    state: selectedState,
                    street: user.street,
                    postalCode: user.postalCode
                },
                customerId: stripeCustomer.data
            },  
            
            {withCredentails: true})
                console.log(dataBase.data)
        }
        
        
            navigate("/")

        } catch (err) {
            console.log(err)
            setErrors(err.response.data.errors)
        }
    }

    return (
        <Grid>
            <Grid style={{width:'400px',display:'block', margin:'60px auto'}}>
            <img src={require('../img/mymusician-black.png')} alt="logo" style={{width:'90%', margin:'0 auto', display:'block'}}/>
            </Grid>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={register}>
                <Grid align='center'>
                <Avatar style={avatarStyle}><AudiotrackIcon/></Avatar>
                <h2>Registration</h2>
                </Grid>
                        <TextField
                        label='First Name'
                        placeholder='Enter First Name'
                        fullWidth
                        type="text"
                        name='firstName'
                        value={user.firstName}
                        style={regInputs}
                        onChange={handleChange}
                        error={!!errors?.firstName}
                        helperText={errors.firstName? errors.firstName.message : null}
                        />
                        <TextField
                        label='Last Name'
                        placeholder='Enter First Name'
                        fullWidth
                        type="text"
                        name='lastName'
                        value={user.lastName}
                        style={regInputs}
                        onChange={handleChange}
                        error={!!errors?.lastName}
                        helperText={errors.lastName? errors.lastName.message : null}
                        />
            
                        <TextField 
                        label='Email'
                        placeholder='Enter Email'
                        fullWidth
                        type="text"
                        name='email'
                        value={user.email}
                        style={regInputs}
                        onChange={handleChange}
                        error={!!errors?.email}
                        helperText={errors.email? errors.email.message : null}
                        />

                        <TextField
                        label='Phone Number'
                        placeholder='Enter Phone Number'
                        fullWidth
                        type="text"
                        name='phoneNumber'
                        value={user.phoneNumber}
                        style={regInputs}
                        onChange={handleChange}
                        error={!!errors?.phoneNumber}
                        helperText={errors.phoneNumber? errors.phoneNumber.message : null}
                        />
                        <TextField
                        label='Password'
                        placeholder='Enter Password'
                        fullWidth
                        type="password" 
                        name="password" 
                        value={user.password}
                        style={regInputs}
                        onChange={handleChange}
                        error={!!errors?.password}
                        helperText={errors.password? errors.password.message : null}
                        />
                        
                        <TextField 
                        label='Confirm Password'
                        placeholder='Enter Confirm Password'
                        fullWidth
                        type="password" 
                        name="confirmPassword" 
                        value={user.confirmPassword}
                        style={regInputs}
                        onChange={handleChange} 
                        error={!!errors?.confirmPassword}
                        helperText={errors.confirmPassword? errors.confirmPassword.message : null}
                        />
                            <Typography variant='subtitle1' align='center' style={{marginTop: '20px'}}>Address</Typography>
                            <TextField
                            label='Country'
                            placeholder='Enter a country'
                            defaultValue = 'US'
                            fullWidth
                            style={regInputs}
                            type="text"
                            name='country'
                            disabled = {true}
                            // onChange={handleChange}
                            />
                            <TextField
                            label='City'
                            placeholder='Enter City'
                            fullWidth
                            style={regInputs}
                            type="text"
                            name='city'
                            value={user.city}
                            onChange={handleChange}
                            />
                            <TextField
                            label='Street'
                            placeholder='Enter Street'
                            fullWidth
                            style={regInputs}
                            type="text"
                            name='street'
                            value={user.street}
                            onChange={handleChange}
                            />
                            
                            {/* <InputLabel id="demo-simple-select-label">State</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedState}
                                label="State"
                                style={regInputs}
                                onChange={e => handleStateSelect(e)}>
                                <MenuItem value="">Select the state</MenuItem>
                                {states.map((state, key) => (
                                <MenuItem key={key} value={state}>
                                    {state}
                                </MenuItem>
                                ))}
                            </Select>

                            <TextField
                            label='Postal Code'
                            placeholder='Enter Postal Code'
                            fullWidth
                            type="text"
                            name='postalCode'
                            style={regInputs}
                            value={user.postalCode}
                            onChange={handleChange}
                            />
                        
                        <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Register</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Registration