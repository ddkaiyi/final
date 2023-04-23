
import axios, { Axios } from 'axios';
import moment from 'moment';
import { BarChart, Bar,  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useNavigate,useParams } from 'react-router-dom';
import React, { useState, useEffect,createContext } from 'react';
import{useForm} from "react-hook-form";
import { supabase } from '../client'



export const Login=()=>{
    const {register, handleSubmit, errors}=useForm();
    const [posts, setPosts] = useState([]);
    let navigate=useNavigate();
    const test=async (data1) => {  
        
        const {data}= await supabase
      .from('login')
      .select('*')
      .eq('name',data1.username)
      console.log(data)
      setPosts(data)
      if(data[0].password==data1.password){navigate(`/post/${data1.username}`)}
      }

    return(
        <div className='Login' >
        
            <h1>Login</h1>
            <form onSubmit={handleSubmit(test)} >
                    <label htmlFor="username">Username:</label> <br />
                    <input type="text" id="username" name="username" {...register('username')}/><br />
                    <br/>
    
                    <label htmlFor="password">Password</label><br />
                    <input type="password" id="password" name="password" {...register('password')}/><br />
                    <br/>
    
                   
                 
                 <button onClick={()=>{navigate(`/register`)}}>Register</button>
                    <input type="submit" value="Submit" />
      </form>
     
        </div>
     )

}