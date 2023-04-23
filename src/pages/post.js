import axios, { Axios } from 'axios';
import moment from 'moment';
import { BarChart, Bar,  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useNavigate,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import{useForm} from "react-hook-form";
import { supabase } from '../client'

export const Post=()=>{
    let{username}=useParams();
    let navigate=useNavigate();
    const [posts, setPosts] = useState([]);
    const [posts2, setPosts2] = useState(1);
    const [change, setChange] = useState(null);
    const fetchPosts=async (data1) => {  
        
   let { data: Post, error } = await supabase
   .from('Post')
   .select('*')
   
   setPosts(Post)

     
      }
    useEffect(()=>{
        fetchPosts();
   
      },[]);
   
      function sortdate(){
        const newposts= posts.sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at))
        setPosts(newposts)
        setPosts2((a)=>(a+1))
     
      }
      function sortnum(){
        const newposts= posts.sort((a,b)=>parseInt(b.Upvote)-parseInt(a.Upvote))
        setPosts(newposts)
        setPosts2((a)=>(a+1))
    //   console.log(posts)
      }
      function find(){
        const newposts= posts.filter((post)=>post.Title==change)
       
        setPosts(newposts)
      }


     
  
     
      
    return(
        <div>
          <div className='head'>
          <h1 className='box box1'>Blog</h1>
               <text  className='btn1'onClick={()=>{navigate(`/post/${username}`)}}>Home</text>
          <text  className='btn1'onClick={()=>{navigate(`/insert/${username}`)}}>Create new post</text>
          <input className='box box2' type="text" id="search" name="search" onChange={(e)=>{setChange(e.target.value)}}></input>
          <text  className='btn1 ' onClick={find} >Search</text>
    
         
          <p className='box box3'>User:{username}</p>
          </div>
            
             
            
            <div className='middle'>
              <text>Order By:</text>
            <text className='btn1' onClick={sortdate}>Newest</text>
             <text className='btn1'  onClick={sortnum}>Poupular</text>
            {posts.map((post)=>(
              
        <div className='post' key={post.id}>
          <ul>
            <li> <p className='time'>Post on: {post.created_at.substr(0,10)}</p></li>
        <li>
           <p className='title' onClick={()=>{navigate(`/detail/${post.id}/${username}`)}} style={{ cursor: "pointer" ,fontSize:'20px'}}><strong>{post.Title}</strong></p></li>
          
     
      <li>  <p>{post.Upvote} Upvotes</p></li>
     
       </ul>
         </div>

    ))}

            </div>

  
         
        </div>
    )
}