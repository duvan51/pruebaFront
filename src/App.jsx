import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import DataTable from './pages/dataTable.jsx'
import Navbar from './layouts/Navbar.jsx'


function App() {

  const [mode, setMode] = useState("light");
  const toggleMode=()=>{
    if(mode === "light"){
      setMode("dark");
      document.body.style.backgroundColor = "#1F1F1F"
      document.body.style.Color = "white"
    }else{
      setMode("light")
      document.body.style.backgroundColor = "white"
    }
  }


  return (
    <div>
    <Navbar mode={mode} toggleMode={toggleMode} />
    <Routes>
      <Route 
        path='/' 
        element={
          <div>
            <DataTable  mode={mode} toggleMode={toggleMode} />
          </div>
        } 
      />
    </Routes>
  </div>
  )
}

export default App
