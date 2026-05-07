import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UploadPage from './pages/UploadPage'
import StatisticsPage from './pages/StatisticsPage'
import GroupPage from './pages/GroupPage'
import AccountPage from './pages/AccountPage'


function App() {
  

  return (
    
    <BrowserRouter>
    
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/statistics" element={<StatisticsPage/>} />
        <Route path="/group" element={<GroupPage/>} />
        <Route path="/account" element={<AccountPage/>} />

      </Routes>
    
    </BrowserRouter>

  )
}

export default App

