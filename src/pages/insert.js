
import axios, { Axios } from 'axios';
import moment from 'moment';
import { BarChart, Bar,  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useNavigate,useParams } from 'react-router-dom';
import React, { useState, useEffect,createContext } from 'react';
import{useForm} from "react-hook-form";
import { supabase } from '../client'

export const Insert=()=>{
    const {register, handleSubmit, errors}=useForm();
    const [posts, setPosts] = useState([]);
    const [errores, setErrores] = useState([]);
    let navigate=useNavigate();
    let{username}=useParams();
    const test=async (data1) => {  
        
        const {data,error}= await supabase
      .from('Post')
      .insert([
        { Title: data1.title, Content:data1.content,URL:data1.url,username:username},
      ])
    
      console.log(data)
      setErrores(error)
    if(error==null){navigate(`/post/${username}`)}
      }

return(
    <div>
                <div className='head'>
          <h1 className='box box1'>Blog</h1>
          <text  className='btn1'onClick={()=>{navigate(`/post/${username}`)}}>Home</text>
          <p className='box box3'>User:{username}</p>

          </div>
        <h1>Create new post</h1>
        <div className='Login' >
      
            <form onSubmit={handleSubmit(test)} >
                    <label htmlFor="Title">Title:</label> <br />
                    <input type="text" id="title" name="title" {...register('title')}/><br />
                    <br/>
    
                    <label htmlFor="Content">Content:</label><br />
                    <input type="text" id="content" name="content" {...register('content')}/><br />
                    <br/>

                    <label htmlFor="URL">URL:</label><br />
                    <input type="text" id="url" name="url" {...register('url')}/><br />
                    <br/>
    
                   <p style={{color:"red"}}>{errores?.message?"error":""}</p>
                 
                 <button onClick={()=>{navigate(`/post/${username}`)}}>Return</button>
                    <input type="submit" value="Submit" />
      </form>
        </div>
    </div>
)
}