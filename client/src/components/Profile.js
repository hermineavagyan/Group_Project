import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "../components/NavBar";
import Paper from '@mui/material/Paper';
import { FormHelperText } from '@mui/material';

const Profile = () => {

    const divStyle = {
        margin: "20px",
        display: "flex", 
        justifyContent: "flexStart", 
        alignItems: "flexEnd", 
        borderRadius: "1%", 
        width: "600px", 
        height: "15%",
        border: "2px solid black"
    }

    const [user, setUser] = useState({});
    const[userAddress, setUserAddress] = useState({});

    useEffect(()=> {
        const userGetter = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/users", 
                    {withCredentials: true})

                    setUser(res.data)
                    console.log(res.data)
                    console.log(user)

                    setUserAddress(res.data.address)
                    console.log(res.data.address)
                    console.log(userAddress)
                    
            } catch (err) {
                console.log(err)
            }
        }
        userGetter()
    }, [])

    return (
        <div>
        <NavBar setSearchTerm=""/>

        <h2>Manage your profile</h2>
        <Paper style = {divStyle} elevation = {3}>
            <h4 style = {{marginLeft: "5%"}}>Name</h4>
            <p>{user.firstName} {user.lastName}</p>
            <FormHelperText>
            <p>Account Holder Customer id: {user.customerId}</p>
            </FormHelperText>
        </Paper>
        
        <div style = {divStyle}>
            <h4 style = {{marginLeft: "5%"}}>Contact Details</h4>
            <div style = {{margin: "20px"}}>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phoneNumber}</p>
            </div>
        </div>

        <div style = {divStyle}>
            <h4 style = {{marginLeft: "5%"}}>Address</h4>
            <div style = {{margin: "20px"}}>
            <p>{userAddress.street} {userAddress.city}</p>
            <p>{userAddress.state} {userAddress.postalCode}</p>
            </div>
        </div>
        <h2>
            Order history
        </h2>
        </div>
    )
}

export default Profile