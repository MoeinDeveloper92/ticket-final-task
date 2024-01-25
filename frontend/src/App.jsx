import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import NewTicket from './pages/NewTicket'
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from './components/PrivateRoute'
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'
import {
  Home,
  Login,
  Register
} from "../src/pages/index"
import { Routes, Route } from "react-router-dom"

import Header from './components/Header'
const App = () => {

  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/new-ticket' element={<PrivateRoute />} >
          <Route path='/new-ticket' element={<NewTicket />} />
        </Route>

        <Route path='/tickets' element={<PrivateRoute />}>
          <Route path='/tickets' element={<Tickets />} />
        </Route>

        <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
          <Route path='/ticket/:ticketId' element={<Ticket />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App