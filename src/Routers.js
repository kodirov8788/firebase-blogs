import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import { AuthContext } from './context/AuthContext'
import Admin from './page/Admin'

function Routers() {
    const { getAdmin } = useContext(AuthContext)
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='admin' element={getAdmin ? <Admin /> : <h1>Admin Topilmadi.</h1>} />
        </Routes>

    )
}

export default Routers