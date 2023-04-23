
import axios, { Axios } from 'axios';
import moment from 'moment';
import { BarChart, Bar,  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useNavigate,useParams } from 'react-router-dom';
import React, { useState, useEffect,createContext } from 'react';
import{useForm} from "react-hook-form";
import { supabase } from '../client'

export const Detail=()=>{
    let{id,username}=useParams();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState();
    const [uplist, setUplist] = useState([]);
    const [up, setUp] = useState(true);
    const [upvotenum, setUpvotenum] = useState(null);
    let navigate=useNavigate();
    const fetchPosts=async (data1) => {  
    let { data: Post, error } = await supabase
   .from('Post')
   .select('*')
   .eq('id',id)
  
   setPosts(Post)
   setUpvotenum(Post[0].Upvote)
  
      }
      const fetchCom=async (data1) => {  
        let { data: Comment, error } = await supabase
       .from('Comment')
       .select('*')
       .eq('postid',id)
       setComments(Comment)
    console.log(Comment)
          }
      const deleted=async () => {  
        const { data, error } = await supabase
          .from('Post')
          .delete()
          .eq('id', id)
          navigate(`/post/${username}}`)
              }
    const incom=async (data1) => {  
        
        const {data,error}= await supabase
      .from('Comment')
      .insert([
        { postid:id,comment:comment,user:username },
      ])
    console.log(data)
    fetchCom();
    setComment('')
      }

      useEffect(()=>{
        fetchPosts();
        fetchCom();
        upvote();
      },[]);

     const upvote=async (data1) => {  
        let { data: upvote, error } = await supabase
       .from('upvote')
       .select('*')
       .eq('postid',id)
       .eq('user',username)
       
       console.log(upvote)
       setUplist(upvote)
       if(upvote.length!==0){
        setUp(false);
       }
          }
      

      const upvote2=async (data1) => {  
   
        if(up){
          setUpvotenum(upvotenum+1);
          const {data,error}= await supabase
      .from('upvote')
      .insert([
        { user: username, postid:id},
      ])
      const { data2, error2 } = await supabase
      .from('Post')
      .update({ Upvote:upvotenum+1})
      .eq('id', id)

   
      upvote();
    

        }
        else{
  
         setUpvotenum(upvotenum-1);
        
          const { data, error } = await supabase
          .from('Post')
          .update({ Upvote:upvotenum-1})
          .eq('id', id)

          console.log(uplist[0].id)
          const { data2, error2 } = await supabase
          .from('upvote')
          .delete()
          .eq('id',uplist[0].id)
       
          setUp(true);
          console.log(uplist)
        }
      }
      console.log(upvotenum)
     
    
      const com=comments.map((com)=>(
        <div key={com?.id}>
<p style={{ display:"inline"}}>--{com?.comment}</p>
<p style={{ display:"inline",margin:"20px"}}>user:{com?.user}</p>

</div>))
    return(
        <div>
          <div className='head'>
          <h1 className='box box1'>Blog</h1>
          <text  className='btn1'onClick={()=>{navigate(`/post/${username}`)}}>Home</text>
          <p className='box box3'>User:{username}</p>

          </div>
          <div className='post2'>
            <ul>
              <li>   <p>Post on: {posts?.[0]?.created_at.substr(0,10)}</p></li>
              <li>  <strong><p style={{ fontSize:'20px'}}>{posts?.[0]?.Title}</p></strong></li>
              <li>    <p>{posts?.[0]?.Content}</p></li>
              <li> <img src={posts?.[0]?.URL}></img></li>
              <li> <button onClick={upvote2}>{up?"👍 to click":"👎 cancel? "}</button> <button onClick={ ()=>{navigate(`/update/${id}/${username}`)}}>update</button>
         <button onClick={ ()=>{navigate(`/post/${username}`)}}>back</button>  <button onClick={deleted}>delete</button></li>
            </ul>



          
        <div className='below'>
        {com}
        <input type="text" id="comment" name="comment" value={comment} onChange={(e)=>{setComment(e.target.value)}}></input>
         <button onClick={incom}>message</button>
          </div>   
         
           
         
        
       

       
      
        </div>
        </div>
    )
}