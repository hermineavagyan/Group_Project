import React, {useState} from 'react'
import axios from 'axios'


const DisplayAll = (props) =>{
    const Display = (e) =>{

        try {
            e.preventDefault()
            const res = axios.get('http://localhost:8000/api/items')
        }catch (error){
            console.log(error)
            setErrorMessage(error.response.data.message)
        }
    }
    return(
        <div>
            hi
        </div>
    )
}