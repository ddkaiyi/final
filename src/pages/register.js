
import axios, { Axios } from 'axios';
import moment from 'moment';
import { BarChart, Bar,  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useNavigate,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import{useForm} from "react-hook-form";
import { supabase } from '../client'

export const Register=()=>{
    const {register, handleSubmit, errors}=useForm();
    const [posts, setPosts] = useState([]);
    const [errores, setErrores] = useState([]);
    let navigate=useNavigate();
    const test=async (data1) => {  
        
        const {data,error}= await supabase
      .from('login')
      .insert([
        { name: data1.username, password: data1.password},
      ])
    
      console.log(data)
      setErrores(error)
    if(error==null){navigate(`/`)}
      }

return(
    <div>
        <h1>Register</h1>
        <div className='Login' >
            <form onSubmit={handleSubmit(test)} >
                    <label htmlFor="username">Username:</label> <br />
                    <input type="text" id="username" name="username" {...register('username')}/><br />
                    <br/>
    
                    <label htmlFor="password">Password</label><br />
                    <input type="password" id="password" name="password" {...register('password')}/><br />
                    <br/>
    
                   <p style={{color:"red"}}>{errores?.message?"error":""}</p>
                 
                 <button onClick={()=>{navigate(`/`)}}>Return</button>
                    <input type="submit" value="Submit" />
      </form>
        </div>
    </div>
)
}