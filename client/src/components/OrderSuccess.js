import React from 'react'
// import  ReactDOM  from 'react-dom'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import axios from 'axios'
import { Paper } from '@material-ui/core' 
// import { faMusic } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const OrderSuccess = () => {
    const navigate = useNavigate()
    // const element = <FontAwesomeIcon icon={faMusic} />
    // ReactDOM.render(element)

    // var musicNote = {
    //     borderRadius: ''
    // }

    var pageStyle = {
        textAlign: 'center',
        maxWidth: '724px',
        minHeight: ' 300px',
        marginLeft: '273px',
        marginTop: '100px',
        padding: '50px'
    }
    return(
        <>
        <NavBar/>
        <div>
            <Paper elevation={3} style={pageStyle}>

            <h1>
            {/* <FontAwesomeIcon icon="fa-solid fa-music" /> */}
                Order Confirmed!
                <br/>
                Thank You for your purchase!
            </h1>
            <h3 style={{padding:'30px'}}>
                A confirmation of your order has been sent to your email.
            </h3>
            </Paper>
        </div>
        
        </>
    )
}

export default OrderSuccess