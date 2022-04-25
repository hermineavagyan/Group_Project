import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Paper, Container, CardMedia, Button, Box,  Typography, Grid } from '@material-ui/core'
import NavBar from './NavBar'


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
        padding: '80px',
        height: '50vh',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        minHeight: '800px',
        minWidth: '400px',
        margin: '20px auto',
        
    }


    return (
        <>
            <NavBar/> 
            <Grid style={{padding: '80px 0'}}  >
                <Paper elevation={10} style={paperStyle}>
                    
                        <Typography variant='h5' style={{marginBottom: '60px'}}>
                        {product.name}
                        </Typography>
                        <img 
                        style={{width:'50%', minWidth: '250px', margin: '10px auto', maxWidth: '300px'}}
                        src={product.images}
                        alt='product'
                        />  
                        <Typography style={{fontWeight:"bold", fontSize:'18px'}}>$ {productPrice.toLocaleString()}</Typography>
                        <Typography>{product.description}</Typography>
                        <Button style={{width:'160px'}} variant="contained">Add to Cart</Button>
                    
                </Paper>
            </Grid>
        </>
    )
}

export default DisplayOne