import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Profile = () => {

    //const {id} = useParams();
    const [user, setUser] = useState({});
    // const [stripeUserId, setStripeUserId] = useState("");
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
                    
                    // setStripeUserId(res.data.customerId)
                    // console.log(res.data.customerId)
                    // console.log(setStripeUserId)
            } catch (err) {
                console.log(err)
            }
        }
        userGetter()
    }, [])

    // useEffect(()=>{
    //     const customerIdGetter = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:8000/api/users", 
    //                     {withCredentials: true})
    //                     setStripeUserId(res.data.customerId)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     customerIdGetter();
    // }, [])
    
    console.log(stripeUserId);
    return (
        <div>
            Customer id: {user.customerId}
            <br/>
            last name: {user.lastName}
            <br/>
            city: {userAddress.city}

            
            
               {/* for (let i = 0; i < userAddress.length; i++){
                   console.log(userAddress[i])
               }
            
               {
                   Object.values(userAddress).map((entry, index) =>{return(
                    <div key = {index}>
                    <p> {entry.city}</p>
                           
                            <p>{entry.country}</p>
                    </div>
                )} )
            } */}
        </div>
    )
}

export default Profile