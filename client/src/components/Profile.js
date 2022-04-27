import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "../components/NavBar";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {

    const divStyle = {
        margin: "20px",
        display: "flex", 
        justifyContent: "flexStart", 
        alignItems: "flexEnd", 
        borderRadius: "8px", 
        width: "600px", 
        height: "15%",
        border: "2px solid lightgray"
    }
    const nameBoxStyle = {
        backgroundColor: "#d8dfedac",
        margin: "20px",
        display: "flex", 
        justifyContent: "flexStart", 
        alignItems: "flexEnd", 
        borderRadius: "8px", 
        width: "600px", 
        height: "5%",
        
    }
    const typographyStyle = {
        textAlign: "center",
        fontWeight: "700",
        margin: "20px 0"
        
    }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const[user, setUser] = useState({});
    const[userAddress, setUserAddress] = useState({});
    const[chargesInfo, setChargesInfo] = useState([]);
    

    
    useEffect(()=> {
        const userChargesGetter = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/users", {withCredentials: true})
                const charges = await axios.get(`http://localhost:8000/charges/one/${res.data.customerId}`, {withCredentials: true})
                    setUser(res.data);
                    setUserAddress(res.data.address);
                    setChargesInfo(charges.data.data);
            } catch (err) {
                console.log(err)
            }
        }
        userChargesGetter()
    }, [])

    const formattedDate = (time)=>{
        return  new Date(time * 1000).toLocaleDateString();
    }


    return (
        <div>
            <NavBar/>
            
            <Typography variant ="h4" style = {typographyStyle} >Manage your Profile</Typography>

            <Paper elevation = {3} sx = {{maxWidth: 1000, margin: "0 auto", paddingTop: 5 , paddingBottom: 5, backgroundColor: "#f5f4f2"}}> 
                <div style = {{marginLeft: "20%"}}>
                
                    <div style = {nameBoxStyle}>
                        <h4 style = {{marginLeft: "5%"}}>Name</h4>
                        <div style = {{margin: "20px"}}>
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                        </div>
                        
                    </div>
                    
                    <div style = {divStyle}>
                        <h4 style = {{marginLeft: "5%"}}>Contacts</h4>
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

                </div>
            </Paper>
                    
            <Typography variant ="h4" style = {typographyStyle} >Order History</Typography>

                <TableContainer sx = {{maxWidth: 1000, margin: "20px auto"}} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">Recipt #</StyledTableCell>
                                <StyledTableCell align="right">Date</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
                                <StyledTableCell align="right">Price</StyledTableCell>
                                <StyledTableCell align="right">URL</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chargesInfo?.map((charge, index)=>{
                            
                                return (
                            <StyledTableRow key={index}>

                                <StyledTableCell align="right">{charge.receipt_number}</StyledTableCell>
                                <StyledTableCell align="right">{formattedDate(charge.created)}</StyledTableCell>
                                <StyledTableCell align="right">{charge.description}</StyledTableCell>
                                <StyledTableCell align="right">{charge.amount.toLocaleString()}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <a href ={charge.receipt_url.toString()}>Click Me</a>
                                </StyledTableCell>
                            </StyledTableRow>

                                        )})
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    )
}
export default Profile