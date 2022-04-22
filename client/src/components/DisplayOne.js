import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Paper, Container, CardMedia, Button, Box,  Typography } from '@material-ui/core'


const DisplayOne = () => {

    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [productPrice, setProductPrice] = useState('')


    useEffect(()=> {
        const itemGetter = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/products/one/${id}`)
                
                setProduct(res.data)
                const price = await axios.get(`http://localhost:8000/prices/one/${id}`)
                const str = price.data.data[0].unit_amount_decimal
                var resStr = str.substring(0,str.length-2)+"."+str.substring(str.length-2);
                // console.log(price.data.data[0].unit_amount_decimal)
                
                setProductPrice(resStr)
            } catch (err) {
                console.log(err)
            }
        }
        itemGetter()
    }, [id])



    const paperStyle = {
        padding: '90px 40px',
        height: '50vh',
        width: '80%',
        display: 'flex',
        minHeight: '700px',
        margin: '20px auto',
        
    }


    return (
        <Container style={{padding: '80px 0'}}>
            <Paper elevation={10} style={paperStyle}>
                <Box style={{display: 'flex', flexDirection: 'column',minWidth: "400px"}}>
                        <h2>
                        {product.name}
                        </h2>
                    <CardMedia 
                    style={{}}
                    component='img'
                    image={product.images}
                    />  
                </Box>
                <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Typography>$ {productPrice.toLocaleString()}</Typography>
                    <Typography>{product.description}</Typography>
                    <Button style={{width:'160px'}} variant="contained">Add to Cart</Button>
                </Box>
            </Paper>
        </Container>
        
    )
}

export default DisplayOne