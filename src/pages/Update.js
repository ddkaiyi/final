
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
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [url, setUrl] = useState();
    const [errores, setErrores] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    let navigate=useNavigate();
    let{id,username}=useParams();


    const update=async (data1) => {  
   
     const { data, error } = await supabase
     .from('Post')
     .update({ Title:title,Content:content,URL:url})
     .eq('id', id)
     console.log(title)
     console.log(url)
     console.log(content)
     setErrores(error)
 
     navigate(`/detail/${id}/${username}`)
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
     
        <div className='Login' >
        <div className='head'>
          <h1 className='box box1'>Blog</h1>
          <text  className='btn1'onClick={()=>{navigate(`/post/${username}`)}}>Home</text>
          <p className='box box3'>User:{username}</p>

          </div>
           
      
          <h1>Update</h1>
            <form onSubmit={handleSubmit(update)} >
                    <label htmlFor="Title">Title:</label> <br />
                    <input type="text" id="title" name="title"  defaultValue={posts?.[0]?.Title} onChange={(e)=>{setTitle(e.target.value)}}  /><br />
                    <br/>
    
                    <label htmlFor="Content">Content:</label><br />
                    <input type="text" id="content" name="content" defaultValue={posts?.[0]?.Content} onChange={(e)=>{setContent(e.target.value)}}/><br />
                    <br/>

                    <label htmlFor="URL">URL:</label><br />
                    <input type="text" id="url" name="url" defaultValue={posts?.[0]?.URL} onChange={(e)=>{setUrl(e.target.value)} }/><br />
                    <br/>·
             
                  
                   <p style={{color:"red"}}>{errores?.message?"error":""}</p> 
                 
                
                    <input type="submit" value="Submit" />
                    <button onClick={()=>{navigate(`/detail/${id}/${username}`)}}>go back</button>
                  
      </form>
     
        </div>
    </div>
)
}