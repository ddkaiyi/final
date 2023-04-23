import React, { useState, useEffect} from 'react';

import { supabase } from './client'
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';
import './App.css';
import{Login} from "./pages/login"
import{Post} from "./pages/post"
import{Insert} from "./pages/insert"
import{Register} from "./pages/register"
import{Detail} from "./pages/detail"
import{Update} from "./pages/update"
function App() {
 

  const reload= ()=>
  {
      window.location.reload();
  }




  return(
    
  <div className='App' >
    
         <Router>
  
      <Routes>
      


      <Route path="/" element={<Login/>} />
      <Route path="/post/:username" element={<Post/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/insert/:username" element={<Insert/>} />
      <Route path="/detail/:id/:username" element={<Detail/>} />
      <Route path="/update/:id/:username" element={<Update/>} />
      </Routes>
   
    </Router>



  </div>)


}

export default App;
