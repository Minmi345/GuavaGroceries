import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import UploadPage from './pages/UploadPage'
import StatisticsPage from './pages/StatisticsPage'
import GroupPage from './pages/GroupPage'
import AccountPage from './pages/AccountPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/dashboard'
          element={<DashboardPage toggleDarkMode={toggleDarkMode} />}
        />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/statistics' element={<StatisticsPage />} />
        <Route path='/group' element={<GroupPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
