import { Card, CardMedia, Typography } from '@mui/material'
import { margin } from '@mui/system'
import React from 'react'
import NavBar from './NavBar'

const OrderSuccess = () => {

const cardStyle = {
    width: "35%",
    minWidth:'400px',
    margin: '100px auto'
}

const textStyle = {
    textAlign: 'center',
    margin:'40px'
}


    return (
        <div>
        <NavBar 
        dontDisplaySearch={'filterHide'}
        />
            <Card elevation={10} style={cardStyle} >
                <Typography variant='h3' style={textStyle}>Order Confirmed!</Typography>
                <img src={require('../img/party.png')} alt="party" style={{width:'25%', display:'block', margin:'60px auto'}} />
                <Typography variant='h4' style={textStyle}>Thank You For Your Purchase!</Typography>
                <Typography variant='h6' style={textStyle}>A confirmation of your order has been sent to your email.</Typography>
            </Card>
        
        </div>
    )
}

export default OrderSuccess