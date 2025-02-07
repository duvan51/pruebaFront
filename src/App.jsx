import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import DataTable from './pages/dataTable.jsx'


function App() {

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element ={
            <div>
              <DataTable />
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
