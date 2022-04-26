import { Card, Typography } from '@material-ui/core'
import { margin } from '@mui/system'
import React from 'react'
import NavBar from './NavBar'

const OrderSuccess = () => {

const cardStyle = {
    width: "40%",
    margin: '100px auto'
}

const textStyle = {
    textAlign: 'center',
    margin:'40px'
}


    return (
        <div>
        <NavBar />
            <Card elevation={10} style={cardStyle} >
                <Typography variant='h3' style={textStyle}>Order Confirmed!</Typography>
                <Typography variant='h4' style={textStyle}>Thank You For Your Purchase!</Typography>
                <Typography variant='h6' style={textStyle}>A confirmation of your order has been sent to your email.</Typography>
            </Card>
        
        </div>
    )
}

export default OrderSuccess