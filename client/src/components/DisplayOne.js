import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Paper, Button, Typography, Grid } from '@mui/material'
import NavBar from './NavBar'
import MyContext from './MyContext'

const DisplayOne = () => {

    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({});
    const [productPrice, setProductPrice] = useState('')
    const context = useContext(MyContext)

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

    useEffect(()=>{
        const getUser = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/users",
            { withCredentials: true })
            setUser(res.data)
            // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])

    const incrementCart = async (e, index) => {
        // e.preventDefault()
        try {
            const res = await axios.get("http://localhost:8000/api/users",
            { withCredentials: true })
                setUser(res.data);
                context.setCartCount(context.cartCount += 1);
                // console.log(context.cartCount)
                
            await axios.put(`http://localhost:8000/api/users/${user._id}`,
            {
                cartCount: context.cartCount,
            },
            { withCredentials: true })
            await axios.post(`http://localhost:8000/api/addtocart`,
            {
                "productName": `${product.name}`,
                "productImage": `${product.images}`,
                "productPrice": `${productPrice}`,
                stripeCustomerId: user.customerId
            },
            { withCredentials: true })
            // console.log(context.productList[0].name)
        } catch (error) {
            console.log(error)
        } 
}

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
        <div>
            <NavBar 
            dontDisplaySearch={'filterHide'}
            />
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
                    <Button style={{width:'160px', backgroundColor:'#9f29ad', color:'white'}} variant="contained" onClick={incrementCart}>Add to Cart</Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default DisplayOne