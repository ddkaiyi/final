
import axios, { Axios } from 'axios';
import moment from 'moment';
import { BarChart, Bar,  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useNavigate,useParams } from 'react-router-dom';
import React, { useState, useEffect,createContext } from 'react';
import{useForm} from "react-hook-form";
import { supabase } from '../client'

export const Update=()=>{
    const {register, handleSubmit, errors}=useForm();
    const [posts, setPosts] = useState([]);
    const [errores, setErrores] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    let navigate=useNavigate();
    let{id,username}=useParams();


    const update=async (data1) => {  
   
     const { data, error } = await supabase
     .from('Post')
     .update({ Title:data1.title,Content:data1.content,URL:data1.url })
     .eq('id', id)
     console.log(data)
     setErrores(error)
     setIsButtonClicked(true);
    
          }

  
          
  
          const handleButtonClick = (data1) => {
            setIsButtonClicked(true);
            console.log("yes")
            data1.stopPropagation();
            data1.preventDefault();
            
  
          };
          





      const fetchPosts=async (data1) => {  
        let { data: Post, error } = await supabase
       .from('Post')
       .select('*')
       .eq('id',id)
       setPosts(Post)
    
          }
          useEffect(()=>{
            fetchPosts();
       
          },[]);

    // if(error==null){navigate(`/post/${username}`)}
      

return(
    <div>
        <h1>Register</h1>
        <div className='Login' >
            <p>{username}</p>
            {/* <button onClick={navigate(`/detail/${id}/${username}`)}>go back</button> */}
          
            <form onSubmit={handleSubmit(update)} >
                    <label htmlFor="Title">Title:</label> <br />
                    <input type="text" id="title" name="title"  defaultValue={posts?.[0]?.Title}  {...register('title')}/><br />
                    <br/>
    
                    <label htmlFor="Content">Content:</label><br />
                    <input type="text" id="content" name="content" defaultValue={posts?.[0]?.Content} {...register('content')}/><br />
                    <br/>

                    <label htmlFor="URL">URL:</label><br />
                    <input type="text" id="url" name="url" defaultValue={posts?.[0]?.URL}{...register('url')}/><br />
                    <br/>·
 
                   <p style={{color:"red"}}>{errores?.message?"error":""}</p> 
                 
                
                    <input type="submit" value="Submit" />
                  
      </form>
     
        </div>
    </div>
)
}