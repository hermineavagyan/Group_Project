import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Paper, Container, CardMedia, Button, Box,  Typography } from '@material-ui/core'


const DisplayOne = () => {

    const {id} = useParams()
    const [product, setProduct] = useState({})


    useEffect(()=> {
        const itemGetter = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/items/${id}`)
                console.log(res.data)
                setProduct(res.data)
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
                        {product.item}
                        </h2>
                    <CardMedia 
                    style={{}}
                    component='img'
                    image={product.image}
                    />  
                </Box>
                <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Typography>${product.price}</Typography>
                    <Typography>{product.description}</Typography>
                    <Button style={{width:'160px'}} variant="contained">Add to Cart</Button>
                </Box>
            </Paper>
        </Container>
        
    )
}

export default DisplayOne